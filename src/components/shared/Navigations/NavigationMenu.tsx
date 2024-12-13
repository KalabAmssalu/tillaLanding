"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavigationMenuConfProps {
	closeMenu: () => void; // Define the type for closeMenu
}

export function NavigationMenuConf({ closeMenu }: NavigationMenuConfProps) {
	const path = usePathname();

	const isActive = (route: string) => path?.startsWith(route);

	return (
		<NavigationMenu>
			<NavigationMenuList className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
				{" "}
				{/* Use grid layout */}
				<NavigationMenuItem>
					<Link href="/am/home" legacyBehavior passHref>
						<NavigationMenuLink className="bg-transparent">
							<Button
								className={cn(
									(isActive("/am/home") ||
										isActive("/en-US/member") ||
										isActive("/am/member")) &&
										"bg-primary text-white"
								)}
								variant="ghost"
								onClick={closeMenu} // Close menu on click
							>
								Tilla Health Members
							</Button>
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/am/provider" legacyBehavior passHref>
						<NavigationMenuLink className="bg-transparent">
							<Button
								className={cn(
									(isActive("/am/provider") || isActive("/en-US/provider")) &&
										"bg-primary text-white"
								)}
								variant="ghost"
								onClick={closeMenu} // Close menu on click
							>
								Tilla Health Providers
							</Button>
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/am/broker" legacyBehavior passHref>
						<NavigationMenuLink className="bg-transparent">
							<Button
								className={cn(
									(isActive("/am/broker") || isActive("/en-US/broker")) &&
										"bg-primary text-white"
								)}
								variant="ghost"
								onClick={closeMenu} // Close menu on click
							>
								Tilla Health Brokers
							</Button>
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
