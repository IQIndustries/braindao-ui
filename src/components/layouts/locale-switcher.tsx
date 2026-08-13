"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "../../../i18n/routing";
import { localeSchema, locales } from "../../../messages/_schema";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface LocaleSwitcherProps {
	className?: string;
}

const LocaleSwitcher = ({ className }: LocaleSwitcherProps) => {
	const pathname = usePathname();
	const locale = useLocale();

	const visibleLocales = locales.filter((loc) => !loc.isHidden);
	const defaultLocale = visibleLocales.find((loc) => "default" in loc);
	const currentLocale =
		visibleLocales.find(
			(loc) =>
				loc.locale ===
				(locale === localeSchema.enum.ko ? localeSchema.enum.kr : locale),
		) ?? defaultLocale;

	const strippedPathname = pathname.replace(`/${locale}`, "") || "/";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className={cn(
						"flex items-center gap-1 sm:gap-2 hover:bg-white/10 border border-white/20 rounded-full uppercase text-xs md:text-sm transition-colors duration-200",
						className,
					)}
				>
					<Globe className="h-3 w-3 md:h-4 md:w-4" />
					{currentLocale?.locale}
					<ChevronDown className="w-3 h-3" aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-64 bg-canvas/95 border border-white/20 rounded-xl p-2 shadow-lg backdrop-blur-md">
				{visibleLocales.map((loc) => (
					<DropdownMenuItem key={loc.locale} className="p-0">
						<Link
							locale={loc.locale}
							href={strippedPathname}
							aria-label={`Change language to ${loc.name}`}
							className={cn(
								"w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-white/10 text-sm",
							)}
						>
							<div className="flex items-center gap-2">
								<Image
									src={loc.icon}
									alt={loc.name}
									width={28}
									height={20}
									aria-hidden="true"
									className="rounded-sm"
								/>
								<span>{loc.name}</span>
							</div>
							{currentLocale?.locale === loc.locale && (
								<span className="text-primary font-medium text-xs">✓</span>
							)}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LocaleSwitcher;
