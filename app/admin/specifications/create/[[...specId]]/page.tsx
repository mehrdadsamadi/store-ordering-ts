"use client"
import { getBrands } from '@/actions/brands.actions';
import { getCategories } from '@/actions/categories.actions';
import { getProducts } from '@/actions/products.actions';
import { addSpec, editSpecById, getSpecById } from '@/actions/specifications.actions';
import AddSpecifications from '@/components/admin/AddSpecifications';
import CustomAlert from '@/components/CustomAlert';
import CustomStepper from '@/components/CustomStepper';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isEmptyObject } from '@/lib/utils';
import { IBrandType } from '@/types/brand/brand.types';
import { ICategoryType } from '@/types/category/category.types';
import { IProductType } from '@/types/product/product.types';
import { IAddSpecParams, ISpecArray } from '@/types/specificaion/specification.types';
import Image from 'next/image';
import React, { useEffect, useReducer, useState } from 'react'
import toast from 'react-hot-toast';


const specificationsReducer = (state: ISpecArray[], { type, payload }: { type: string, payload?: any }) => {
  switch (type) {
    case 'SET_SPECS':
      return payload;
    case 'RESET_SPECS':
      return [];
    case 'ADD_SPEC_TITLE':
      return [...state, { specTitle: payload, subtitles: [] }];
    case 'REMOVE_SPEC':
      const specs = [...state];
      const nSpecs = specs.filter((s, index) => index !== payload.specIndex)
      return nSpecs;
    case 'REMOVE_SPEC_SUBTITLE':
      const prevState = [...state];
      const newSubtitles = prevState[payload.specIndex].subtitles.filter((sub, index) => index !== payload.subtitleIndex)
      prevState[payload.specIndex].subtitles = newSubtitles
      return prevState;
    case 'ADD_SPEC_SUBTITLE':
      const newState = [...state];
      newState[payload.specIndex].subtitles.push({ subtitle: "", desc: "" });
      return newState;
    case 'CHANGE_SPEC_SUBTITLE':
      const { value, specIndex, inputName, subtitleIndex } = payload
      const newSpecs = [...state];
      newSpecs[specIndex].subtitles[subtitleIndex][inputName] = value;
      return newSpecs;
    default:
      return state;
  }
};

