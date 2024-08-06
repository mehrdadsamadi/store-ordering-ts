"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import React, { useEffect, useState } from 'react'
import { Button } from "./ui/button"
import { useFormContext } from "react-hook-form"

interface DialogProps {
    title: string,
    children: React.ReactNode,
    onSubmit: () => void,
    onClose: () => void,
    triggerBtnText?: string | React.ReactNode,
    description?: string,
    submitBtnText?: string,
    rejectBtnText?: string,
    requiredFieldsName?: string[],
    showBtns?: boolean,
}

const CustomDialog = (props: DialogProps) => {
    const { watch } = useFormContext()
    const [open, setOpen] = useState(false)
    const { title, children, onSubmit, onClose, triggerBtnText, submitBtnText, description, rejectBtnText, requiredFieldsName, showBtns = true } = props

    const hasDisable = (): boolean => {
        return requiredFieldsName ? requiredFieldsName.some(fn => !watch(fn)) : false;
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    {triggerBtnText ? triggerBtnText : title}
                </Button>
            </DialogTrigger>

            <DialogContent dir="rtl" className="shad-dialog sm:max-w-md">
                <DialogHeader className="!text-start">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {children}

                {
                    showBtns && (
                        <DialogFooter className="flex items-center !justify-start gap-2 mt-2">
                            <Button
                                disabled={hasDisable()}
                                onClick={() => {
                                    onSubmit();
                                    setOpen(false);
                                }}
                            >
                                {submitBtnText ? submitBtnText : title}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    onClose();
                                    setOpen(false);
                                }}
                            >
                                {rejectBtnText ? rejectBtnText : 'انصراف'}
                            </Button>
                        </DialogFooter>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog