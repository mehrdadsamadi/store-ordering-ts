"use client"

import { addBrand, deleteBrand, getBrands } from '@/actions/brands.actions'
import ConfirmButton from '@/components/ConfirmButton'
import CustomAlert from '@/components/CustomAlert'
import CustomDialog from '@/components/CustomDialog'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import FileUploader from '@/components/FileUploader'
import { FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { BrandDefaultValues } from '@/constants'
import { debounce } from '@/lib/utils'
import { IBrandType } from '@/types/brand/brand.types'
import { BrandFormValidation } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const BrandsPage = () => {
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [brands, setBrands] = useState<IBrandType[]>([])
    const [fixBrands, setFixBrands] = useState<IBrandType[]>([])

    const form = useForm<z.infer<typeof BrandFormValidation>>({
        resolver: zodResolver(BrandFormValidation),
        defaultValues: {
            ...BrandDefaultValues
        },
    })

    useEffect(() => {
        fetchBrands()
    }, [])

    const fetchBrands = async () => {
        setLoading(true)

        const data = await getBrands()
        setBrands(data)
        setFixBrands(data)

        setLoading(false)
    }

    const handleCreateBrand = async (values: z.infer<typeof BrandFormValidation>) => {
        setLoading(true)

        let formData;
        if (values.image && values.image.length > 0) {
            formData = new FormData()
            formData.append("file", values.image[0])
        }

        await toast.promise(
            addBrand({ ...values, image: formData }),
            {
                loading: 'در حال ایجاد برند ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
            .then(() => fetchBrands())
            .finally(() => handleCloseDialog())
            .finally(() => setLoading(false))
    }

    const handleRemoveBrand = async (brandId: string) => {
        await toast.promise(
            deleteBrand(brandId),
            {
                loading: 'در حال حذف برند ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
            .finally(() => fetchBrands())
    }

    const handleCloseDialog = () => {
        form.reset(BrandDefaultValues)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value); // مقدار searchValue به تابع debounced ارسال می‌شود
    };

    const debouncedSearch = useCallback(
        debounce((value: string) => handleSearch(value), 500),
        [fixBrands]
    );

    const handleSearch = (searchValue: string) => {
        setBrands(
            searchValue
                ? fixBrands.filter(fb => fb.name.includes(searchValue))
                : fixBrands
        )
    }

    return (
        <section className="flex flex-col gap-2 h-full">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex justify-between">
                <FormProvider {...form}>
                    <CustomDialog
                        title="ایجاد برند"
                        requiredFieldsName={["name"]}
                        onSubmit={form.handleSubmit(handleCreateBrand)}
                        onClose={handleCloseDialog}
                    >
                        <CustomFormField
                            fieldType={FormFieldType.SKELETON}
                            control={form.control}
                            name="image"
                            label="تصویر برند"
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <FileUploader
                                        onDelete={() => form.setValue("image", [])}
                                        files={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                            )}
                        />

                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="name"
                            label="نام برند"
                            placeholder="نام برند"
                            iconSrc="/assets/icons/pen.svg"
                            iconAlt="brand"
                        />
                    </CustomDialog>
                </FormProvider>

                <div>
                    <Input
                        type="text"
                        placeholder="جستجو برند"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 h-full">
                {
                    brands?.length > 0 ? (
                        <div className="flex gap-4 items-center">
                            {
                                brands.map((brand: IBrandType) => (
                                    <div key={brand._id} className="flex items-center gap-4 px-4 py-2 border rounded-md cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <Image src={brand?.image || "/assets/placeholders/img-placeholder.webp"} alt="category image" className="rounded-full size-10" width={1000} height={1000} />
                                            <h3>{brand.name}</h3>
                                        </div>
                                        <ConfirmButton
                                            title='حذف'
                                            description='برای حذف مطمعن هستید؟'
                                            triggerBtnText={<Trash className="h-5 w-5" />}
                                            onSubmit={() => handleRemoveBrand(brand._id)}
                                        />
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
                                        <Trash />
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <CustomAlert title="اخطار!" text="تا کنون برندی اضافه نشده است" />
                    )
                }
            </div>
        </section>
    )
}

export default BrandsPage