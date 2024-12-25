"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CheckCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAddFamily } from "@/actions/Query/member_Query/family_Query";
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
import { setFamily } from "@/lib/store/redux/familySlice";
import { SetmemberSlice } from "@/lib/store/redux/memberSlice";
import { type FamilyInfoType, type memeberType } from "@/types/memeber/memeber";

import EmailVerification from "../email/EmailVerification";
import FamilyMember from "./FamilyMember";
import MemberAddressForm from "./MemberAddressForm";
import MemberPersonalInfoForm from "./MemberPersonalInfoForm";
import MemberRepresentativeInfoForm from "./MemberRepresentativeInfoForm";
import Preview from "./preview";

interface memberInfoType {
	type?: string;
	self?: string;
}

export default function MemberRegForm({ info }: { info: memberInfoType }) {
	const [nextActive, setNextActive] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const { mutate: MemberMutation } = useAddmemeber();
	const { mutate: FamilyMutation } = useAddFamily();
	const data = useAppSelector((state) => state.member.memberSlice);
	const familyData = useAppSelector((state) => state.family.familyMembers);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const printRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
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

	const [formData, setFormData] = useState<Partial<memeberType>>({
		date_of_birth: "",
		first_name: "",
		last_name: "",
		middle_name: "",
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
	const [familyMembers, setFamilymember] = useState<FamilyInfoType[]>([]);

	useEffect(() => {
		const processFamilyData = (
			familyMembers: FamilyInfoType[],
			info: memberInfoType
		) => {
			return familyMembers.map((member) => ({
				...member,
				member_type: "individual",
				insurance_type: "general",
				member_organization_type: "self",
				benefit_plan: "basic",
				member_status: "active",
				is_representative: info.self === "true" ? false : true || false,

				representative_first_name: formData.representative_first_name || "",
				representative_last_name: formData.representative_last_name || "",
				representative_middle_name: formData.representative_middle_name || "",
				representative_gender: formData.representative_gender || "",
				representative_date_of_birth:
					formData.representative_date_of_birth || "",
				representative_marital_status:
					formData.representative_marital_status || "",
				representative_mailing_address_line1:
					formData.representative_mailing_address_line1 || "",
				representative_country: formData.representative_country || "",
				representative_street_address:
					formData.representative_street_address || "",
				representative_city: formData.representative_city || "",
				representative_region: formData.representative_region || "",
				representative_kifle_ketema: formData.representative_kifle_ketema || "",
				representative_zip_code: formData.representative_zip_code || "",
				representative_phone_number: formData.representative_phone_number || "",
				representative_email_address:
					formData.representative_email_address || "",
			}));
		};

		const updateFamilyData = async () => {
			try {
				if (familyMembers.length > 0) {
					const updatedfamilies = await processFamilyData(familyMembers, info);
					dispatch(setFamily(updatedfamilies));
					console.log("Set a new family information:", updatedfamilies);
				}
			} catch (error) {
				console.error("Error processing family data:", error);
			}
		};

		updateFamilyData();
	}, [familyMembers, info, dispatch]);

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
			pdf.save("member Information.pdf");
		}
	};
	const handleConfirm = () => {
		setIsOpen(true);
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			if (!data) {
				toast.error("No Member data found. Please check your input.");
				return;
			}
			if (info.type === "family") {
				const submittedData = familyData.map(({ id, ...rest }) => ({
					...rest,
					max_out_of_pocket: 0,
					max_out_of_pocket_etb: 0,
					total_medical_expense: 0,
					deductible: 0,
					member_payment_duty: 0,
					has_transport_subscription: false,
				}));

				console.log("submittedData", submittedData); // Ensure it's a flat array
				FamilyMutation(submittedData, {
					onSuccess: () => {
						// Navigate to the success page with query parameters
						// const type = "family"; // Replace with the actual type source
						// router.push(
						// 	`/success?type=${type}&title=Registration Successful&message=Congratulations! You're now part of our platform.&redirectPath=/home&buttonText=Go to Dashboard` as `/${string}`
						// );
						const type = "family"; // Replace with the actual type source

						router.push(`/pricing/${type}` as `/${string}`);

						handleDownloadPDF();
					},
					onError: () => {
						toast.error("Failed to submit Member data. Please try again.");
					},
					onSettled: () => {
						setIsSubmitting(false);
					},
				});
			} else {
				MemberMutation(data, {
					onSuccess: () => {
						// Navigate to the success page with query parameters
						const type = info.type?.toLowerCase(); // Replace with the actual type source
						// router.push(
						// 	`/success?type=${type}&title=Registration Successful&message=Congratulations! You're now part of our platform.&redirectPath=/home&buttonText=Go to Dashboard` as `/${string}`
						// );
						router.push(`/pricing/${type}` as `/${string}`);

						handleDownloadPDF();
					},
					onError: () => {
						toast.error("Failed to submit Member data. Please try again.");
					},
					onSettled: () => {
						setIsSubmitting(false);
					},
				});
			}
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
								onFormComplete={(data: FamilyInfoType[]) => {
									setFamilymember(data);
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
								type={info.type ? info.type.toLowerCase() : "individual"}
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
		// ...(info.self
		// 	? [
		// 			{
		// 				title: "Health and Lifestyle Questionnaire",
		// 				content: (
		// 					<HealthQuestionnaire
		// 						onFormComplete={(data) => {
		// 							// updateFormData(data);
		// 							nextStep();
		// 						}}
		// 					/>
		// 				),
		// 			},
		// 		]
		// 	: []),
		{
			title: "Preview",
			content: (
				<Preview
					isSelf={info.self === "true" ? true : false}
					isFamily={info.type === "family" ? true : false}
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
			<EmailVerification
				isOpen={isVerificationOpen}
				onVerificationComplete={handleVerificationComplete}
			/>
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
