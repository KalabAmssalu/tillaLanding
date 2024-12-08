"use client";

import { useRouter } from "next/navigation";

import { PersonStanding, UserRound } from "lucide-react";

import ReusableHero from "@/components/shared/Hero/ReusableHero_Choice";

const PersonalOrRepresentative = () => {
	const route = useRouter();

	return (
		<ReusableHero
			title="Are you registering for yourself?"
			description="Please select the option that best suits your needs to get started with your registration process."
			options={[
				{
					label: "Myself",
					icon: <UserRound size={16} />,
					onClick: () => route.push("/member/register" as `/${string}`),
				},
				{
					label: "Personal Representative",
					icon: (
						<>
							<PersonStanding />
							<PersonStanding />
						</>
					),
					onClick: () => route.push("/member/register" as `/${string}`),
				},
			]}
			footerText="Need help?"
			footerLink={{ label: "Contact Support", href: "/support" }}
		/>
	);
};

export default PersonalOrRepresentative;
