"use client"

import { deleteSpecById, getSpecs } from '@/actions/specifications.actions'
import Loading from '@/components/Loading'
import { specificationsColumn } from '@/components/table/columns/specifications.column'
import { DataTable } from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SpecificaitonsPage = () => {
    const [loading, setLoading] = useState(true)
    const [specs, setSpecs] = useState([])

    useEffect(() => {
        fetchSpecs()
    }, [])

    const handleRemoveSpec = async (specId: string) => {
        await toast.promise(
            deleteSpecById(specId),
            {
                loading: 'در حال حذف مشخصه ...',
                success: ({ message }) => message,
                error: ({ error }) => error,
            }
        )
            .then(() => fetchSpecs())
    }

    const fetchSpecs = async () => {
        setLoading(true)
        setSpecs(await getSpecs())
        setLoading(false)
    }

    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex justify-between">
                <Link href={`/admin/products/create`} className="">
                    <Button variant="outline" className="">
                        ایجاد مشخصات
                    </Button>
                </Link>
            </div>
            <div className="w-full p-4 rounded-lg h-full relative">
                <Loading loading={loading} />
                {
                    !loading && (
                        <DataTable columns={specificationsColumn(handleRemoveSpec)} data={specs} />
                    )
                }
            </div>
        </section>
    )
}

export default SpecificaitonsPage