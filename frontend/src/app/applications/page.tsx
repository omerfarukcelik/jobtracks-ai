"use client"

import { useState } from "react"
import { AddApplicationModal } from "@/components/applications/AddApplicationModal"
import { AppHeader } from "@/components/AppHeader"
import { ApplicationTable } from "@/components/applications/ApplicationTable"
import { Button } from "@/components/ui/Button"

export default function ApplicationsPage() {
    const [open, setOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-50">
            <AppHeader title="Applications" />

            <main className="p-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900">
                                Job Applications
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Manage and track all your job applications.
                            </p>
                        </div>

                        <Button onClick={() => setOpen(true)}>
                            Add Application
                        </Button>
                    </div>

                    <ApplicationTable />
                </div>
            </main>

            <AddApplicationModal
                open={open}
                onOpenChange={setOpen}
            />
        </div>
    )
}