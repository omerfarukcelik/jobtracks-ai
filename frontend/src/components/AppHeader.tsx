"use client"

import Link from "next/link"
import { Bell, Search, Settings } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { SidebarTrigger } from "@/components/ui/Sidebar"

interface AppHeaderProps {
    title: string
}

export function AppHeader({ title }: AppHeaderProps) {
    return (
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search"
                        className="w-64 pl-9 bg-muted/50 border-0"
                    />
                </div>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="size-5 text-muted-foreground" />
                    <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-destructive" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/settings">
                        <Settings className="size-5 text-muted-foreground" />
                        <span className="sr-only">Settings</span>
                    </Link>
                </Button>
            </div>
        </header>
    )
}