"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CheckCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAddmemeber } from "@/actions/Query/member_Query/member_Query";
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
	ClearmemberSlice,
	SetmemberSlice,
} from "@/lib/store/redux/memberSlice";
import { type FamilyInfoFormValues } from "@/types/memeber/memberValidation";
import { type memeberType } from "@/types/memeber/memeber";

import FamilyMember from "./FamilyMember";
import MemberAddressForm from "./MemberAddressForm";
import MemberPersonalInfoForm from "./MemberPersonalInfoForm";
import MemberRepresentativeInfoForm from "./MemberRepresentativeInfoForm";
import HealthQuestionnaire from "./memberQuestionnaire";
import Preview from "./preview";

interface memberInfoType {
	type?: string;
	self?: string;
}

export default function MemberRegForm({ info }: { info: memberInfoType }) {
	const [nextActive, setNextActive] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const { mutate: MemberMutation, isSuccess } = useAddmemeber();
	const data = useAppSelector((state) => state.member.memberSlice);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const printRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const [formData, setFormData] = useState<Partial<memeberType>>({
		date_of_birth: "",
		first_name: "",
		last_name: "",
		middle_name: "",
		amharic_first_name: "",
		amharic_last_name: "",
		amharic_middle_name: "",
		gender: "",
		phone_number: "",
		email_address: "",
		marital_status: "",
		height: 0,
		weight: 0,
		tin_number: "",
		insurance_type: "general",
		member_organization_type: "self",
		benefit_plan: "basic",
		member_type: info.type?.toLowerCase() || "individual",
		member_status: "active",
		is_representative: info.self === "true" ? false : true || false,
		street_address: "",
		mailing_address_line1: "",
		country: "",
		city: "",
		region: "",
		kifle_ketema: "",
		representative_first_name: "",
		representative_last_name: "",
		representative_middle_name: "",
		representative_gender: "",
		representative_date_of_birth: "",
		representative_marital_status: "",
		representative_mailing_address_line1: "",
		representative_country: "",
		representative_street_address: "",
		representative_city: "",
		representative_region: "",
		representative_kifle_ketema: "",
		representative_zip_code: "",
		representative_phone_number: "",
		representative_email_address: "",
		// relationship_to_member: "",

		// max_out_of_pocket: 0,
		// max_out_of_pocket_etb: 0,
		// total_medical_expense: 0,
		// deductible: 0,
		// payment_date: "",
		// benefit_begin_date: "",

		// deductible_type: "with_deductible",
		dependent_of: null,
		// member_payment_duty: 0,
		// has_transport_subscription: false,
	});

	const dispatch = useAppDispatch();
	const [familyMembers, setFamilyMembers] = useState<FamilyInfoFormValues[]>(
		[]
	);

	useEffect(() => {
		if (familyMembers.length > 0) {
			const familyMember = familyMembers[0];
			setFormData((prevData) => ({
				...prevData,
				first_name: familyMember.first_name,
				middle_name: familyMember.middle_name,
				last_name: familyMember.last_name,
				gender: familyMember.gender,
				date_of_birth: familyMember.date_of_birth,
				phone_number: familyMember.phone_number,
				email_address: familyMember.email_address,
				relationship_to_member: familyMember.relationship_to_member,
			}));
		}
	}, [familyMembers]);

	const updateFormData = (newData: Partial<memeberType>) => {
		const updatedData = { ...formData, ...newData };
		setFormData(updatedData);
		dispatch(SetmemberSlice(updatedData));
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
			pdf.save("member_information.pdf");
		}
	};
	const handleConfirm = () => {
		setIsOpen(true);
	};

	// const handleSubmit = async () => {
	// 	setIsSubmitting(true);
	// 	try {
	// 		if (!data) {
	// 			toast.error("No Member data found. Please check your input.");
	// 			return;
	// 		}
	// 		const submissionData = {
	// 			...data,
	// 			familyMembers:
	// 				info.type === "family" ? formData.familyMembers : undefined,
	// 		};

	// 		await MemberMutation(submissionData);
	// 		if (isSuccess) {
	// 			// Navigate to the success page with query parameters
	// 			const type = "member"; // Replace with the actual type source
	// 			router.push(
	// 				`/success?type=${type}&title=Registration Successful&message=Congratulations! You're now part of our platform.&redirectPath=/home&buttonText=Go to Dashboard` as `/${string}`
	// 			);
	// 			dispatch(ClearmemberSlice());
	// 			handleDownloadPDF();
	// 		}
	// 	} catch (error) {
	// 		toast.error("Failed to submit Member data. Please try again.");
	// 	} finally {
	// 		setIsSubmitting(false);
	// 	}
	// };

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			if (!data) {
				toast.error("No Member data found. Please check your input.");
				return;
			}
			const submissionData = {
				...data,
				familyMembers:
					info.type === "family" ? formData.familyMembers : undefined,
			};

			MemberMutation(submissionData, {
				onSuccess: () => {
					// Navigate to the success page with query parameters
					const type = "member"; // Replace with the actual type source
					router.push(
						`/success?type=${type}&title=Registration Successful&message=Congratulations! You're now part of our platform.&redirectPath=/home&buttonText=Go to Dashboard` as `/${string}`
					);
					dispatch(ClearmemberSlice());
					handleDownloadPDF();
				},
				onError: () => {
					toast.error("Failed to submit Member data. Please try again.");
				},
				onSettled: () => {
					setIsSubmitting(false);
				},
			});
		} catch (error) {
			toast.error("Something went wrong. Please try again.");
			setIsSubmitting(false);
		}
	};

	const steps = [
		...(info.self !== "true"
			? [
					{
						title:
							info.type === "family"
								? "Primary Member Information"
								: "Representative Information",
						content: (
							<MemberRepresentativeInfoForm
								type={info.type ? info.type.toLowerCase() : "individual"}
								onFormComplete={(data) => {
									updateFormData(data);
									nextStep();
								}}
							/>
						),
					},
				]
			: []),
		...(info.type === "family"
			? [
					{
						title: "Family Member Information",
						content: (
							<FamilyMember
								onFormComplete={(data: FamilyInfoFormValues[]) => {
									setFamilyMembers(data);
									nextStep();
								}}
							/>
						),
					},
				]
			: []),
		...(info.type !== "family"
			? [
					{
						title: "Member Information",
						content: (
							<MemberPersonalInfoForm
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
							<MemberAddressForm
								onFormComplete={(data) => {
									updateFormData(data);
									nextStep();
								}}
							/>
						),
					},
				]
			: []),

		{
			title: "Health and Lifestyle Questionnaire",
			content: (
				<HealthQuestionnaire
					onFormComplete={(data) => {
						// updateFormData(data);
						nextStep();
					}}
				/>
			),
		},

		{
			title: "Preview",
			content: (
				<Preview
					isSelf={info.self === "true" ? true : false}
					onConfirm={handleConfirm}
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
			<h1 className="text-2xl font-bold mb-6 text-center">
				{info.type === "diaspora"
					? "Diaspora Member Registration Form"
					: info.type === "family"
						? "Family Member Registration Form"
						: info.type === "international"
							? "International Member Registration Form"
							: "Individual Member Registration Form"}
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
