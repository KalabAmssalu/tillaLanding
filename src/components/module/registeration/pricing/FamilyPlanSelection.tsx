"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingTiers } from "@/constants/data/PricingPlanData";
import { useAppSelector } from "@/hooks/storehooks";
import { cn } from "@/lib/utils";
import { type PricingTier } from "@/types/pricing/PricingType";

import { CheckoutDialog } from "./CheckoutDialog";

export default function FamilyPlanSelection({
	userType,
}: {
	userType: string;
}) {
	const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
		"monthly"
	);
	const familyData = useAppSelector((state) => state.family.familyMembers);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);
	const [deductable, setDeductable] = useState<
		"with_deductible" | "non_deductible"
	>("with_deductible");

	const isDiaspora = userType === "diaspora";
	const currency = isDiaspora ? "USD" : "ETB";
	const handleBillingCycleChange = (checked: boolean) => {
		setBillingCycle(checked ? "yearly" : "monthly");
	};

	const handlePlanSelection = (
		plan: PricingTier,
		deductible: "with_deductible" | "non_deductible"
	) => {
		setDeductable(deductible);
		setSelectedPlan(plan);
		setIsDialogOpen(true);
	};

	const familyMembers = familyData.length;
	const fullName = `${familyData[0].representative_first_name} ${
		familyData[0].representative_last_name
	}`;

	const planPrice =
		selectedPlan?.[deductable].price[
			billingCycle as keyof typeof selectedPlan.with_deductible.price
		] || 0;

	const totalPrice = planPrice * familyMembers;

	const { mutate: checkoutStripMutation } = useCheckoutStrip();
	const { mutate: checkoutChapaMutation } = useCheckoutChapa();

	const handleSubmit = (paymentMethod: "stripe" | "chapa") => {
		console.log("paymentMethod", paymentMethod);
		if (paymentMethod === "stripe") {
			if (selectedPlan) {
				checkoutStripMutation({
					email: familyData[0].representative_email_address,
					member_id:
						familyData.length > 0
							? familyData
									.map((member) => member.id)
									.filter((id): id is string => typeof id === "string")
							: [],
					billing_cycle: billingCycle,
					plan_type: selectedPlan.title.toLowerCase().replace(" ", "_"),
					members_count: familyMembers,
					amount: totalPrice,
					deductible_type: deductable,
				});
			}
		} else {
			if (selectedPlan) {
				checkoutChapaMutation({
					email: familyData[0].representative_email_address,
					member_id:
						familyData.length > 0
							? familyData
									.map((member) => member.id)
									.filter((id): id is string => typeof id === "string")
							: [],
					billing_cycle: billingCycle === "yearly" ? "annual" : "monthly",
					plan_type: selectedPlan.title.toLowerCase().replace(" ", "_"),
					members_count: familyMembers,
					amount: totalPrice,
					deductible_type: deductable,
				});
			}
		}
		setIsDialogOpen(false);
	};
	return (
		<>
			<div className="container mx-auto pb-12 px-4">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold  ">Choose Your Plan</h2>
					<p>
						Dear,{" "}
						{familyData.length > 0 &&
							`${familyData[0].representative_first_name} ${familyData[0].representative_last_name}`}
						, Please select your plan.
					</p>
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
						<Card
							key={index}
							className={`flex flex-col ${index === 1 || index === 2 ? "border-primary border-2" : ""}`}
						>
							<CardTitle className="p-2 px-4 text-2xl text-center font-bold">
								{tier.title}
							</CardTitle>
							<Tabs defaultValue="with_deductible">
								<TabsList className="w-full">
									<TabsTrigger value="with_deductible">
										With Deductible
									</TabsTrigger>
									<TabsTrigger value="non_deductible">
										Non-Deductible
									</TabsTrigger>
								</TabsList>
								<TabsContent value="with_deductible">
									<CardHeader className="text-center p-0">
										<CardDescription className="text-2xl">
											{currency} {tier.with_deductible.price[billingCycle]}
											<span className="font-normal text-muted-foreground">
												/{billingCycle === "monthly" ? "mo" : "yr"}
											</span>
										</CardDescription>
									</CardHeader>
									<CardContent className="flex-grow p-4 h-[400px]">
										<div className="flex items-center justify-center">
											<span className="text-sm font-normal text-muted-foreground">
												Co-Insurance -{" "}
											</span>
											<span className="text-sm font-normal text-muted-foreground">
												{tier.with_deductible.coInsurance}%
											</span>
										</div>

										<ul className="space-y-2 mt-4">
											{tier.with_deductible.features.map(
												(feature, featureIndex) => (
													<li key={featureIndex} className="flex items-center">
														{feature.covered ? (
															<Check className="text-primary mr-2" size={15} />
														) : (
															<X
																className="text-muted-foreground mr-2"
																size={15}
															/>
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
												)
											)}
										</ul>
									</CardContent>
									<CardFooter>
										<Button
											className={`w-full mt-4 ${index === 0 || index === 3 ? "bg-secondary text-white" : ""}`}
											onClick={() =>
												handlePlanSelection(tier, "with_deductible")
											}
										>
											Select {tier.title}
										</Button>
									</CardFooter>
								</TabsContent>

								<TabsContent value="non_deductible">
									<CardHeader className="text-center p-0">
										<CardDescription className="text-2xl">
											{currency} {tier.non_deductible.price[billingCycle]}
											<span className="font-normal text-muted-foreground">
												/{billingCycle === "monthly" ? "mo" : "yr"}
											</span>
										</CardDescription>
									</CardHeader>
									<CardContent className="flex-grow p-4 h-[400px]">
										<div className="flex items-center justify-center">
											<span className="text-sm font-normal text-muted-foreground">
												Co-Insurance -{" "}
											</span>
											<span className="text-sm font-normal text-muted-foreground">
												{tier.with_deductible.coInsurance}%
											</span>
										</div>

										<ul className="space-y-2 mt-4">
											{tier.non_deductible.features.map(
												(feature, featureIndex) => (
													<li key={featureIndex} className="flex items-center">
														{feature.covered ? (
															<Check className="text-primary mr-2" size={15} />
														) : (
															<X
																className="text-muted-foreground mr-2"
																size={15}
															/>
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
												)
											)}
										</ul>
									</CardContent>
									<CardFooter>
										<Button
											className={`w-full mt-4 ${index === 0 || index === 3 ? "bg-secondary text-white" : ""}`}
											onClick={() =>
												handlePlanSelection(tier, "non_deductible")
											}
										>
											Select {tier.title}
										</Button>
									</CardFooter>
								</TabsContent>
							</Tabs>
						</Card>
					))}
				</div>
			</div>

			<CheckoutDialog
				isOpen={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				selectedPlan={selectedPlan}
				totalPrice={totalPrice}
				familyMembers={familyMembers}
				billingCycle={billingCycle}
				deductable={deductable}
				name={fullName}
				currency={currency}
				onSubmit={handleSubmit}
			/>
		</>
	);
}
