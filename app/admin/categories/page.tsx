"use client"

import CustomDialog from "@/components/CustomDialog"
import CustomFormField, { FormFieldType } from "@/components/CustomFormField"
import FileUploader from "@/components/FileUploader"
import { FormControl } from "@/components/ui/form"
import { CategoryFormValidation } from "@/validations"
import React, { useCallback, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { CategoryDefaultValues } from "@/constants"
import toast from "react-hot-toast"
import { addCategory, getCategories, getChildCategories } from "@/actions/categories.actions"
import { Input } from "@/components/ui/input"
import { debounce } from "@/lib/utils"
import Image from "next/image"
import { ArrowRight, ChevronLeft } from "lucide-react"
import CustomAlert from "@/components/CustomAlert"
import { ICategoryType } from "@/types/category/category.types"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"


const CategoriesPage = () => {

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<ICategoryType[]>([])
  const [fixCategories, setFixCategories] = useState<ICategoryType[]>([])
  const [categoryParentsId, setCategoryParentsId] = useState<string[]>([])

  const form = useForm<z.infer<typeof CategoryFormValidation>>({
    resolver: zodResolver(CategoryFormValidation),
    defaultValues: {
      ...CategoryDefaultValues
    },
  })

  useEffect(() => {
    setLoading(true)
    fetchCategories()
  }, [])

  useEffect(() => {
    getCategoriesUnderParent()
  }, [categoryParentsId])

  const fetchCategories = async () => {
    const data = await getCategories()
    setFixCategories(data)
    setCategories(data.filter((c: z.infer<typeof CategoryFormValidation>) => c.parent === undefined))
    setLoading(false)
  }

  const getCategoriesUnderParent = async () => {
    if (categoryParentsId?.length > 0) {
      const data = await getChildCategories(categoryParentsId[categoryParentsId.length - 1])
      setCategories(data)
    } else {
      fetchCategories()
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    const selectedCategory = fixCategories.find((c: ICategoryType) => c._id === categoryId)
    form.setValue("parent", selectedCategory?.name || '')
    setCategoryParentsId(prev => [...prev, categoryId])
  }

  const handleBackClick = () => {
    const selectedCategory = fixCategories.find((c: ICategoryType) => c._id === categoryParentsId[categoryParentsId?.length - 2])
    form.setValue("parent", selectedCategory?.name || '')
    setCategoryParentsId(prev => prev.filter((c: string) => c !== prev[prev.length - 1]))
  }

  const handleCreateCategory = async (values: z.infer<typeof CategoryFormValidation>) => {
    setLoading(true)

    let formData;
    if (values.image && values.image.length > 0) {
      formData = new FormData()
      formData.append("file", values.image[0])
    }

    await toast.promise(
      addCategory({ ...values, image: formData, parent: categoryParentsId[categoryParentsId?.length - 1] }),
      {
        loading: 'در حال ایجاد دسته بندی ...',
        success: ({ message }) => message!,
        error: ({ error }) => error!,
      }
    )
      .then(() => getCategoriesUnderParent())
      .finally(() => handleCloseDialog())
      .finally(() => setLoading(false))
  }

  const handleCloseDialog = () => {
    form.reset(CategoryDefaultValues)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value); // مقدار searchValue به تابع debounced ارسال می‌شود
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => handleSearch(value), 500),
    [fixCategories]
  );

  const handleSearch = (searchValue: string) => {
    setCategories(
      searchValue
        ? fixCategories.filter(fc => fc.name.includes(searchValue))
        : fixCategories.filter(fc => !fc.parent)
    )
  }

  return (
    <section className="flex flex-col gap-2 h-full">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex justify-between">
        <FormProvider {...form}>
          <CustomDialog
            title="ایجاد دسته بندی"
            requiredFieldsName={["name"]}
            onSubmit={form.handleSubmit(handleCreateCategory)}
            onClose={handleCloseDialog}
          >
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="image"
              label="تصویر دسته بندی"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
                </FormControl>
              )}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="نام دسته بندی"
              placeholder="نام دسته بندی"
              iconSrc="/assets/icons/pen.svg"
              iconAlt="category"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled
              name="parent"
              label="دسته بندی پدر"
              placeholder="دسته بندی پدر"
              iconSrc="/assets/icons/userRoundPen.svg"
              iconAlt="category"
            />
          </CustomDialog>
        </FormProvider>

        <div>
          <Input
            type="text"
            placeholder="جستجو دسته بندی"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 h-full">
        {
          categoryParentsId?.length > 0 && (
            <div className="flex gap-4 items-center mb-4">
              <Button variant="ghost" onClick={handleBackClick}>
                <ArrowRight className="me-2 size-5" />
                برگرد عقب
              </Button>
              <Separator orientation="vertical" className="h-9" />
              <Breadcrumb>
                <BreadcrumbList>
                  {
                    categoryParentsId.map((pId, index) => (
                      <React.Fragment key={index}>
                        <BreadcrumbItem>
                          <BreadcrumbPage>{fixCategories.find((c: ICategoryType) => c._id === pId)?.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                        {
                          index !== (categoryParentsId.length - 1) && (
                            <BreadcrumbSeparator>
                              <ChevronLeft />
                            </BreadcrumbSeparator>
                          )
                        }
                      </React.Fragment>
                    ))
                  }
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )
        }
        {
          categories?.length > 0 ? (
            <div className="flex gap-4 items-center">
              {
                categories.map((category: ICategoryType) => (
                  <div key={category._id} onClick={() => handleCategoryClick(category._id)} className="flex items-center gap-4 px-4 py-2 border rounded-md cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Image src={category?.image || "/assets/placeholders/img-placeholder.webp"} alt="category image" className="rounded-full size-10" width={1000} height={1000} />
                      <h3>{category.name}</h3>
                    </div>
                    <ChevronLeft />
                  </div>
                ))
              }
            </div>
          ) : loading ? (
            <div className="flex gap-4 items-center">
              {
                [1, 2, 3].map((key) => (
                  <div key={key} className="flex items-center gap-4 px-4 py-2 border rounded-md cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <ChevronLeft />
                  </div>
                ))
              }
            </div>
          ) : (
            <CustomAlert title="اخطار!" text="تا کنون دسته بندی اضافه نشده است" />
          )
        }
      </div>
    </section>
  )
}

export default CategoriesPage