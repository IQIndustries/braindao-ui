import { cn } from "@/lib/utils";
import Link from "next/link";

export type StatCellProps = {
	label: string;
	value: string | null;
	foot: string;
	change?: { iqChange: number | null; formattedChange: string | null };
	link: string;
	external?: boolean;
	errorMessage: string;
	className?: string;
};

export function StatCell({
	label,
	value,
	foot,
	change,
	link,
	external = true,
	errorMessage,
	className,
}: StatCellProps) {
	return (
		<Link
			href={link}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			className={cn(
				"group flex flex-col gap-1.5 border-rule-soft p-5 transition-colors hover:bg-white/[0.03] sm:p-8",
				className,
			)}
		>
			<span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
				{label}
			</span>

			<span className="font-mono text-2xl text-white sm:text-2xl">
				{value ?? errorMessage}
			</span>

			<span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em]">
				{change?.formattedChange ? (
					<>
						<span
							className={cn(
								(change.iqChange ?? 0) < 0 ? "text-primary" : "text-green-500",
							)}
						>
							{change.formattedChange}%
						</span>
						<span className="text-neutral-600">{foot}</span>
					</>
				) : (
					<span className="text-neutral-600">{foot}</span>
				)}
			</span>
		</Link>
	);
}
