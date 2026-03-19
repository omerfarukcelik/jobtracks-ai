"use client";

interface AppHeaderProps {
    title: string;
}

export function AppHeader({ title }: AppHeaderProps) {
    return (
        <header className="flex h-16 items-center border-b border-slate-200 bg-white px-6">
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        </header>
    );
}