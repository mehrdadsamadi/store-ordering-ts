"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IProductModel } from "@/types/product/product.types"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const productsColumn: ColumnDef<IProductModel>[] = [
    {
        accessorKey: 'name',
        header: 'نام',
        id: 'name',
        cell: ({ row: { original } }) => {
            return (
                <div className="flex items-center gap-2">
                    <Image width={1000} height={1000} className="size-10 rounded-full" src={original.images[0] || '/placeholders/user-placeholder.jpg'} alt="Jese image" />
                    <div className="text-base">{original.name}</div>
                </div>
            );
        },
    },
    {
        accessorKey: 'slug',
        header: 'اسلاگ',
        id: 'slug',
    },
    {
        accessorKey: 'visible',
        header: 'قابل نمایش',
        id: 'visible',
        cell: ({ row: { original } }) => {
            return (
                <Badge>{original.visible ? "بله" : 'خیر'}</Badge>
            );
        },
    },
    {
        accessorKey: 'brand',
        header: 'برند',
        id: 'brand',
        cell: ({ row: { original } }) => {
            return (
                <span>{original.brand?.name}</span>
            );
        },
    },
    {
        accessorKey: 'category',
        header: 'دسته بندی',
        id: 'category',
        cell: ({ row: { original } }) => {
            return (
                <span>{original.category?.name}</span>
            );
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        id: 'actions',
        cell: ({ row: { original } }) => (
            <div className="flex gap-2">
                <Link href={`/admin/products/create/${original._id}`} className="">
                    <Button variant="outline" size="icon" className="rounded-full">
                        <Edit className="text-dark-600" />
                    </Button>
                </Link>
                <Button variant="outline" size="icon" onClick={() => { console.log(original); }} className="rounded-full ">
                    <Eye className="text-dark-600" />
                </Button>

            </div>
        ),
    },
]
