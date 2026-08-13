import {
	EyebrowIcon,
	type EyebrowIconName,
} from "@/components/icons/eyebrow-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type React from "react";

export const Container = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => (
	<div className={cn("mx-auto w-full max-w-[1180px] px-5 sm:px-8", className)}>
		{children}
	</div>
);

export const Section = ({
	id,
	children,
	className,
}: { id?: string; children: React.ReactNode; className?: string }) => (
	<section id={id} className={cn("py-20 sm:py-24 lg:py-28", className)}>
		<Container>{children}</Container>
	</section>
);

export const Eyebrow = ({
	icon,
	children,
	className,
}: {
	icon: EyebrowIconName;
	children: React.ReactNode;
	className?: string;
}) => (
	<p
		className={cn(
			"flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-primary",
			className,
		)}
	>
		<EyebrowIcon name={icon} />
		{children}
	</p>
);

export const Display = ({
	children,
	className,
	as: Tag = "h2",
}: {
	children: React.ReactNode;
	className?: string;
	as?: "h1" | "h2" | "h3";
}) => (
	<Tag
		className={cn(
			"font-display font-normal text-white text-balance",
			Tag === "h1"
				? "text-[2.6rem] leading-[1.06] tracking-[-0.02em] sm:text-6xl lg:text-[4.25rem]"
				: "text-[2rem] leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem] lg:text-[2.9rem]",
			className,
		)}
	>
		{children}
	</Tag>
);

export const MonoLabel = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => (
	<span
		className={cn(
			"font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500",
			className,
		)}
	>
		{children}
	</span>
);

export const Panel = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => (
	<div
		className={cn(
			"rounded-xl border border-rule bg-surface overflow-hidden",
			className,
		)}
	>
		{children}
	</div>
);

export const PanelHeader = ({
	label,
	meta,
	metaTone = "muted",
}: { label: string; meta?: string; metaTone?: "muted" | "primary" }) => (
	<div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3 sm:px-5">
		<MonoLabel>{label}</MonoLabel>
		{meta && (
			<span
				className={cn(
					"font-mono text-[10px] uppercase tracking-[0.2em]",
					metaTone === "primary" ? "text-primary" : "text-neutral-600",
				)}
			>
				{meta}
			</span>
		)}
	</div>
);

const pillBase =
	"inline-flex items-center justify-center gap-2 rounded-full h-10 px-5 text-[13px] font-medium transition-colors whitespace-nowrap";

export const pillStyles = {
	solid: cn(pillBase, "bg-white text-black hover:bg-neutral-200"),
	outline: cn(
		pillBase,
		"border border-rule-strong bg-white/[0.03] text-white hover:bg-white/[0.08]",
	),
	ghost: cn(pillBase, "text-neutral-400 hover:text-white"),
};

export const PillLink = ({
	href,
	children,
	variant = "solid",
	external = false,
	className,
	analyticsKey,
}: {
	href: string;
	children: React.ReactNode;
	variant?: keyof typeof pillStyles;
	external?: boolean;
	className?: string;
	analyticsKey?: string;
}) => (
	<Link
		href={href}
		target={external ? "_blank" : undefined}
		rel={external ? "noopener noreferrer" : undefined}
		data-ph-capture-attribute-product-link-clicked={analyticsKey}
		className={cn(pillStyles[variant], className)}
	>
		{children}
	</Link>
);
