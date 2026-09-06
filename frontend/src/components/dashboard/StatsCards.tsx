import {
    Briefcase,
    CheckCircle,
    Clock,
    Users,
} from "lucide-react"
import type { Application } from "@/lib/applications"
import { getDashboardStats } from "@/lib/stats-utils"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card"

interface StatsCardsProps {
    applications: Application[]
}

export function StatsCards({ applications }: StatsCardsProps) {
    const stats = getDashboardStats(applications)

    const statsCards = [
        {
            title: "Total Applications",
            value: stats.totalApplications,
            icon: Briefcase,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
        },
        {
            title: "Pending",
            value: stats.pending,
            icon: Clock,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-500",

        },
        {
            title: "Offers",
            value: stats.offers,
            icon: CheckCircle,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
        },
        {
            title: "Interviews",
            value: stats.interviews,
            icon: Users,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-500",
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
                        <div
                            className={`flex size-10 items-center justify-center rounded-lg ${stat.iconBg}`}
                        >
                            <stat.icon className={`size-5 ${stat.iconColor}`} />
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">
                            {stat.value}
                        </div>

                    </CardContent>
                </Card>
            ))}
        </div>
    )
}