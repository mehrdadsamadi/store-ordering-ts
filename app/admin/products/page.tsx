"use client"

import { getProducts } from '@/actions/products.actions'
import Loading from '@/components/Loading'
import { productsColumn } from '@/components/table/columns/products.column'
import { DataTable } from '@/components/table/DataTable'
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
            <div className="w-full p-4 rounded-lg h-full relative">
                <Loading loading={loading} />
                <DataTable columns={productsColumn} data={products}/>
            </div>
        </section>
    )
}

export default ProductsPage