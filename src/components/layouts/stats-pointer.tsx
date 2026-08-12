import { cn } from "@/lib/utils";
import InViewAnimateBottom from "../transitions/InViewAnimateBottom";

export const StatsPointers = ({
	title,
	content,
	className,
	headerSize,
}: {
	title: string;
	content: string;
	className?: string;
	headerSize?: string;
}) => {
	return (
		<InViewAnimateBottom className="flex-1">
			<div className="h-full flex border-l-2 border-pink-500 pl-4">
				<div className={cn("flex flex-col h-full", className)}>
					<h4
						className={cn(
							"text-foreground font-semibold font-satoshi",
							headerSize || "text-2xl xl:text-3xl",
						)}
					>
						{title}
					</h4>
					<span
						className={headerSize ? "" : "xl:text-lg text-muted-foreground"}
					>
						{content}
					</span>
				</div>
			</div>
		</InViewAnimateBottom>
	);
};
