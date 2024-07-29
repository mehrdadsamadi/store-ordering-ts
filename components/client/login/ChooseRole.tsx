import { saveUserBaseInfo } from '@/actions/users.actions'
import CustomFormField, { FormFieldType } from '@/components/CustomFormField'
import FileUploader from '@/components/FileUploader'
import { Button } from '@/components/ui/button'
import { Form, FormControl } from '@/components/ui/form'
import { ChooseRoleDefaultValues, ROLES } from '@/constants'
import { ChooseRoleFormValidation } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import StoreInfo from './StoreInfo'

interface ChooseRoleProps {
    setLoading: (loading: boolean) => void,
    phone: string
}

const ChooseRole = ({ setLoading, phone }: ChooseRoleProps) => {
    const { push } = useRouter()

    const [role, setRole] = useState('')
    const [step, setStep] = useState(1)

    const form = useForm<z.infer<typeof ChooseRoleFormValidation>>({
        resolver: zodResolver(ChooseRoleFormValidation),
        defaultValues: {
            ...ChooseRoleDefaultValues
        },
    })

    useEffect(() => {
        if (role !== '') {
            setStep(2)
        }
    }, [role])

    const submitUserBaseInfo = async (values: z.infer<typeof ChooseRoleFormValidation>) => {
        setLoading(true)

        let formData;
        if (values.avatar && values.avatar.length > 0) {
            formData = new FormData()
            formData.append("file", values.avatar[0])
        }

        await toast.promise(
            saveUserBaseInfo({ ...values, avatar: formData, phone, role }),
            {
                loading: 'در حال ثبت اطلاعات...',
                success: ({ message }) => message!,
                error: ({ error }) => error!,
            }
        )
            .then(() => {
                if (role === ROLES.DRIVER.name) {
                    return push("/")
                } else {
                    setStep(3)
                }
            })
            .finally(() => setLoading(false))
    }

    return (
        <div className='w-full'>
            {
                step === 1 && (
                    <div className="grid grid-cols-2 gap-2 w-full">
                        <div onClick={() => setRole(ROLES.STORE_OWNER.name)} className="rounded-xl p-4 border cursor-pointer hover:font-semibold flex items-center gap-2 justify-center">
                            <Store />
                            <p>فروشگاه دار</p>
                        </div>
                        <div onClick={() => setRole(ROLES.DRIVER.name)} className="rounded-xl p-4 border cursor-pointer hover:font-semibold flex items-center gap-2 justify-center">
                            <Truck />
                            <p>راننده</p>
                        </div>
                    </div>
                )
            }
            {
                step === 2 && (
                    <Form {...form}>
                        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(submitUserBaseInfo)}>
                            <CustomFormField
                                fieldType={FormFieldType.SKELETON}
                                control={form.control}
                                name="avatar"
                                label="تصویر خود را بارکذاری کنید"
                                renderSkeleton={(field) => (
                                    <FormControl>
                                        <FileUploader files={field.value} onChange={field.onChange} />
                                    </FormControl>
                                )}
                            />

                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="firstname"
                                label="نام"
                                placeholder="مهرداد"
                                iconSrc="/assets/icons/user.svg"
                                iconAlt="firstname"
                            />

                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="lastname"
                                label="نام خانوادگی"
                                placeholder="صمدی مقدم"
                                iconSrc="/assets/icons/user.svg"
                                iconAlt="lastname"
                            />

                            <Button type="submit" disabled={!form.watch("firstname") || !form.watch("lastname")} className="mt-2">ثبت و ادامه</Button>
                        </form>
                    </Form>
                )
            }
            {
                step === 3 && (
                    <StoreInfo setLoading={setLoading} />
                )
            }
        </div>
    )
}

export default ChooseRole