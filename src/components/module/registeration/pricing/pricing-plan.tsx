"use client";

import { useState } from "react";

import axios from "axios";
import { Check, Minus, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { pricingTiers } from "@/constants/data/PricingPlanData";
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks";
import { ClearmemberSlice } from "@/lib/store/redux/memberSlice";
import { type PricingTier } from "@/types/pricing/PricingType";

export default function PricingPlans() {
	const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
		"monthly"
	);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);
	const [selectedPlanData, setSelectedPlanData] = useState<
		Record<string, { members: Record<string, number>; totalPrice: number }>
	>({});
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const API_CHECKOUT = "https://api.tillahealthinsurance.com/payments/checkout";
	const dispatch = useAppDispatch();
	const memeberData = useAppSelector((state) => state.member.memberSlice);
	const handleBillingCycleChange = (checked: boolean) => {
		setBillingCycle(checked ? "yearly" : "monthly");
	};

	const handlePlanSelection = (plan: PricingTier) => {
		setSelectedPlan(plan);
		setIsDialogOpen(true);
		if (!selectedPlanData[plan.title]) {
			setSelectedPlanData((prev) => ({
				...prev,
				[plan.title]: {
					members: { spouse: 0, child: 0, elderly: 0, self: 1 },
					totalPrice: plan.price[billingCycle],
				},
			}));
		}
	};

	const handleMemberCountChange = (
		planTitle: string,
		type: string,
		operation: "increment" | "decrement"
	) => {
		setSelectedPlanData((prev) => {
			const updatedMembers = {
				...prev[planTitle].members,
				[type]:
					operation === "increment"
						? prev[planTitle].members[type] + 1
						: Math.max(prev[planTitle].members[type] - 1, 0),
			};

			const memberCount = Object.values(updatedMembers).reduce(
				(a, b) => a + b,
				0
			);
			const plan = pricingTiers.find(
				(p) => p.title === planTitle
			) as PricingTier;
			if (!plan) return prev;

			const pricePerMember = plan.price[billingCycle];
			const totalPriceGrand = memberCount * pricePerMember;
			const deductiblePrice = (memberCount - 1) * 10;
			const totalDiscountPrice =
				memberCount > 1 ? totalPriceGrand - deductiblePrice : totalPriceGrand;

			return {
				...prev,
				[planTitle]: {
					members: updatedMembers,
					totalPrice: totalDiscountPrice,
				},
			};
		});
	};

	const handleSubmit = () => {
		setIsDialogOpen(false);
		if (selectedPlan) {
			const combinedMembersCount = Object.values(selectedPlanData).reduce(
				(acc, planData) => {
					Object.entries(planData.members).forEach(([memberType, count]) => {
						acc[memberType] = (acc[memberType] || 0) + count;
					});
					return acc;
				},
				{} as Record<string, number>
			);

			axios
				.post(API_CHECKOUT, {
					member_id: memeberData.id,
					// member_id: "ec-48e3-87f6-01db07a11408",
					billing_cycle: billingCycle,
					plan_type: selectedPlan.title.toLowerCase().replace(" ", "_"),
					members_count: combinedMembersCount,
				})
				.then((response) => {
					const paymentLink = response.data.payment_link;

					if (paymentLink) {
						window.open(paymentLink, "_blank"); // Open payment link in a new tab
						setPaymentSuccess(true);
					}
				})
				.catch((error) => {
					console.error("Error during checkout request:", error);
					// Handle error (e.g., show error message to user)
				});
		}
		dispatch(ClearmemberSlice());
	};

	if (paymentSuccess) {
		return (
			<div className="container mx-auto py-12 px-4 text-center">
				<h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
				<p>Thank you for your purchase. Your plan is now active.</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-12 px-4">
			<h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
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
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{pricingTiers.map((tier, index) => (
					<Card key={index} className="flex flex-col">
						<CardHeader>
							<CardTitle className="text-2xl font-bold">{tier.title}</CardTitle>
							<CardDescription>
								${tier.price[billingCycle]}
								<span className="text-sm font-normal text-muted-foreground">
									/{billingCycle === "monthly" ? "mo" : "yr"}
								</span>
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-grow">
							<ul className="space-y-2">
								{tier.features.map((feature, featureIndex) => (
									<li key={featureIndex} className="flex items-center">
										{feature.covered ? (
											<Check className="h-5 w-5 text-primary mr-2" />
										) : (
											<X className="h-5 w-5 text-muted-foreground mr-2" />
										)}
										<span
											className={feature.covered ? "" : "text-muted-foreground"}
										>
											{feature.name}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter>
							<Button
								className="w-full"
								onClick={() => handlePlanSelection(tier)}
							>
								Select {tier.title}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Select Members for {selectedPlan?.title}</DialogTitle>
						<DialogDescription>
							Choose the number of members for each category.
						</DialogDescription>
					</DialogHeader>
					{selectedPlan && (
						<div className="mt-4 space-y-4">
							{["spouse", "child", "elderly", "self"].map((type) => (
								<div key={type} className="flex items-center justify-between">
									<span className="capitalize">{type}</span>
									<div className="flex items-center space-x-2">
										<Button
											variant="outline"
											size="icon"
											onClick={() =>
												handleMemberCountChange(
													selectedPlan.title,
													type,
													"decrement"
												)
											}
										>
											<Minus className="h-4 w-4" />
										</Button>
										<span>
											{selectedPlanData[selectedPlan.title]?.members[type] || 0}
										</span>
										<Button
											variant="outline"
											size="icon"
											onClick={() =>
												handleMemberCountChange(
													selectedPlan.title,
													type,
													"increment"
												)
											}
										>
											<Plus className="h-4 w-4" />
										</Button>
									</div>
								</div>
							))}
						</div>
					)}
					<DialogFooter>
						<div className="flex justify-between items-center w-full">
							<span className="text-lg font-semibold">
								Total Price: $
								{selectedPlan
									? selectedPlanData[selectedPlan.title]?.totalPrice.toFixed(2)
									: 0}
							</span>
							<Button onClick={handleSubmit}>Confirm Selection</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
