import React from "react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemProps {
	label: string;
	href?: string;
}

interface BreadcrumbNavProps {
	items: BreadcrumbItemProps[];
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
	return (
		<div className="container mx-auto px-4">
			<Breadcrumb className="pt-2">
				<BreadcrumbList className="flex flex-wrap">
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					{items.map((item, index) => (
						<React.Fragment key={index}>
							<BreadcrumbItem>
								{index === items.length - 1 ? (
									<BreadcrumbPage>{item.label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
								)}
							</BreadcrumbItem>
							{index < items.length - 1 && <BreadcrumbSeparator />}
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};

export default BreadcrumbNav;
