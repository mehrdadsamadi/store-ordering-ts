import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"

import { LoaderCircle } from 'lucide-react'

const Loading = ({ loading }: { loading: boolean }) => {
    return (
        loading && (
            <AlertDialog open={loading}>
                <AlertDialogContent className="w-fit z-50">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <LoaderCircle className='size-6 animate-spin mx-auto' />
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center cursor-default">منتظر بمانید</AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        )
    )
}

export default Loading