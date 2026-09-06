"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Settings,
    Sparkles,
    ChevronRight,
    LogOut
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/Sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { getAccessToken, logout } from "@/lib/auth"

const mainNavItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    }
]

const jobBoardNavItems = [
    {
        title: "Applications",
        href: "/applications",
        icon: Briefcase
    },
    {
        title: "Saved Resume",
        href: "/resumes",
        icon: FileText
    },
    {
        title: "AI Recommendations",
        href: "/recommendations",
        icon: Sparkles
    }
]

const toolsNavItems = [
    {
        title: "Settings",
        href: "/settings",
        icon: Settings
    }
]

type User = {
    id: number
    username: string
    email: string
}

export function AppSidebar() {
    const pathname = usePathname()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const token = getAccessToken()

            if (!token) {
                return
            }

            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/auth/user/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (!response.ok) {
                    throw new Error("Failed to fetch user")
                }

                const data: User = await response.json()
                setUser(data)
            } catch (error) {
                console.error("Error fetching user:", error)
            }
        }

        fetchUser()
    }, [])

    return (
        <Sidebar className="border-r border-border">
            <SidebarHeader className="px-4 py-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">JobTracks-AI</span>
                    {/* <span className="flex gap-0.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    </span> */}
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Main
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                                        <Link href={item.href}>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Job Board
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {jobBoardNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                                        <Link href={item.href}>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Tools
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {toolsNavItems.map((item) => (

                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                                        <Link href={item.href}>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={logout}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <LogOut className="size-4" />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="h-auto py-3">
                            <Link href="/profile" className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-10">
                                        <AvatarFallback className="bg-muted text-muted-foreground">
                                            {user?.username?.charAt(0).toUpperCase() || "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-medium text-foreground">
                                            {user?.username || "Loading..."}
                                        </span>

                                        <span className="text-xs text-muted-foreground">
                                            {user?.email || ""}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight className="size-4 text-muted-foreground" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}