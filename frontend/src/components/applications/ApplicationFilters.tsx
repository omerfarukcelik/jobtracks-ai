"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import type { ApplicationStatus } from "@/lib/mock-data"

interface ApplicationFiltersProps {
    selectedStatus: ApplicationStatus | "all"
    setSelectedStatus: (value: ApplicationStatus | "all") => void
    searchQuery: string
    setSearchQuery: (value: string) => void
    setCurrentPage: (value: number) => void
}

const statusFilters = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "shortlisted", label: "Shortlisted" },
    { value: "rejected", label: "Rejected" },
    { value: "interviewed", label: "Interviewed" },
]

export function ApplicationFilters({
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
}: ApplicationFiltersProps) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <Tabs
                value={selectedStatus}
                onValueChange={(value) => {
                    setSelectedStatus(value as ApplicationStatus | "all")
                    setCurrentPage(1)
                }}
            >
                <TabsList>
                    {statusFilters.map((filter) => (
                        <TabsTrigger key={filter.value} value={filter.value}>
                            {filter.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                    }}
                    className="w-full pl-9 sm:w-64"
                />
            </div>

        </div>
    )
}