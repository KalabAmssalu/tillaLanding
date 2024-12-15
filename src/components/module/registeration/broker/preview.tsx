"use client";

import { useState } from "react";

import { Loader2 } from "lucide-react";

import { useAddbroker } from "@/actions/Query/broker_Query/broker_Query";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/hooks/storehooks";

interface PersonalInfoProps {
	onFormComplete: () => void;
	active: boolean; // Define the active prop
}
const Preview = ({ onFormComplete, active }: PersonalInfoProps) => {
	const { mutate: BrokerMutation } = useAddbroker();
	const data = useAppSelector((state) => state.broker.brokerSlice);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			console.log(data);
			const dataSend = {
				...data,
				monthly_premium: 0,
				yearly_premium: 0,
				in_network: true,
			};
			await BrokerMutation(dataSend);
			toast({
				title: "Success",
				description: "Member data submitted successfully!",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to submit member data. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
			onFormComplete();
		}
	};

	return (
		<div className="container mx-auto p-4">
			<Card className="w-full max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle>Broker Form Preview</CardTitle>
					<CardDescription>
						Review your information before submitting
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{Object.entries(data).map(([key, value]) => (
						<div
							key={key}
							className="flex justify-between items-center border-b pb-2"
						>
							<span className="font-medium capitalize">
								{key.replace(/([A-Z])/g, " $1").trim()}:
							</span>
							<span>{value as string}</span>
						</div>
					))}
				</CardContent>
				<CardFooter className="flex justify-end">
					<Button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className="bg-green-500"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Submit this form
							</>
						) : (
							"Submit the form"
						)}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Preview;
