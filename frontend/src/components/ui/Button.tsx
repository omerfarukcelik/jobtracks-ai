import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
    children: ReactNode;
    href: string;
    variant?: ButtonVariant;
}

export default function Button({
    children,
    href,
    variant = "primary",
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium transition";

    const variantStyles =
        variant === "primary"
            ? "bg-slate-900 text-white hover:bg-slate-700"
            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100";

    return (
        <Link href={href} className={`${baseStyles} ${variantStyles}`}>
            {children}
        </Link>
    );
}