const CreateSpecificationsPage = ({ params: { specId } }: SearchParamProps) => {

  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState([
    {
      step: 1,
      title: "انتخاب بخش",
      description: "مشخصات در کدام بخش اضافه شود؟"
    },
    {
      step: 2,
      title: "انتخاب نمونه",
      description: "مشخصات به کدام نمونه اضافه شود؟"
    },
    {
      step: 3,
      title: "ایجاد مشخصات",
      description: "مشخصات را ایجاد کنید"
    },
  ])
  const [activeStep, setActiveStep] = useState(1)
  const [selectedSection, setSelectedSection] = useState<{ dataName?: string, fetchName?: string }>({})
  const [sectionItems, setSectionItems] = useState<IProductType[] | ICategoryType[] | IBrandType[]>([])
  const [selectedItem, setSelectedItem] = useState({})

  const [specTitle, setSpecTitle] = useState('')
  const [specifications, dispatch] = useReducer(specificationsReducer, []);

  useEffect(() => {
    if (specId) {
      fetchSpec()
    }
  }, [specId])

  useEffect(() => {
    if (!isEmptyObject(selectedSection)) {
      setActiveStep(2)
      setSelectedItem({})
      fetchSectionItems()
    }
  }, [selectedSection])

  const fetchSpec = async () => {
    setLoading(true)

    const specData = await getSpecById(specId)
    dispatch({ type: 'SET_SPECS', payload: specData.specifications });

    if (isEmptyObject(selectedSection)) {
      if (specData?.product) {
        setSelectedSection({ dataName: 'product', fetchName: 'products' })
        setSelectedItem(specData.product)
      } else if (specData?.category) {
        setSelectedSection({ dataName: 'category', fetchName: 'categories' })
        setSelectedItem(specData.category)
      } else {
        setSelectedSection({ dataName: 'brand', fetchName: 'brands' })
        setSelectedItem(specData.brand)
      }
    }

    setLoading(false)
  }

  const fetchSectionItems = async () => {
    setLoading(true)

    switch (selectedSection?.fetchName) {
      case "products":
        setSectionItems(await getProducts())
        break;
      case "categories":
        setSectionItems(await getCategories())
        break;
      case "brands":
        setSectionItems(await getBrands())
        break;
    }

    setLoading(false)
  }

  const handleSubmitSpecs = async () => {
    setLoading(true)

    let data: IAddSpecParams = {}

    data[selectedSection?.dataName] = selectedItem._id
    data.specifications = specifications

    await toast.promise(
      specId ? editSpecById(data, specId) : addSpec(data),
      {
        loading: specId ? "در حال ویرایش مشخصات..." : 'در حال ایجاد مشخصات ...',
        success: ({ message }) => message,
        error: ({ error }) => error,
      }
    )
      .finally(() => setLoading(false))

    setActiveStep(1)
    setSelectedSection({})
    setSelectedItem({})
    setSectionItems([])
    dispatch({ type: 'RESET_SPECS' });
  }


  const handleAddSpecTitle = () => {
    dispatch({ type: 'ADD_SPEC_TITLE', payload: specTitle });
    setSpecTitle('')
  };

  const handleAddSpecSubtitles = (specIndex: number) => {
    dispatch({ type: 'ADD_SPEC_SUBTITLE', payload: { specIndex } });
  };

  const handleRemoveSpecSubtitle = (specIndex: number, subtitleIndex: number) => {
    dispatch({ type: 'REMOVE_SPEC_SUBTITLE', payload: { specIndex, subtitleIndex } });
  };

  const handleChangeSubtitle = (value: string, subtitleIndex: number, inputName: string, specIndex: number) => {
    dispatch({ type: 'CHANGE_SPEC_SUBTITLE', payload: { value, subtitleIndex, inputName, specIndex } });
  };

  const handleRmoveSpec = (specIndex: number) => {
    dispatch({ type: 'REMOVE_SPEC', payload: { specIndex } });
  };

  return (
    <section className="h-full">
      <div className="w-full p-4 rounded-lg h-full relative flex flex-col justify-between">
        <div className="p-4 h-full overflow-hidden">
          <CustomStepper steps={steps} activeStep={activeStep} />

          <div className="grid grid-cols-3 gap-4 mt-10 h-full">
            <div className="grid grid-cols-3">
              <div onClick={() => setSelectedSection({ dataName: 'product', fetchName: 'products' })} className="rounded-lg bg-dark-400 text-center w-40 p-4 hover:bg-dark-500 cursor-pointer h-fit mx-auto">محصول</div>
              <div onClick={() => setSelectedSection({ dataName: 'category', fetchName: 'categories' })} className="rounded-lg bg-dark-400 text-center w-40 p-4 hover:bg-dark-500 cursor-pointer h-fit mx-auto">دسته بندی</div>
              <div onClick={() => setSelectedSection({ dataName: 'brand', fetchName: 'brands' })} className="rounded-lg bg-dark-400 text-center w-40 p-4 hover:bg-dark-500 cursor-pointer h-fit mx-auto">برند</div>
            </div>
            <div className="relative overflow-y-auto">
              <Loading loading={loading} />

              {
                sectionItems?.length === 0 && (
                  <CustomAlert title="اخطار!" text="ابتدا یک بخش را انتخاب کنید" />
                )
              }

              <div className="grid grid-cols-2 gap-2 overflow-y-auto">
                {
                  sectionItems?.length > 0 && sectionItems.map(item => (
                    <div key={item._id} onClick={() => { setSelectedItem(item); setActiveStep(3) }} className={`grid grid-cols-3 items-center px-4 py-2 bg-dark-400 rounded-md cursor-pointer hover:bg-dark-500 ${item._id === selectedItem?._id && 'border border-primary'}`}>
                      <Image src={item?.image || item?.images?.[0] || "/placeholders/img-placeholder.webp"} alt="item image" className="rounded-full w-[60px] h-[60px]" width={60} height={60} />
                      <h3 className="col-span-2">{item.name}</h3>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="relative overflow-y-auto">
              {
                (isEmptyObject(selectedItem) && !specId) ? (
                  <CustomAlert title="اخطار!" text="ابتدا یک نمونه را انتخاب کنید" />
                ) : (
                  <div className="h-full">
                    <div className="w-full text-center font-semibold mb-2">
                      <p>
                        ایجاد مشخصات برای
                        {(selectedSection.fetchName === "products") ? " محصول " : (selectedSection.fetchName === "brands") ? " برند " : " دسته بندی "}
                        {selectedItem?.name}
                      </p>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <Input
                        type="text"
                        placeholder="عنوان"
                        value={specTitle} 
                        onChange={(e) => setSpecTitle(e.target.value)}
                      />
                      <Button type="button" variant="outline" disabled={!specTitle} onClick={handleAddSpecTitle}>ایجاد عنوان</Button>
                    </div>
                    <div className="overflow-y-auto h-full">
                      {
                        specifications?.length > 0 && specifications.map((spec, index) => (
                          <AddSpecifications key={index} title={spec.specTitle} addLabel={`ایجاد زیر عنوان برای ${spec.specTitle}`} props={spec.subtitles} onRemoveSpec={() => handleRmoveSpec(index)} onChangeSubtitle={(value, subtitleIndex, inputName) => handleChangeSubtitle(value, subtitleIndex, inputName, index)} onRemoveSubtitle={(subtitleIndex) => handleRemoveSpecSubtitle(index, subtitleIndex)} onAddSubtitle={() => handleAddSpecSubtitles(index)} />
                        ))
                      }
                    </div>
                  </div>
                )
              }
            </div>
          </div>

        </div>

        <Button disabled={!specifications?.length} onClick={handleSubmitSpecs} className="w-full" variant="outline" type="button">
          {specId ? "ویرایش مشخصات" : "ثبت مشخصات"}
        </Button>
      </div>
    </section>
  )
}

export default CreateSpecificationsPage