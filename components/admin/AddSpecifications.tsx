"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import ConfirmButton from "../ConfirmButton";
import { ISpecSubtitles } from "@/types/specificaion/specification.types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface addSpecParams {
    title: string,
    addLabel: string,
    props: ISpecSubtitles[],
    onRemoveSpec: () => void,
    onChangeSubtitle: (value: string, subtitleIndex: number, inputName: string) => void,
    onRemoveSubtitle: (subtitleIndex: number) => void,
    onAddSubtitle: () => void
}

export default function AddSpecifications({ title, addLabel, props, onAddSubtitle, onRemoveSubtitle, onChangeSubtitle, onRemoveSpec }: addSpecParams) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-dark-400 p-4 rounded-2xl mb-4">
            <div className="flex items-center justify-between">
                <div onClick={() => setIsOpen(prev => !prev)} className="p-1 border-0 flex items-center gap-2 cursor-pointer">
                    {
                        isOpen ? <ChevronUp /> : <ChevronDown />
                    }

                    <h3 className="text-white flex gap-1">
                        {title}
                        <span>({props?.length || 0})</span>
                    </h3>
                </div>

                <ConfirmButton
                    triggerBtnText={<Trash />}
                    title='حذف'
                    description='برای حذف مطمعن هستید؟'
                    className="hover:bg-dark-500"
                    onSubmit={onRemoveSpec}
                />
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} border-t border-t-dark-600 pt-4 mt-2 overflow-y-auto max-h-96`}>
                {
                    props?.length > 0 &&
                    props.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
                            <div>
                                <Label>زیر عنوان</Label>
                                <Input
                                    type="text"
                                    placeholder="نام زیر عنوان"
                                    value={spec.subtitle}
                                    onChange={e => onChangeSubtitle(e.target.value, i, 'subtitle')}
                                />
                            </div>
                            <div>
                                <Label>توضیحات</Label>
                                <Input
                                    type="text"
                                    placeholder="توضیحات زیر عنوان"
                                    value={spec.desc} 
                                    onChange={e => onChangeSubtitle(e.target.value, i, 'desc')}
                                />
                            </div>
                            <div className="mt-6">
                                <ConfirmButton
                                    triggerBtnText={<Trash />}
                                    title='حذف'
                                    description='برای حذف مطمعن هستید؟'
                                    className="hover:bg-dark-500"
                                    onSubmit={() => onRemoveSubtitle(i)}
                                />
                            </div>
                        </div>
                    ))
                }
                <Button type="button" variant="ghost" onClick={onAddSubtitle} className="w-full border-none mt-4">
                    <span>{addLabel}</span>
                </Button>
            </div>
        </div>
    )
}