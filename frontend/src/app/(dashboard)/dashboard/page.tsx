import { AppHeader } from "@/components/AppHeader"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { ApplicationTrendsChart } from "@/components/dashboard/ApplicationTrendsChart"

export default function DashboardPage() {
    return (
        <>
            <AppHeader title="" />

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

                    <StatsCards />

                    <div className="mt-6">
                        <ApplicationTrendsChart />
                    </div>
                </div>
            </div>
        </>
    )
}