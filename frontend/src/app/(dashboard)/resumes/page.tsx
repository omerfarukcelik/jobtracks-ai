"use client"

import { useEffect, useState } from "react"
import { getAccessToken } from "@/lib/auth"
import {
    getResumes,
    getResumeStats,
    uploadResume,
    type Resume,
    type ResumeStats,
} from "@/lib/resumes"
import { FileText, Upload, Download, Trash2, Eye, MoreVertical, Plus, Star } from "lucide-react"
import { AppHeader } from "@/components/AppHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Progress } from "@/components/ui/Progress"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

export default function ResumesPage() {
    const [resumes, setResumes] = useState<Resume[]>([])
    const [stats, setStats] = useState<ResumeStats>({
        total_resumes: 0,
        best_match_score: 0,
        total_downloads: 0,
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [isUploading, setIsUploading] = useState(false)


    useEffect(() => {
        async function loadResumeData() {
            const token = getAccessToken()

            if (!token) {
                setError("You must be logged in.")
                setIsLoading(false)
                return
            }

            try {
                const [resumeData, statsData] = await Promise.all([
                    getResumes(token),
                    getResumeStats(token),
                ])

                setResumes(resumeData)
                setStats(statsData)
            } catch {
                setError("Failed to load resumes.")
            } finally {
                setIsLoading(false)
            }
        }

        loadResumeData()
    }, [])


    if (isLoading) {
        return <p className="p-6">Loading resumes...</p>
    }

    if (error) {
        return <p className="p-6 text-red-500">{error}</p>
    }

    async function handleUploadResume(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0]

        if (!file) return

        const token = getAccessToken()

        if (!token) {
            setError("You must be logged in.")
            return
        }

        setIsUploading(true)
        setError("")

        try {
            const uploadedResume = await uploadResume(
                token,
                file.name,
                file
            )

            setResumes((prev) => [uploadedResume, ...prev])

            setStats((prev) => ({
                ...prev,
                total_resumes: prev.total_resumes + 1,
                best_match_score: Math.max(
                    prev.best_match_score,
                    uploadedResume.match_score
                ),
            }))
        } catch {
            setError("Failed to upload resume.")
        } finally {
            setIsUploading(false)
            event.target.value = ""
        }
    }

    return (
        <>
            <AppHeader title="Saved Resume" />
            <div className="flex-1 overflow-auto p-6">
                {/* Header Actions */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Your Resumes</h2>
                        <p className="text-sm text-muted-foreground">
                            Manage and track your uploaded resumes
                        </p>
                    </div>
                    <label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleUploadResume}
                        />
                        <Button asChild disabled={isUploading}>
                            <span>
                                <Upload className="mr-2 size-4" />
                                {isUploading ? "Uploading..." : "Upload Resume"}
                            </span>
                        </Button>
                    </label>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-blue-50">
                                <FileText className="size-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{stats.total_resumes}</p>
                                <p className="text-sm text-muted-foreground">Total Resumes</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-emerald-50">
                                <Star className="size-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{stats.best_match_score}%</p>
                                <p className="text-sm text-muted-foreground">Best Match Score</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="flex size-12 items-center justify-center rounded-lg bg-amber-50">
                                <Download className="size-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{stats.total_downloads}</p>
                                <p className="text-sm text-muted-foreground">Times Downloaded</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Resume List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Resumes</CardTitle>
                        <CardDescription>Your uploaded resume documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {resumes.map((resume) => (
                                <div
                                    key={resume.id}
                                    className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex size-12 items-center justify-center rounded-lg bg-red-50">
                                            <FileText className="size-6 text-red-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-foreground">{resume.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Uploaded on {new Date(resume.uploaded_at).toLocaleDateString()} · `{Math.round(resume.file_size / 1024)} KB`
                                            </p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground">Match Score</span>
                                                <Progress value={resume.match_score} className="h-2 w-24" />
                                                <span className="text-xs font-medium text-foreground">{resume.match_score}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="mr-2 size-4" />
                                            Preview
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 size-4" />
                                            Download
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="size-8">
                                                    <MoreVertical className="size-4" />
                                                    <span className="sr-only">More options</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Set as Default</DropdownMenuItem>
                                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="mr-2 size-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}

                            {/* Upload Placeholder */}
                            <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-8 text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={handleUploadResume}
                                />
                                <Plus className="size-5" />
                                <span>{isUploading ? "Uploading..." : "Upload a new resume"}</span>
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Tips Card */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Resume Tips</CardTitle>
                        <CardDescription>Improve your resume to get more interviews</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-lg bg-muted/50 p-4">
                                <h4 className="font-medium text-foreground">Use Action Verbs</h4>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Start bullet points with strong action verbs like &quot;Led&quot;, &quot;Developed&quot;, or &quot;Implemented&quot;.
                                </p>
                            </div>
                            <div className="rounded-lg bg-muted/50 p-4">
                                <h4 className="font-medium text-foreground">Quantify Achievements</h4>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Include numbers and metrics to demonstrate your impact and results.
                                </p>
                            </div>
                            <div className="rounded-lg bg-muted/50 p-4">
                                <h4 className="font-medium text-foreground">Tailor to Job</h4>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Customize your resume for each application to match job requirements.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
