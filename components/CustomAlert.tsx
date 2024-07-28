import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleAlert } from "lucide-react"

const CustomAlert = ({ title, text }: { title: string, text: string }) => {
    return (
        <Alert className="flex gap-2">
            <div>
                <CircleAlert className="size-5 right-0" />
            </div>
            <div className="">
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{text}</AlertDescription>
            </div>
        </Alert>
    )
}

export default CustomAlert