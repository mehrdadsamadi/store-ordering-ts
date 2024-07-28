import Sidebar from "@/components/admin/Sidebar"
import React from "react"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    // const { user } = useGetServerSession()
    // if (user?.role !== ROLES.ADMIN.name) {
    //     return redirect("/")
    // }
    return (
        <section className="h-screen">
            <Sidebar />
            <div className="p-4 pr-16 w-full h-full">
                {children}
            </div>
        </section>
    )
}

export default AdminLayout