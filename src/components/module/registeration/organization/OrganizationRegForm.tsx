"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CheckCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAddOrganization } from "@/actions/Query/member_Query/organization_Query";
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
	ClearorganizationSlice,
	SetorganizationSlice,
} from "@/lib/store/redux/organizationSlice";
import { type organizationType } from "@/types/organization/organization";

import OrganizationAddressForm from "./OrganizationAddressForm";
import OrganizationContactPersonForm from "./OrganizationContactPersonForm";
import OrganizationInfoForm from "./OrganizationInfoForm";
import Preview from "./preview";

interface organizationInfoType {
	type?: string;
}

export default function OrganizationRegForm({
	info,
}: {
	info: organizationInfoType;
}) {
	const [nextActive, setNextActive] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const { mutate: OrganizationMutation, isSuccess } = useAddOrganization();
	const data = useAppSelector((state) => state.organization.organizationSlice);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const printRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const [formData, setFormData] = useState<Partial<organizationType>>({
		name: "",
		registration_number: "",
		industry_type: "",
		number_of_employees: "",
		company_website: "",
		// plan_coverage_type: "",
		preferred_start_date: "",
		// preferred_end_date: "",
		sector: info.type?.toLowerCase() || "private",
		country_of_origin: "",
		country: "",
		street_address: "",
		city: "",
		region: "",
		kifle_ketema: "",
		phone_number: "",
		email_address: "",
		contact_person_first_name: "",
		contact_person_middle_name: "",
		contact_person_last_name: "",
		contact_person_position: "",
		contact_person_phone_number: "",
		contact_person_email_address: "",
	});

	const dispatch = useAppDispatch();

	const updateFormData = (newData: Partial<organizationType>) => {
		const updatedData = { ...formData, ...newData };
		setFormData(updatedData);
		dispatch(SetorganizationSlice(updatedData));
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
		setIsSubmitting(true);
		try {
			if (!data) {
				toast.error("No provider data found. Please check your input.");
				return;
			}

			await OrganizationMutation(data);
			if (isSuccess) {
				router.push(
					"/success?type=organization&title=Registration Successful&message=Congratulations! You're now part of our platform.&redirectPath=/home&buttonText=Go to Dashboard" as `/${string}`
				);
				dispatch(ClearorganizationSlice());
				handleDownloadPDF();
			}
		} catch (error) {
			toast.error("Failed to submit provider data. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const steps = [
		// ...(info.type !== "private"
		// 	? [
		// 			{
		// 				title: "Representative Information",
		// 				content: (
		// 					<MemberRepresentativeInfoForm
		// 						onFormComplete={(data) => {
		// 							updateFormData(data);
		// 							nextStep();
		// 						}}
		// 					/>
		// 				),
		// 			},
		// 		]
		// 	: []),
		{
			title:
				info.type?.toLowerCase() === "private"
					? "Private Company Inforamtion"
					: info.type?.toLowerCase() === "ngo"
						? "NGO Inforamtion"
						: "Federal Inforamtion",
			content: (
				<OrganizationInfoForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Organization Address Information",
			content: (
				<OrganizationAddressForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Contact Person Information",
			content: (
				<OrganizationContactPersonForm
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
			<h1 className="text-2xl font-bold mb-6 text-center">
				{info.type === "ngo"
					? "NGO Member Registration Form"
					: info.type === "private"
						? "Private Sector Member Registration Form"
						: "Federal Employee Member Registration Form"}
			</h1>
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
