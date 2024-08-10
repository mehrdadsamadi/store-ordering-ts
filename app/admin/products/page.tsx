"use client"

import { getProducts } from '@/actions/products.actions'
import Loading from '@/components/Loading'
import { productsColumn } from '@/components/table/columns/products.column'
import { DataTable } from '@/components/table/DataTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ProductsPage = () => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        setLoading(true)
        setProducts(await getProducts())
        setLoading(false)
    }

    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex justify-between">
                <Link href={`/admin/products/create`} className="">
                    <Button variant="outline" className="">
                        ایجاد محصول
                    </Button>
                </Link>
            </div>
            <div className="w-full p-4 rounded-lg h-full relative">
                <Loading loading={loading} />
                {
                    !loading && (
                        <DataTable columns={productsColumn} data={products} />
                    )
                }
            </div>
        </section>
    )
}

export default ProductsPage