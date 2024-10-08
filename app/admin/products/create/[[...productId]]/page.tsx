"use client"
import { getBrands } from '@/actions/brands.actions'
import { getCategories } from '@/actions/categories.actions'
import { addProduct, editProduct, getProductById } from '@/actions/products.actions'
import CustomEditor from '@/components/customEditor'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import FileUploader from '@/components/FileUploader'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormLabel } from '@/components/ui/form'
import { SelectItem } from '@/components/ui/select'
import { ProductDefaultValues } from '@/constants'
import { convertUrlToFile } from '@/lib/utils'
import { ProductFormValidation } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface Image {
    id?: number
    file?: File[]
}

const CreateProductPage = ({ params: { productId } }: SearchParamProps) => {
    const [images, setImages] = useState<Image[]>([{ id: Date.now() }])
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const form = useForm<z.infer<typeof ProductFormValidation>>({
        resolver: zodResolver(ProductFormValidation),
        defaultValues: {
            ...ProductDefaultValues
        },
    })

    useEffect(() => {
        if (productId) {
            fetchProduct()
        }
        fetchBrands()
        fetchCategories()
    }, [productId])

    const fetchProduct = async () => {
        setLoading(true)
        const productData = await getProductById(productId)
        await convertImagesToFile(productData.images)
        form.setValue("brand", productData.brand._id)
        form.setValue("category", productData.category._id)
        form.setValue("images", productData.images)
        form.setValue("name", productData.name)
        form.setValue("description", productData.description)
        form.setValue("slug", productData.slug)
        form.setValue("visible", productData.visible)
        setLoading(false)
    }

    const convertImagesToFile = async (imgs: string[]) => {
        setImages([])
        try {
            const files: File[] = await Promise.all(imgs.map(convertUrlToFile));
            const timestamp = new Date().getTime();
            const newImages = files.map((file, index) => ({
                id: timestamp + index,  // استفاده از timestamp به جای Date.now() در هر iteration
                file: [file],
            }));
            setImages(prevImgs => [...prevImgs, ...newImages]);
        } catch (error) {
            console.error('Error converting URLs to files:', error);
        }
        if (images.length < 6) {
            setImages(prevImages => [...prevImages, { id: Date.now() }])
        }
    };

    const fetchBrands = async () => {
        setLoading(true)
        const brandsData = await getBrands()
        setBrands(brandsData)
        form.setValue("brand", brandsData[0]._id)
        setLoading(false)
    }

    const fetchCategories = async () => {
        setLoading(true)
        const categoriesData = await getCategories()
        setCategories(categoriesData)
        form.setValue("category", categoriesData[0]._id)
        setLoading(false)
    }

    const handleCreateProduct = async (values: z.infer<typeof ProductFormValidation>) => {
        setLoading(true)

        let formData = new FormData();
        if (values.images && values.images.length > 0) {
            images.map(img => {
                if (img && img?.file) {
                    formData.append("file", img.file[0])
                }
            })
        }

        await toast.promise(
            productId ? editProduct({ ...values, images: formData }, productId) : addProduct({ ...values, images: formData }),
            {
                loading: productId ? "در حال ویرایش محصول..." : 'در حال ایجاد محصول ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
            .finally(() => resetStates())
            .finally(() => setLoading(false))
    }

    const resetStates = () => {
        form.reset(ProductDefaultValues)
        setImages([{ id: Date.now() }])
    }

    const handleImageChange = (index: number, files: File[]) => {
        setImages(prevImages => {
            const newImages = [...prevImages]
            newImages[index].file = files
            return newImages
        })
        if (images.length < 6) {
            setImages(prevImages => [...prevImages, { id: Date.now() }])
        }
    }

    const handleDeleteImage = (index: number) => {
        setImages(prevImgs => prevImgs.filter((img, i) => i !== index))
    }

    return (
        <section className='h-full'>
            <div className="w-full p-4 rounded-lg h-full relative">
                <Loading loading={loading} />
                {
                    !loading && (
                        <Form {...form}>
                            <form className='grid grid-cols-2 gap-4' onSubmit={form.handleSubmit(handleCreateProduct)}>
                                <div>
                                    <FormLabel>تصاویر محصول</FormLabel>
                                    <div className="grid grid-cols-3 gap-4 mt-2">
                                        {images.map((img, index) => (
                                            <div key={index} className="">
                                                <CustomFormField
                                                    fieldType={FormFieldType.SKELETON}
                                                    control={form.control}
                                                    name={`images[${index}]`}
                                                    className='mb-0'
                                                    renderSkeleton={(field) => (
                                                        <FormControl>
                                                            <FileUploader
                                                                files={img.file}
                                                                onChange={(file) => handleImageChange(index, file)}
                                                                onDelete={file => handleDeleteImage(index)}
                                                            />
                                                        </FormControl>
                                                    )}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-col gap-4">
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name="name"
                                            label="نام محصول"
                                            placeholder="نام محصول"
                                            iconSrc="/assets/icons/pen.svg"
                                            iconAlt="product"
                                        />

                                        <div className="grid grid-cols-2 gap-2">
                                            <CustomFormField
                                                fieldType={FormFieldType.SELECT}
                                                control={form.control}
                                                name="brand"
                                                label="برند محصول"
                                                placeholder="یک برند را انتخاب کنید"
                                            >
                                                {brands.map((br: { _id: string, name: string }) => (
                                                    <SelectItem key={br._id} value={br._id}>
                                                        <div className="flex cursor-pointer items-center">
                                                            <p>{br.name}</p>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </CustomFormField>
                                            <CustomFormField
                                                fieldType={FormFieldType.SELECT}
                                                control={form.control}
                                                name="category"
                                                label="دسته بندی محصول"
                                                placeholder="یک دسته بندی را انتخاب کنید"
                                            >
                                                {categories.map((cg: { _id: string, name: string }) => (
                                                    <SelectItem key={cg._id} value={cg._id}>
                                                        <div className="flex cursor-pointer items-center">
                                                            <p>{cg.name}</p>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </CustomFormField>
                                        </div>

                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            control={form.control}
                                            name="slug"
                                            label="اسلاگ"
                                            placeholder="اسلاگ"
                                            iconSrc="/assets/icons/pen.svg"
                                            iconAlt="slug"
                                        />

                                        <CustomFormField
                                            fieldType={FormFieldType.SKELETON}
                                            control={form.control}
                                            name="description"
                                            label="توضیحات"
                                            className='h-full'
                                            renderSkeleton={(field) => (
                                                <FormControl>
                                                    <CustomEditor setData={field.onChange} data={field.value} />
                                                </FormControl>
                                            )}
                                        />

                                        <CustomFormField
                                            fieldType={FormFieldType.CHECKBOX}
                                            control={form.control}
                                            name="visible"
                                            label="این محصول قابل نمایش باشد؟"
                                        />

                                        <Button type='submit' variant="outline" className='w-full'>
                                            {productId ? "ویرایش محصول" : "ایجاد محصول"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    )
                }
            </div>
        </section>
    )
}

export default React.memo(CreateProductPage)