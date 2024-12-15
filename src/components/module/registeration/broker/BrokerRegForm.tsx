"use client";

import { useState } from "react";

import StepIndicator from "@/components/shared/Stepper/step-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/hooks/storehooks";
import { SetBrokerSlice } from "@/lib/store/redux/brokerSlice";
import { type BrokerType } from "@/types/broker/BrokerType";

import AddressInfoForm from "./AddressInfoForm";
import BusinessInfoForm from "./BusinessInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";
import Preview from "./preview";

export default function BrokerRegForm({ brokerType }: { brokerType: string }) {
	const [currentStep, setCurrentStep] = useState(0);
	const [brokerTypeState, setBrokerTypeState] = useState(brokerType);
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
		first_name_amharic: "",
		gender: "",
		last_name: "",
		last_name_amharic: "",
		middle_initial: "",
		middle_initial_amharic: "",
		phone_number: "",
		tax_identification_number: "",
	});

	const [nextActive, setNextActive] = useState(false);

	const dispatch = useAppDispatch();

	const updateFormData = (newData: Partial<BrokerType>) => {
		const updatedData = { ...formData, ...newData };
		setFormData(updatedData);
		dispatch(SetBrokerSlice(updatedData));
		setNextActive(true);
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
					onFormComplete={() => setNextActive(true)}
					active={nextActive}
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
	);
}
