"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CheckCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAddbroker } from "@/actions/Query/broker_Query/broker_Query";
import StepIndicator from "@/components/shared/Stepper/step-indicator";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks";
import {
	ClearBrokerSlice,
	SetBrokerSlice,
} from "@/lib/store/redux/brokerSlice";
import { type BrokerType } from "@/types/broker/BrokerType";

import EmailVerification from "../email/EmailVerification";
import AddressInfoForm from "./AddressInfoForm";
import BusinessInfoForm from "./BusinessInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";
import Preview from "./preview";

export default function BrokerRegForm({ brokerType }: { brokerType: string }) {
	const [currentStep, setCurrentStep] = useState(0);
	const [brokerTypeState, setBrokerTypeState] = useState(brokerType);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [nextActive, setNextActive] = useState(false);
	const { mutate: BrokerMutation } = useAddbroker();
	const data = useAppSelector((state) => state.broker.brokerSlice);
	const user = useAppSelector((state) => state.user.userSlice);
	const [isVerificationOpen, setIsVerificationOpen] = useState(false);
	const [isVerified, setIsVerified] = useState(user.verify);

	const handleVerificationComplete = () => {
		setIsVerified(true);
		setIsVerificationOpen(false);
	};

	useEffect(() => {
		if (!isVerified) {
			setIsVerificationOpen(true);
		}
	}, [isVerified]);

	const printRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const [formData, setFormData] = useState<Partial<BrokerType>>({
		business_address_line_1: "",
		business_address_line_2: "",
		business_city: "",
		broker_type: brokerTypeState,
		license_state: "",
		license_issued_date: "",
		license_expired_date: "",
		business_kifle_ketema: "",
		business_license_number: "",
		business_state: "",
		business_type: "",
		business_zip_code: "",
		company_name: "",
		date_of_birth: "",
		email_address: "",
		first_name: "",
		gender: "",
		last_name: "",
		middle_initial: "",
		phone_number: "",
		tax_identification_number: "",
	});

	const dispatch = useAppDispatch();

	const updateFormData = (newData: Partial<BrokerType>) => {
		const updatedData = { ...formData, ...newData };
		setFormData(updatedData);
		dispatch(SetBrokerSlice(updatedData));
		setNextActive(true);
	};
	const [isOpen, setIsOpen] = useState(false);

	const handleConfirm = () => {
		setIsOpen(true);
	};

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
			await BrokerMutation(dataSend, {
				onSuccess: () => {
					router.push(
						`/success?type=${brokerType}&title=Registration Successful&message=Congratulations! You're now part of our tilla Health Broker.&redirectPath=/home&buttonText=Home` as `/${string}`
					);
					dispatch(ClearBrokerSlice());

					// {
					// 	info.type?.toLowerCase() !== "federal" &&
					// 		downloadFile(
					// 			`${window.location.origin}/docs/company.xlsx`,
					// 			"company.xlsx"
					// 		);
					// }
				},
				onError: () => {
					toast.error(
						"Failed to submit Broker registration data. Please try again."
					);
				},
				onSettled: () => {
					setIsSubmitting(false);
				},
			});
		} catch (error) {
			toast.error(
				"Failed to submit Broker registration data. Please try again."
			);
		} finally {
			setIsSubmitting(false);
		}
	};
	const steps = [
		{
			title: "Personal Information",
			content: (
				<PersonalInfoForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Business Information",
			content: (
				<BusinessInfoForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Address Information",
			content: (
				<AddressInfoForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Preview",
			content: (
				<Preview
					onConfirm={handleConfirm}
					isBroker={brokerType === "broker" ? true : false}
					ref={printRef}
				/>
			),
		},
	];

	const nextStep = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
			setNextActive(false);
		}
	};

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<>
			<EmailVerification
				isOpen={isVerificationOpen}
				onVerificationComplete={handleVerificationComplete}
			/>
			<Card className="w-full mx-auto">
				<CardHeader>
					<CardTitle>{steps[currentStep].title}</CardTitle>
					<StepIndicator currentStep={currentStep} totalSteps={steps.length} />
				</CardHeader>
				<CardContent className="p-6 relative">
					{steps[currentStep].content}
					<div className="mt-6 flex justify-between">
						<Button
							onClick={prevStep}
							disabled={currentStep === 0}
							variant="outline"
							className="absolute bottom-[3.05rem]"
						>
							Previous
						</Button>
					</div>
				</CardContent>
			</Card>

			<p className=" text-center mt-20 border-primary py-32 border-t-2">
				The Tilla Health Insurance Registration Form is designed to capture
				essential details from applicants for seamless onboarding. The form
				ensures data accuracy, security, and user-friendliness, accommodating
				individuals, families, or businesses.
			</p>
			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="flex gap-4 items-center">
							<CheckCheck className="h-6 w-6 p-1 bg-green-300 rounded-full" />
							Form Submission
						</AlertDialogTitle>
						<AlertDialogDescription>
							To finish your form submission, please submut the form. and you
							can download the pdf file.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className="bg-green-500"
							disabled={isSubmitting}
							onClick={handleSubmit}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Submitting...
								</>
							) : (
								"Download and Submit"
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
