"use client"
// TODO: اگر یکی از ایمپوت ها خطا داشته باشد نباید دیالوگ در حالت سابمیت بسنه شود
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
    const { title, children, onSubmit, onClose, triggerBtnText, submitBtnText, description, rejectBtnText, requiredFieldsName, showBtns = true } = props
    const [open, setOpen] = useState(false)
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        if (requiredFieldsName && requiredFieldsName?.length) {
            setDisable(!requiredFieldsName.every(field => field?.length > 0))
        }
    }, [requiredFieldsName])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">
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
                                disabled={requiredFieldsName && disable}
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
                                    onClose()
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