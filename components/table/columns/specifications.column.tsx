"use client"

import ConfirmButton from "@/components/ConfirmButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ISpecModel } from "@/types/specificaion/specification.types"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"
import Link from "next/link"

export const specificationsColumn = (handleRemoveSpec: (specId: string) => void): ColumnDef<ISpecModel>[] => [
    {
        accessorKey: 'specifications',
        header: 'مشخصات',
        id: 'specifications',
        cell: ({ row: { original } }) => {
            return (
                <div className="flex items-center gap-2">
                    {
                        original?.specifications?.map((spec, index) => (
                            <Badge className="w-fit" key={index}>{spec.specTitle}</Badge>
                        ))
                    }
                </div>
            );
        },
    },
    {
        accessorKey: 'product',
        header: 'محصول',
        id: 'product',
        cell: ({ row: { original } }) => {
            return (
                <span>{original?.product?.name}</span>
            );
        },
    },
    {
        accessorKey: 'category',
        header: 'دسته بندی',
        id: 'category',
        cell: ({ row: { original } }) => {
            return (
                <span>{original?.category?.name}</span>
            );
        },
    },
    {
        accessorKey: 'brand',
        header: 'برند',
        id: 'brand',
        cell: ({ row: { original } }) => {
            return (
                <span>{original?.brand?.name}</span>
            );
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        id: 'actions',
        cell: ({ row: { original } }) => (
            <div className="flex gap-2">
                <Link href={`/admin/specifications/create/${original._id}`} className="">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Edit className="text-dark-600" />
                    </Button>
                </Link>
                <ConfirmButton
                    triggerBtnText={<Trash className="text-dark-600" />}
                    title='حذف'
                    description='برای حذف مشخصه مطمعن هستید؟'
                    onSubmit={() => handleRemoveSpec(original._id)}
                    className="rounded-full "
                />

            </div>
        ),
    },
]
