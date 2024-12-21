"use client";

import { useRouter } from "next/navigation";

import { Globe, MapPin, UserRound, Users } from "lucide-react";

import ReusableHero from "@/components/shared/Hero/ReusableHero_Choice";
import BreadcrumbNav from "@/components/shared/Navigations/breadcrambNav";

const ProviderOptions = [
	{ label: "Based in Ethiopia", icon: <MapPin size={16} />, self: true },
	{
		label: "Based outside of Ethiopia",
		icon: <Globe size={16} />,
		self: false,
	},
];

export default function ProviderSelection() {
	const router = useRouter();

	const handleSelection = (option: { label: string; self?: boolean }) => {
		const query = `workplace=${option.label.toLowerCase()}`;
		router.push(`/provider/register?${query}` as `/${string}`);
	};

	return (
		<>
			<BreadcrumbNav
				items={[
					{ label: "Provider Registration", href: "/provider" },
					{ label: "Choose Your Place of Work" },
				]}
			/>
			<ReusableHero
				title="Where is your company based?"
				description="Please select whether you are a Local or an International provider to continue with your registration."
				options={ProviderOptions.map((option) => ({
					...option,
					onClick: () => handleSelection(option),
				}))}
				footerText="Need assistance?"
				footerLink={{ label: "Contact Support", href: "/support" }}
			/>
		</>
	);
}
