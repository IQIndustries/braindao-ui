import { cn } from "@/lib/utils";
import Image from "next/image";

// The wordmark is live text; only the brain stays an asset. The christmas mark
// carries a hat above the brain, so it is nudged down to keep the brain
// optically centred against the text.
export const BrandLogo = ({
	christmas,
	priority,
}: { christmas?: boolean; priority?: boolean }) => (
	<span className="flex items-center gap-[7px]">
		<Image
			src={
				christmas
					? "/svgs/braindao-mark-christmas.svg"
					: "/svgs/braindao-mark.svg"
			}
			alt=""
			width={37}
			height={42}
			priority={priority}
			className={cn(
				"w-auto",
				christmas ? "h-[45px] -translate-y-[6px]" : "h-8",
			)}
		/>
		<span className="text-[15px] font-semibold leading-none text-white">
			BrainDAO
		</span>
	</span>
);
