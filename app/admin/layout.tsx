import { getCookie } from "@/actions/cookies.actions";
import Sidebar from "@/components/admin/Sidebar"
import { ROLES } from "@/constants";
import { redirect } from "next/navigation";
import React from "react"

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getCookie("user")
        if(user?.role !== ROLES.ADMIN.name)
            return redirect("/");

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