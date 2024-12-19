"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Check, X } from "lucide-react";

import {
	useCheckoutChapa,
	useCheckoutStrip,
} from "@/actions/Query/payment_Query/payement_Query";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { pricingTiers } from "@/constants/data/PricingPlanData";
import { useAppSelector } from "@/hooks/storehooks";
import { cn } from "@/lib/utils";
import { type PricingTier } from "@/types/pricing/PricingType";

import { CheckoutDialog } from "./CheckoutDialog";

export default function PlanSelection({ userType }: { userType: string }) {
	const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
		"monthly"
	);
	const memberData = useAppSelector((state) => state.member.memberSlice);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);
	const router = useRouter();
	const isDiaspora = userType === "diaspora" || userType === "international";
	const currency = isDiaspora ? "USD" : "ETB";
	const handleBillingCycleChange = (checked: boolean) => {
		setBillingCycle(checked ? "yearly" : "monthly");
	};

	const handlePlanSelection = (plan: PricingTier) => {
		setSelectedPlan(plan);
		setIsDialogOpen(true);
	};

	const fullName = memberData.is_representative
		? `${memberData.representative_first_name} ${
				memberData.representative_last_name
			}`
		: `${memberData.first_name} ${memberData.last_name}`;

	const planPrice =
		selectedPlan?.price[billingCycle as keyof typeof selectedPlan.price] || 0;

	const memberCount = 1;
	const totalPrice = planPrice * memberCount;

	const { mutate: checkoutStripMutation } = useCheckoutStrip();
	const { mutate: checkoutChapaMutation } = useCheckoutChapa();

	const handleSubmit = (paymentMethod: "stripe" | "chapa") => {
		console.log("paymentMethod", paymentMethod);
		if (paymentMethod === "stripe") {
			if (selectedPlan) {
				checkoutStripMutation(
					{
						email: memberData.representative_email_address,
						member_id: memberData.id.toString(),
						billing_cycle: billingCycle,
						plan_type: selectedPlan.title.toLowerCase().replace(" ", "_"),
						members_count: memberCount,
						amount: totalPrice,
					},
					{
						onSuccess: () => {
							const type = userType.toLowerCase();
							router.push(
								`/success?type=${type}&title=Registration Successful&message=Congratulations! You're now part of our platform.&redirectPath=/home&buttonText=Go to Dashboard` as `/${string}`
							);
						},
					}
				);
			}
		} else {
			if (selectedPlan) {
				checkoutChapaMutation(
					{
						email: memberData.representative_email_address,
						member_id: memberData.id.toString(),
						billing_cycle: billingCycle === "yearly" ? "annual" : "monthly",
						plan_type: selectedPlan.title.toLowerCase().replace(" ", "_"),
						members_count: memberCount,
						amount: totalPrice,
					},
					{
						onSuccess: () => {
							const type = userType.toLowerCase();
							router.push(
								`/success?type=${type}&title=Registration Successful&message=Congratulations! You're now part of our platform.&redirectPath=/home&buttonText=Go to Dashboard` as `/${string}`
							);
						},
					}
				);

				const type = { userType };
				router.push(
					`/success?type=${type}&title=Registration Successful&message=Congratulations! You're now part of our platform.&redirectPath=/home&buttonText=Go to Dashboard` as `/${string}`
				);
			}
		}
		setIsDialogOpen(false);
	};
	return (
		<>
			<div className="container mx-auto pb-12 px-4">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold  ">
						{" "}
						Dear, {fullName} , Choose Your Plan
					</h2>
				</div>
				<div className="flex items-center justify-center mb-8">
					<Label htmlFor="billing-cycle" className="mr-2">
						Monthly
					</Label>
					<Switch
						id="billing-cycle"
						checked={billingCycle === "yearly"}
						onCheckedChange={handleBillingCycleChange}
					/>
					<Label htmlFor="billing-cycle" className="ml-2">
						Yearly
					</Label>
				</div>
				<div className="text-center mt-4 mb-8 flex flex-col">
					<span className="text-sm font-normal text-muted-foreground">
						* If you select the yearly plan, you will get a discount of 10% off
						the total amount.
					</span>
					<span className="text-sm font-normal text-muted-foreground">
						* Please note that the total amount will be calculated based on the
						number of family members you have.
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					{pricingTiers.map((tier, index) => (
						<Card key={index} className="flex flex-col">
							<CardHeader>
								<CardTitle className="text-2xl font-bold">
									{tier.title}
								</CardTitle>
								<CardDescription>
									{currency} {tier.price[billingCycle]}
									<span className="text-sm font-normal text-muted-foreground">
										/{billingCycle === "monthly" ? "mo" : "yr"}
									</span>
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-grow p-4">
								<ul className="space-y-2">
									{tier.features.map((feature, featureIndex) => (
										<li key={featureIndex} className="flex items-center">
											{feature.covered ? (
												<Check className=" text-primary mr-2" size={15} />
											) : (
												<X className=" text-muted-foreground mr-2" size={15} />
											)}
											<span
												className={cn(
													feature.covered ? "" : "text-muted-foreground",
													"text-xs w-[90%]"
												)}
											>
												{feature.name}
											</span>
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter>
								<Button
									className="w-full mt-4"
									onClick={() => handlePlanSelection(tier)}
								>
									Select {tier.title}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>

			<CheckoutDialog
				isOpen={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				selectedPlan={selectedPlan}
				totalPrice={totalPrice}
				familyMembers={memberCount}
				billingCycle={billingCycle}
				name={fullName}
				currency={currency}
				onSubmit={handleSubmit}
			/>
		</>
	);
}
