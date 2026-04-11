"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card"
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts"

const applicationTrendsData = [
    { month: "Jan", applications: 4, shortlisted: 1 },
    { month: "Feb", applications: 6, shortlisted: 2 },
    { month: "Mar", applications: 8, shortlisted: 3 },
    { month: "Apr", applications: 5, shortlisted: 2 },
    { month: "May", applications: 10, shortlisted: 4 },
    { month: "Jun", applications: 12, shortlisted: 5 },
    { month: "Jul", applications: 9, shortlisted: 3 },
    { month: "Aug", applications: 14, shortlisted: 6 },
    { month: "Sep", applications: 11, shortlisted: 4 },
    { month: "Oct", applications: 16, shortlisted: 7 },
    { month: "Nov", applications: 13, shortlisted: 5 },
    { month: "Dec", applications: 18, shortlisted: 8 },
]

export function ApplicationTrendsChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>Your application activity over the year</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={applicationTrendsData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="fillApplications" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>

                                <linearGradient id="fillShortlisted" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                            />

                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="applications"
                                stroke="#6366f1"
                                strokeWidth={2}
                                fill="url(#fillApplications)"
                            />

                            <Area
                                type="monotone"
                                dataKey="shortlisted"
                                stroke="#22c55e"
                                strokeWidth={2}
                                fill="url(#fillShortlisted)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}