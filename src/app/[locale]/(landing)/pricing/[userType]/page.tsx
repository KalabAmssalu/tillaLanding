import { notFound } from "next/navigation";

import FamilyPlanSelection from "@/components/module/registeration/pricing/FamilyPlanSelection";
import PlanSelection from "@/components/module/registeration/pricing/PlanSelection";

export default function PricingPage({
	params,
}: {
	params: { userType: string };
}) {
	const validUserTypes = ["family", "individual", "diaspora", "international"];

	if (!validUserTypes.includes(params.userType)) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			{/* <h1 className="text-3xl font-bold mb-6">
				Plan Selection for {params.userType}
			</h1> */}

			<main className="min-h-screen mb-10 bg-background">
				{params.userType === "family" ? (
					<FamilyPlanSelection userType="family" />
				) : (
					<PlanSelection userType={params.userType} />
				)}
			</main>
		</div>
	);
}
