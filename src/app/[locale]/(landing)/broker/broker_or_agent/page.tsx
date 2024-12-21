"use client";

import { useRouter } from "next/navigation";

import { BookUser, UserRoundPen } from "lucide-react";

import ReusableHero from "@/components/shared/Hero/ReusableHero_Choice";
import BreadcrumbNav from "@/components/shared/Navigations/breadcrambNav";

const RoleOptions = [
	{
		label: "Broker",
		icon: <UserRoundPen size={16} />,
		path: "/broker/register/1",
	},
	{ label: "Agent", icon: <BookUser size={16} />, path: "/broker/register/2" },
];

const BrokerOrAgent = () => {
	const router = useRouter();

	const handleSelection = (option: any) => {
		router.push(option.path as `/${string}`);
	};

	return (
		<>
			<BreadcrumbNav
				items={[
					{ label: "Broker Registration", href: "/broker/select" },
					{ label: "Choose Your Role" },
				]}
			/>
			<ReusableHero
				title="Choose Your Role"
				description="Please select the option that best suits your role to get started with your registration process."
				options={RoleOptions.map((option) => ({
					...option,
					onClick: () => handleSelection(option),
				}))}
				footerText="Need help?"
				footerLink={{ label: "Contact Support", href: "/support" }}
			/>
		</>
	);
};

export default BrokerOrAgent;
