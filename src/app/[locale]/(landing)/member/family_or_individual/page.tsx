"use client";

import { useRouter } from "next/navigation";

import { PersonStanding, UserRound } from "lucide-react";

import ReusableHero from "@/components/shared/Hero/ReusableHero_Choice";

const PersonalOrRepresentative = () => {
	const route = useRouter();

	return (
		<ReusableHero
			title="Choose Your Membership Plan"
			description="	Please select the option that best suits your needs to get started
					with your registration process."
			options={[
				{
					label: "Individual",
					icon: <UserRound size={16} />,
					onClick: () => route.push("/member/register" as `/${string}`),
				},
				{
					label: "Family",
					icon: (
						<>
							<PersonStanding />
							<PersonStanding />
						</>
					),
					onClick: () =>
						route.push(
							"/member/individual_representative_registration" as `/${string}`
						),
				},
			]}
			footerText="Need help?"
			footerLink={{ label: "Contact Support", href: "/support" }}
		/>
	);
};

export default PersonalOrRepresentative;
