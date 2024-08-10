"user client"

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void,
    require?: boolean,
    onDelete?: (file: File) => void,
}

const FileUploader = ({ files, onChange, require = false, onDelete }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, acceptedFile: File) => {
        e.stopPropagation()
        if (onDelete) {
            onDelete(acceptedFile)
        }
    }

    return (
        <div {...getRootProps()} className='file-upload'>
            <input {...getInputProps()} />
            {files && files?.length > 0 ? (
                <div className='relative'>
                    <Image
                        src={convertFileToUrl(files[0])}
                        width={1000}
                        height={1000}
                        alt='uploaded image'
                        className='h-[200px] overflow-hidden object-cover rounded-sm'
                    />
                    {
                        !require && (
                            <div className='absolute top-1 right-1 z-50'>
                                <Button onClick={(e) => handleDelete(e, files[0])} variant="ghost" size="icon" >
                                    <Trash />
                                </Button>
                            </div>
                        )
                    }
                </div>
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
                                تصویر را اینجا رها کنید
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