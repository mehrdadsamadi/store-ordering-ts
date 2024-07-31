"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ROLES } from "@/constants"
import { IUserModel } from "@/types/user/user.types"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"

import Image from "next/image"

export const usersColumn: ColumnDef<IUserModel>[] = [
    {
        accessorKey: 'firstname',
        header: 'نام',
        id: 'firstname',
        cell: ({ row: { original } }) => {
            return (
                <div className="flex items-center gap-2">
                    <Image width={1000} height={1000} className="size-10 rounded-full" src={original.avatar || '/placeholders/user-placeholder.jpg'} alt="user image" />
                    <div className="text-base">{original.firstname + " " + original.lastname}</div>
                </div>
            );
        },
    },
    {
        accessorKey: 'phone',
        header: 'تلفن',
        id: 'phone',
    },
    {
        accessorKey: 'role',
        header: 'نقش',
        id: 'role',
        cell: ({ row: { original } }) => {
            return (
                <Badge>
                    {Object.keys(ROLES).map(key => (ROLES[key].name === original.role && ROLES[key].persian))}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'actions',
        header: '',
        id: 'actions',
        cell: ({ row: { original } }) => (
            <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                    <Edit className="text-dark-600"/>
                </Button>
                <Button variant="outline" size="icon" onClick={() => { console.log(original); }} className="rounded-full ">
                    <Trash className="text-dark-600"/>
                </Button>
            </div>
        ),
    },
]
