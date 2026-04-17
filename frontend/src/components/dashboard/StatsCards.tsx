import {
    Briefcase,
    CheckCircle,
    Clock,
    Users,
    ArrowUpRight,
} from "lucide-react"
import type { JobApplication } from "@/lib/mock-data"
import { getDashboardStats } from "@/lib/stats-utils"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card"

interface StatsCardsProps {
    applications: JobApplication[]
}

export function StatsCards({ applications }: StatsCardsProps) {
    const stats = getDashboardStats(applications)

    const statsCards = [
        {
            title: "Total Applications",
            value: stats.totalApplications,
            icon: Briefcase,
            change: "+12%",
            description: "from last month",
        },
        {
            title: "Pending",
            value: stats.pending,
            icon: Clock,
            change: "+4",
            description: "awaiting response",
        },
        {
            title: "Shortlisted",
            value: stats.shortlisted,
            icon: CheckCircle,
            change: "+2",
            description: "this week",
        },
        {
            title: "Interviews",
            value: stats.interviews,
            icon: Users,
            change: "+3",
            description: "scheduled",
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsCards.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="size-4 text-muted-foreground" />
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {stat.value}
                        </div>

                        <div className="flex items-center gap-1 text-xs">
                            <span className="text-emerald-600">
                                <ArrowUpRight className="inline size-3" />
                                {stat.change}
                            </span>
                            <span className="text-muted-foreground">
                                {stat.description}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}