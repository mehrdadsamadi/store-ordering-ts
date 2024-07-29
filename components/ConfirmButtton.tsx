import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "./ui/button"

interface ConfirmButtonProps {
    title?: string;
    triggerBtnText?: string | React.ReactNode;
    description?: string,
    submitBtnText?: string;
    rejectBtnText?: string;
    onSubmit: () => void;
}

const ConfirmButtton = (props: ConfirmButtonProps) => {
    const { title, triggerBtnText, submitBtnText, description, rejectBtnText, onSubmit } = props
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    {triggerBtnText ? triggerBtnText : title}
                </Button>
            </DialogTrigger>

            <DialogContent dir="rtl" className="shad-dialog sm:max-w-sm">
                <DialogHeader className="!text-center">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className='!mt-3'>{description}</DialogDescription>
                </DialogHeader>

                <DialogFooter className="grid grid-cols-2 w-full gap-3 mt-1">
                    <Button
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
                            setOpen(false);
                        }}
                    >
                        {rejectBtnText ? rejectBtnText : 'انصراف'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmButtton