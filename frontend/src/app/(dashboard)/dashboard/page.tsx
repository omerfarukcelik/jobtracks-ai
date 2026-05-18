"use client"

import { AppHeader } from "@/components/AppHeader"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { ApplicationTrendsChart } from "@/components/dashboard/ApplicationTrendsChart"
import { getApplications, type Application } from "@/lib/applications"
import { getAccessToken } from "@/lib/auth"
import { useEffect, useState } from "react"

export default function DashboardPage() {
    const [applications, setApplications] = useState<Application[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadApplications() {
            const token = getAccessToken()

            if (!token) {
                setError("You must be logged in.")
                setIsLoading(false)
                return
            }

            try {
                const data = await getApplications(token)
                setApplications(data)
            } catch {
                setError("Failed to load applications.")
            } finally {
                setIsLoading(false)
            }
        }

        loadApplications()
    }, [])
    if (isLoading) {
        return <p className="p-6">Loading dashboard...</p>
    }
    if (error) {
        return <p className="text-red-500">{error}</p>
    }
    return (
        <>
            <AppHeader title="Dashboard" />

            <div className="flex-1 overflow-auto p-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-foreground">
                            Dashboard
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Your job application insights and activity.
                        </p>
                    </div>

                    <StatsCards applications={applications} />

                    <div className="mt-6">
                        <ApplicationTrendsChart applications={applications} />
                    </div>
                </div>
            </div>
        </>
    )
}