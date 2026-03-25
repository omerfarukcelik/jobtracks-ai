"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Settings,
    Sparkles,
    ChevronRight
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { mockUser } from "@/lib/mock-data"

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

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar className="border-r border-border">
            <SidebarHeader className="px-4 py-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">interview</span>
                    <span className="flex gap-0.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    </span>
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
                                        <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                                        <AvatarFallback className="bg-muted text-muted-foreground">
                                            {mockUser.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-medium text-foreground">{mockUser.name}</span>
                                        <span className="text-xs text-muted-foreground">{mockUser.email}</span>
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