"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CheckCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAddproviderMutation } from "@/actions/Query/provider_Query/provider_Query";
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
	ClearProviderSlice,
	SetProviderSlice,
} from "@/lib/store/redux/providerSlice";
import { type ProviderType } from "@/types/provider/ProviderType";

import ProviderAddressForm from "./ProviderAddressForm";
import ProviderGroupForm from "./ProviderGroupForm";
import ProviderInfoForm from "./ProviderInfoForm";
import Preview from "./preview";

const ProviderRegForm = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const { mutate: ProviderMutation, isSuccess } = useAddproviderMutation();
	const data = useAppSelector((state) => state.provider.providerSlice);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const printRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const [formData, setFormData] = useState<Partial<ProviderType>>({
		tin_number: "",
		institute_name: "",
		provider_id: "",
		provider_last_name: "",
		provider_first_name: "",
		provider_middle_initial: "",
		provider_last_name_amharic: "",
		provider_first_name_amharic: "",
		provider_middle_initial_amharic: "",
		provider_title: "",
		provider_contact_person: "",
		provider_contact_email: "",
		provider_contact_phone_number: "",
		provider_discount_agreement: 0,
		provider_health_sub_tier: "",
		provider_health_tier: "",
		provider_service_type: "individual",
		provider_gender: "male",
		provider_date_of_birth: "",
		provider_address: "",
		provider_address_line2: "",
		provider_city: "",
		provider_country: "",
		provider_region: "",
		provider_kifle_ketema: "",
		provider_zip_code: "",
		provider_phone_number: "",
		provider_fax: "",
		provider_email: "",
		provider_type: "",
		provider_primary_specialty: "",
		provider_sub_specialty: "",
		provider_group_name: "",
		provider_group_contact_person: "",
		provider_group_phone_number: "",
		provider_group_address: "",
	});

	const [nextActive, setNextActive] = useState(false);

	const dispatch = useAppDispatch();

	const updateFormData = (newData: Partial<ProviderType>) => {
		const updatedData = { ...formData, ...newData };
		setFormData(updatedData);
		dispatch(SetProviderSlice(updatedData));
		setNextActive(true);
	};

	const [isOpen, setIsOpen] = useState(false);

	const handleDownloadPDF = async () => {
		if (printRef.current) {
			const canvas = await html2canvas(printRef.current);
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4");
			const imgProps = pdf.getImageProperties(imgData);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
			pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
			pdf.save("provider_information.pdf");
		}
	};
	const handleConfirm = () => {
		setIsOpen(true);
	};

	const handleSubmit = async () => {
		handleDownloadPDF();
		setIsSubmitting(true);
		try {
			if (!data) {
				toast.error("No provider data found. Please check your input.");
				return;
			}

			await ProviderMutation(data);
			if (isSuccess) {
				// Navigate to the success page with query parameters
				const type = "provider"; // Replace with the actual type source
				router.push(
					`/success?type=${type}&title=Registration Successful&message=Congratulations! You're now part of our platform.&redirectPath=/home&buttonText=Go to Dashboard` as `/${string}`
				);
				dispatch(ClearProviderSlice());
			}
		} catch (error) {
			toast.error("Failed to submit Member data. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const steps = [
		{
			title: "Personal Information",
			content: (
				<ProviderInfoForm
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
				<ProviderAddressForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Group Information",
			content: (
				<ProviderGroupForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Preview",
			content: <Preview onConfirm={handleConfirm} ref={printRef} />,
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
			<Card className="w-full mx-auto">
				<CardHeader>
					<CardTitle>{steps[currentStep].title}</CardTitle>
					<StepIndicator currentStep={currentStep} totalSteps={steps.length} />
				</CardHeader>
				<CardContent className="p-6 relative bg-muted">
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
};

export default ProviderRegForm;
