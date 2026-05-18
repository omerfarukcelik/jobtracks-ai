"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAccessToken } from "@/lib/auth"
import { SidebarProvider, SidebarInset } from "@/components/ui/Sidebar"
import { AppSidebar } from "@/components/AppSidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    useEffect(() => {
        const token = getAccessToken()
        if (!token) {
            router.push("/login")
        }
    }, [router])

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col">
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}