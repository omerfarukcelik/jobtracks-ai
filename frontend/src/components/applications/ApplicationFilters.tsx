"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/Input"
import type { ApplicationStatus } from "@/lib/applications"

interface ApplicationFiltersProps {
    selectedStatus: ApplicationStatus | "all"
    setSelectedStatus: (value: ApplicationStatus | "all") => void
    searchQuery: string
    setSearchQuery: (value: string) => void
    setCurrentPage: (value: number) => void
}

const statusFilters = [
    { value: "all", label: "All" },
    { value: "PENDING", label: "Pending" },
    { value: "APPLIED", label: "Applied" },
    { value: "INTERVIEW", label: "Interview" },
    { value: "REJECTED", label: "Rejected" },
    { value: "OFFER", label: "Offer" },
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

            <div className="inline-flex h-9 w-fit items-center rounded-lg bg-muted p-[3px]">
                {statusFilters.map((filter) => {
                    const isActive = selectedStatus === filter.value

                    return (
                        <button
                            key={filter.value}
                            type="button"
                            onClick={() => {
                                setSelectedStatus(
                                    filter.value as ApplicationStatus | "all"
                                )
                                setCurrentPage(1)
                            }}
                            className={`inline-flex h-[calc(100%-1px)] items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors ${isActive
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {filter.label}
                        </button>
                    )
                })}
            </div>

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