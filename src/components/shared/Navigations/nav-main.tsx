import * as React from "react";

import { type LucideIcon } from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

// Type definition for the items
interface NavMainProps {
	items: {
		title: string;
		url: string;
		items: {
			icon: LucideIcon;
			title: string;
			url: string;
		}[];
	}[];
}

export function NavMain({
	items,
	...props
}: NavMainProps & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item, index) => (
						<SidebarMenuItem key={index}>
							<SidebarMenuButton asChild size="sm">
								<a href={item.url}>
									{/* Main Item Icon (optional) */}
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>

							{/* Nested items, if any */}
							{item.items && item.items.length > 0 && (
								<SidebarMenu>
									{item.items.map((subItem, subIndex) => (
										<SidebarMenuItem key={subIndex}>
											<SidebarMenuButton asChild size="sm">
												<a href={subItem.url}>
													{/* Sub Item Icon */}
													<subItem.icon />
													<span>{subItem.title}</span>
												</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							)}
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
