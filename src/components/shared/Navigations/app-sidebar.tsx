"use client";

import Image from "next/image";
import * as React from "react";

import {
	CircleHelp,
	ClipboardPlus,
	FileStack,
	HandCoins,
	LayoutDashboard,
	LogOut,
	MessageCircleMore,
	Settings,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IMAGES } from "@/constants/files";

import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
	user: {
		name: "Black Lion",
		email: "m@example.com",
		avatar: "imagePath",
	},
	navMain: [
		{
			title: "Providers Platform",
			url: "#",
			items: [
				{
					icon: LayoutDashboard,
					title: "Dashboard",
					url: "/home",
				},
				{
					icon: ClipboardPlus,
					title: "Add Claims",
					url: "/claims",
				},
				{
					icon: FileStack,
					title: "Claims History",
					url: "/claims/history",
				},
				{
					icon: HandCoins,
					title: "Payment",
					url: "/payment",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Contact Us",
			url: "#",
			icon: MessageCircleMore,
		},
		{
			title: "Help",
			url: "#",
			icon: CircleHelp,
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings,
		},
		{
			title: "Log Out",
			url: "#",
			icon: LogOut,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	// const { mutate: logOut } = useLogout();

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="/home">
								<Image
									src={IMAGES.OrginalLogo}
									alt="Logo of tilla"
									width={34}
									height={34}
									className=""
								/>

								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-bold text-primary">
										Tilla Health Insurance
									</span>
									<span className="truncate text-xs">ጥላ የጤና መድህን ድርጅት</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
