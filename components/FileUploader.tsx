"user client"

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className='file-upload'>
            <input {...getInputProps()} />
            {files && files?.length > 0 ? (
                <Image
                    src={convertFileToUrl(files[0])}
                    width={1000}
                    height={1000}
                    alt='uploaded image'
                    className='max-h-[250px] overflow-hidden object-cover rounded-sm'
                />
            ) : (
                <>
                    <Image
                        src="/assets/icons/upload.svg"
                        width={40}
                        height={40}
                        alt='upload icon'
                    />
                    <div className='file-upload_label'>
                        <p className='text-14-regular flex flex-col'>
                            <span className='text-green-500'>
                                برای آپلود کلیک کنید
                            </span>
                            <span className='mx-1'>یا</span>
                            <span className='text-green-500'>
                                تصویر خود را اینجاد رها کنید
                            </span>
                        </p>
                        <p>
                            SVG, PNG, JPG or GIF (max 800x400)
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}

export default FileUploader