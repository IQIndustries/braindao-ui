"use client";

const ScrollToTopButton = ({ label }: { label: string }) => {
	return (
		<button
			type="button"
			className="inline-flex size-8 items-center justify-center rounded-full border border-rule-control text-neutral-400 transition-colors hover:border-primary hover:text-primary"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			title={label}
			aria-label={label}
		>
			<span aria-hidden="true" className="text-xs leading-none">
				↑
			</span>
		</button>
	);
};

export default ScrollToTopButton;
