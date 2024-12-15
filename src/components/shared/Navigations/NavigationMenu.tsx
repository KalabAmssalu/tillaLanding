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
			<NavigationMenuList>
				{isActive("/am/provider/register") ||
					isActive("/am/broker/register") ||
					isActive("/en-US/provider/register") ||
					isActive("/en-US/broker/register") || (
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
										onClick={closeMenu}
									>
										Tilla Health Members
									</Button>
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					)}
				{isActive("/am/member/register") ||
					isActive("/am/broker/register") ||
					isActive("/en-US/member/register") ||
					isActive("/en-US/broker/register") || (
						<NavigationMenuItem>
							<Link href="/am/provider" legacyBehavior passHref>
								<NavigationMenuLink className="bg-transparent">
									<Button
										className={cn(
											(isActive("/am/provider") ||
												isActive("/en-US/provider")) &&
												"bg-primary text-white"
										)}
										variant="ghost"
										onClick={closeMenu}
									>
										Tilla Health Providers
									</Button>
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					)}
				{isActive("/am/member/register") ||
					isActive("/am/provider/register") ||
					isActive("/en-US/member/register") ||
					isActive("/en-US/provider/register") || (
						<NavigationMenuItem>
							<Link href="/am/broker" legacyBehavior passHref>
								<NavigationMenuLink className="bg-transparent">
									<Button
										className={cn(
											(isActive("/am/broker") || isActive("/en-US/broker")) &&
												"bg-primary text-white"
										)}
										variant="ghost"
										onClick={closeMenu}
									>
										Tilla Health Brokers
									</Button>
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					)}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
