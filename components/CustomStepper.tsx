import { Check } from 'lucide-react'

const CustomStepper = ({ steps, activeStep = 1 }: { steps: { step: number, title: string, description: string }[], activeStep: number }) => {

    return (
        <ul className="relative flex flex-row gap-x-2">
            {
                steps?.length > 0 && steps.map(item => (
                    <li key={item.step} className="flex items-center gap-x-2 shrink basis-0 flex-1 group">
                        <div className="flex flex-col items-start">
                            <div className="min-w-7 min-h-7 inline-flex justify-center items-center align-middle">
                                <span className={`size-10 flex justify-center items-center flex-shrink-0 font-medium `}>
                                    {
                                        item.step < activeStep ? (<Check />) : (item.step)
                                    }
                                </span>
                                <span className="ms-2 block font-medium text-white">
                                    {item.title}
                                </span>
                            </div>

                            <p className="text-sm text-dark-600 ms-11">
                                {item.description}
                            </p>
                        </div>
                        <div className={`w-full h-[2px] flex-1 bg-dark-500 group-last:hidden ${item.step < activeStep && 'bg-dark-200'}`}></div>
                    </li>

                ))
            }
        </ul>
    )
}

export default CustomStepper