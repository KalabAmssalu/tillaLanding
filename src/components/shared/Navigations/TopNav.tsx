"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ModeToggle } from "@/components/ui/custom/modeToggle";
import { IMAGES } from "@/constants/files";

import { NavigationMenuConf } from "./NavigationMenu";

const TopNav = () => {
	// 	const t = useTranslations();
	const route = useRouter();
	return (
		<nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 w-full">
			<div className=" mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-14">
					<div className="flex items-center gap-2">
						<Image
							src={IMAGES.OrginalLogo}
							width={30}
							alt={"logo"}
							onClick={() => route.push("/home")}
						/>
						<div
							className="text-xl font-bold text-primary hover:cursor-pointer"
							onClick={() => route.push("/home")}
						>
							Tilla Health Insurance
						</div>
						<NavigationMenuConf />
					</div>

					<div className="mr-0 flex items-center gap-2 md:mr-2">
						<ModeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default TopNav;
