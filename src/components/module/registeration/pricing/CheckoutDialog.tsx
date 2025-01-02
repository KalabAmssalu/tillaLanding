"use client";

import { Calendar, CheckCircle, CreditCard, Users, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { type PricingTier } from "@/types/pricing/PricingType";

interface CheckoutDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	selectedPlan?: PricingTier | null;
	familyMembers: number;
	billingCycle: string;
	currency: string;
	deductable: "with_deductible" | "non_deductible";
	totalPrice: number;
	name: string;
	onSubmit: (paymentMethod: "stripe" | "chapa") => void;
}

export function CheckoutDialog({
	isOpen,
	onOpenChange,
	selectedPlan,
	familyMembers,
	billingCycle,
	deductable,
	totalPrice,
	name,
	currency,
	onSubmit,
}: CheckoutDialogProps) {
	const planPrice =
		selectedPlan?.[deductable].price[
			billingCycle as keyof typeof selectedPlan.with_deductible.price
		] || 0;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[550px]">
				<DialogHeader>
					<DialogTitle>Checkout: {selectedPlan?.title}</DialogTitle>
					<DialogDescription>
						Review your plan details and complete your purchase.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4">
					<Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
						<CardContent className="pt-6">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Users className="h-5 w-5 text-gray-500" />
										<span className="text-sm font-medium">Family Members</span>
									</div>
									<span className="font-semibold">{familyMembers}</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<CreditCard className="h-5 w-5 text-gray-500" />
										<span className="text-sm font-medium">
											Plan Price (per person)
										</span>
									</div>
									<span className="font-semibold">
										{planPrice.toFixed(2)} {currency}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Calendar className="h-5 w-5 text-gray-500" />
										<span className="text-sm font-medium">Billing Cycle</span>
									</div>
									<span className="font-semibold">{billingCycle}</span>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<CheckCircle className="h-5 w-5 text-gray-500" />
										<span className="text-sm font-medium">
											Payment Checked By
										</span>
									</div>
									<span className="font-semibold">{name}</span>
								</div>
							</div>
						</CardContent>
						<Separator className="my-4" />
						<CardFooter className="justify-between">
							<span className="text-lg font-bold">Total</span>
							<span className="text-lg font-bold text-green-600">
								{currency === "USD" ? "$" : ""}
								{totalPrice.toFixed(2)} {currency}
							</span>
						</CardFooter>
					</Card>
					<div className="space-y-2">
						{currency === "USD" ? (
							<Button
								className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
								onClick={() => onSubmit("stripe")}
							>
								<CreditCard className="mr-2 h-4 w-4" /> Pay with Stripe
							</Button>
						) : (
							<Button
								variant="outline"
								className="w-full border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
								onClick={() => onSubmit("chapa")}
							>
								<Wallet className="mr-2 h-4 w-4" /> Pay with Chapa
							</Button>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
