import { AppHeader } from "@/components/AppHeader"
import { ApplicationTable } from "@/components/applications/ApplicationTable"
import { Button } from "@/components/ui/Button"

export default function ApplicationsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <AppHeader title="Applications" />

            <main className="p-6">
                <div className="mx-auto max-w-6xl">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Job Applications</h2>
                        <Button>Add Application</Button>
                    </div>

                    <ApplicationTable />
                </div>
            </main>
        </div>
    )
}