import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface ApplicationPaginationProps {
    currentPage: number
    totalPages: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export function ApplicationPagination({
    currentPage,
    totalPages,
    setCurrentPage,
}: ApplicationPaginationProps) {
    if (totalPages <= 1) return null

    return (
        <div className="mt-6 flex items-center justify-between">
            <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="mr-1 size-4" />
                Previous
            </Button>

            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        className="size-8"
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Button>
                ))}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
            >
                Next
                <ChevronRight className="ml-1 size-4" />
            </Button>
        </div>
    )
}