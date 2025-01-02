"use client";

import { useRouter } from "next/navigation";

import { PersonStanding, UserRound, Users } from "lucide-react";

import ReusableHero from "@/components/shared/Hero/ReusableHero_Choice";
import BreadcrumbNav from "@/components/shared/Navigations/breadcrambNav";

const MembershipOptions = {
	individual: [
		{ label: "For Myself", icon: <UserRound size={16} />, self: true },
		{
			label: "Personal Representative",
			icon: <PersonStanding size={16} />,
			self: false,
		},
	],
	diaspora: [
		{ label: "For Myself", icon: <UserRound size={16} />, self: true },
		{
			label: "Personal Representative",
			icon: <PersonStanding size={16} />,
			self: false,
		},
	],
	international: [
		{ label: "For Myself", icon: <UserRound size={16} />, self: true },
		{
			label: "Personal Representative",
			icon: <PersonStanding size={16} />,
			self: false,
		},
	],
};

export default function MembershipSelection({
	params,
}: {
	params: { type: string };
}) {
	const router = useRouter();

	const handleSelection = (option: { label: string; self?: boolean }) => {
		if (params.type in MembershipOptions) {
			const query = `type=${params.type}&self=${option.self}`;
			router.push(`/member/register?${query}` as `/${string}`);
		} else if (option.label === "Individual") {
			router.push("/membership/individual" as `/${string}`);
		} else if (option.label === "Family") {
			router.push("/member/register?type=family" as `/${string}`);
		}
	};

	const options = MembershipOptions[
		params.type as keyof typeof MembershipOptions
	] || [
		{ label: "Individual", icon: <UserRound size={16} /> },
		{ label: "Family", icon: <Users size={16} /> },
	];

	return (
		<>
			<BreadcrumbNav
				items={[
					{ label: "Membership", href: "/membership/select" },
					{
						label:
							params.type.charAt(0).toUpperCase() + params.type.slice(1) ||
							"Select Plan",
					},
				]}
			/>
			<ReusableHero
				title={
					params.type === "individual" ||
					params.type === "diaspora" ||
					params.type === "international"
						? "Are you registering for yourself?"
						: "Choose Your Membership Plan"
				}
				description="Please select the option that best suits your needs to get started with your registration process."
				options={options.map((option) => ({
					...option,
					onClick: () => handleSelection(option),
				}))}
				footerText="Need help?"
				footerLink={{ label: "Contact Support", href: "/support" }}
			/>
		</>
	);
}
