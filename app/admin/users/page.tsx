"use client"
import { getUsers } from '@/actions/users.actions'
import Loading from '@/components/Loading'
import { usersColumn } from '@/components/table/columns/users.column'
import { DataTable } from '@/components/table/DataTable'
import React, { useEffect, useState } from 'react'

const UsersPage = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        setUsers(await getUsers())
        setLoading(false)
    }

    return (
        <section className="gap-4 flex flex-col h-full">
            <div className="w-full p-4 rounded-lg h-full relative">
                <Loading loading={loading} />
                <DataTable columns={usersColumn} data={users}/>
            </div>
        </section>
    )
}

export default UsersPage