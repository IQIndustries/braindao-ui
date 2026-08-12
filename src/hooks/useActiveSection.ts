"use client";

import { navLinks } from "@/data/Nav";
import { useEffect, useState } from "react";

export const useActiveSection = () => {
	const [activeSection, setActiveSection] = useState<string>("");

	useEffect(() => {
		const sections = navLinks
			.map((link) => link.section)
			.filter((section): section is string => Boolean(section));

		const handleScroll = () => {
			const scrollPosition = window.scrollY + 150;
			let foundActiveSection = "";

			for (const sectionId of sections) {
				const element = document.getElementById(sectionId);
				if (element) {
					const { offsetTop, offsetHeight } = element;
					if (
						scrollPosition >= offsetTop &&
						scrollPosition < offsetTop + offsetHeight
					) {
						foundActiveSection = sectionId;
						break;
					}
				}
			}

			if (foundActiveSection !== activeSection) {
				setActiveSection(foundActiveSection);
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, [activeSection]);

	return activeSection;
};
