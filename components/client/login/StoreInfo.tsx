import { useRouter } from 'next/navigation'
import toast from "react-hot-toast";
import React, { useEffect, useState } from 'react'
import { IStoreType } from '@/types/store/store.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StoreInfoDefaultValues } from '@/constants';
import { z } from 'zod';
import { StoreInfoFormValidation } from '@/validations';
import { Form, FormLabel } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '@/components/CustomFormField';
import { SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Map from '@/components/Map';
import { Province } from '@/constants/province';
import { Cities } from '@/constants/cities';
import { getCookie } from '@/actions/cookies.actions';
import { handleStoreInfo } from '@/actions/store.actions';

interface StoreInfoProps {
  setLoading: (loading: boolean) => void,
  editingAddress?: boolean,
  storeInfo?: IStoreType
}

const StoreInfo = ({ setLoading, editingAddress = false, storeInfo }: StoreInfoProps) => {
  const { push } = useRouter()

  const form = useForm<z.infer<typeof StoreInfoFormValidation>>({
    resolver: zodResolver(StoreInfoFormValidation),
    defaultValues: {
      ...StoreInfoDefaultValues
    },
  })

  const [storeLoc, setStoreLoc] = useState<[number, number]>([35.715298, 51.404343])
  const [provinceCities, setProvinceCities] = useState<ICities[]>([])

  useEffect(() => {
    if (storeInfo) {
      // @ts-ignore
      Object.keys(StoreInfoDefaultValues).map(key => form.setValue(key, storeInfo[key]))
    }

    !editingAddress && form.setValue("province", Province[0].name);
  }, [])

  useEffect(() => {
    if (form.watch("province")) {
      getProvinceCities()
    }
  }, [form.watch("province")])

  const getProvinceCities = () => {
    setLoading(true)

    const pr = Province.find(pr => pr.name === form.watch("province"))
    const prCities = Cities.filter(ct => ct.province_id === pr?.id)

    setProvinceCities(prCities)
    !editingAddress && form.setValue("city", prCities[0].name)

    setLoading(false)
  }

  const submitStoreInfo = async (values: z.infer<typeof StoreInfoFormValidation>) => {
    setLoading(true)

    try {
      const user = await getCookie("user")
      if (user) {
        await toast.promise(
          handleStoreInfo({ values: { ...values, phone: user.phone, location: { lat: storeLoc[0], lng: storeLoc[1] } }, edit: editingAddress }),
          {
            loading: 'در حال ثبت اطلاعات...',
            success: ({ message }) => message!,
            error: ({ error }) => error!,
          }
        )
          .then(() => {
            if (!editingAddress) {
              return push("/")
            }
          })
      }
    } catch (error) {
      console.log("fialed to fetch user", error);
    }
    
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(submitStoreInfo)}>
        {JSON.stringify(storeLoc)}
        <div>
          <FormLabel className='!text-white'>موقعیت مکانی فروشگاه</FormLabel>
          <div className="h-[300px] mt-2 overflow-hidden rounded-md">
            <Map setStoreLoc={setStoreLoc} center={(editingAddress && storeInfo) ? [storeInfo.location.lat, storeInfo.location.lng] : [35.715298, 51.404343]} />
          </div>
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="نام فروشگاه"
          placeholder="هایپر مهرداد"
          iconSrc="/assets/icons/store.svg"
          iconAlt="store name"
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="province"
          label="استان"
          placeholder={Province[0].name}
        >
          {Province.map((province: { id: number, name: string }) => (
            <SelectItem key={province.id} value={province.name}>
              <div className="flex cursor-pointer items-center">
                <p>{province.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="city"
          label="شهر"
          placeholder={Cities[0].name}
        >
          {provinceCities.map((city: { id: number, name: string }) => (
            <SelectItem key={city.id} value={city.name}>
              <div className="flex cursor-pointer items-center">
                <p>{city.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="address"
          label="آدرس"
          placeholder="خیابان حاففظ، حافظ 25، پلاک 2/1"
        />

        <Button type="submit" disabled={!form.watch("name") || !form.watch("province") || !form.watch("city") || !form.watch("address")} className="mt-2">ثبت و ادامه</Button>
      </form>
    </Form>
  )
}

export default StoreInfo