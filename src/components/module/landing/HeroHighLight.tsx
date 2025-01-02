"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/custom/hero-highlight";
import { IMAGES } from "@/constants/files";

type HeroProps = {
	text: string;
	link: string;
	btnText: string;
};

export function HeroHighlightDemo({ text, link, btnText }: HeroProps) {
	const route = useRouter();
	return (
		<div className="relative bg-primary ">
			<HeroHighlight className="flex flex-col md:flex-row items-center justify-center h-[10rem] ">
				<motion.h1
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: [20, -5, 0],
					}}
					transition={{
						duration: 0.5,
						ease: [0.4, 0.0, 0.2, 1],
					}}
					className="text-lg px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
				>
					{/* &quot; {text} &quot; <br /> */}
					{/* <Highlight className="text-black dark:text-white text-4xl">
						Tilla Health Insurance.
					</Highlight> */}
					<Button
						className="text-lg font-bold  px-10 py-6 rounded-xl shadow-lg  transition-transform duration-300  hover:scale-105"
						variant="secondary"
						onClick={() => route.push(`${link}` as `/${string}`)}
					>
						{btnText}{" "}
					</Button>
				</motion.h1>
				{/* <div className="relative pt-20">
					<Image src={IMAGES.doctors} alt="doctors" width={1000} />
				</div> */}
			</HeroHighlight>
			{/* <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-20 w-full select-none bg-gradient-to-b from-transparent to-background" /> */}
		</div>
	);
}
