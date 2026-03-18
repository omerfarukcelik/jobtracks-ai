import PageHeader from "@/components/ui/PageHeader";

export default function ApplicationsPage() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <PageHeader
                    title="Applications"
                    description="This is where you can view and manage your job applications."
                />
            </div>
        </main>
    );
}