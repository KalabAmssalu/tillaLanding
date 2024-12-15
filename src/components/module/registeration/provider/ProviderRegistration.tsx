"use client";

import { useState } from "react";

import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	API_POST,
	type FormData,
	fieldDefinitions,
	specialtyMapping,
	steps,
} from "@/constants/data/ProviderData";
import { flattenFormData } from "@/lib/utils/flattenFormData";

import RegistrationSuccess from "../RegistrationSuccess";

const ProviderRegistration = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		identificationAndPersonalDetails: {},
		addressAndContactDetails: {},
		professionalAndGroupDetails: {},
	});
	const [selectedPrimarySpecialty, setSelectedPrimarySpecialty] = useState("");
	const [subSpecialtyOptions, setSubSpecialtyOptions] = useState<string[]>([]);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [showPricing, setShowPricing] = useState(false);

	const fetchApiData = async () => {
		try {
			const flattenedData = flattenFormData(formData);

			// Handle hidden fields based on the provider type
			const providerType =
				formData.identificationAndPersonalDetails.provider_type_selection;
			if (providerType === "Professional") {
				flattenedData.institute_name = null;
				flattenedData.provider_contact_person = null;
			} else if (providerType === "Institute") {
				flattenedData.provider_first_name = null;
				flattenedData.provider_last_name = null;
				flattenedData.provider_middle_initial = null;
				flattenedData.provider_title = null;
			}

			const requestData = {
				...flattenedData,
				role: "PROVIDER",
			};

			const response = await axios.post(API_POST, requestData, {
				headers: { "Content-Type": "application/json" },
			});

			localStorage.setItem("apiResponseData", JSON.stringify(response.data));
			setShowPricing(true);
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const handlePrimarySpecialtyChange = (value: string) => {
		setSelectedPrimarySpecialty(value);
		const newSubSpecialtyOptions = specialtyMapping[value] || [];
		setSubSpecialtyOptions(newSubSpecialtyOptions);
		setFormData((prevData) => ({
			...prevData,
			professionalAndGroupDetails: {
				...prevData.professionalAndGroupDetails,
				provider_primary_specialty: value,
				provider_sub_specialty: "",
			},
		}));
	};

	const handleChange = (
		name: string,
		value: string,
		stepKey: keyof FormData
	) => {
		setFormData((prevData) => ({
			...prevData,
			[stepKey]: {
				...prevData[stepKey],
				[name]: value,
			},
		}));
	};

	const handleNext = () => {
		setActiveStep((prevStep) => prevStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevStep) => prevStep - 1);
	};

	const handleSubmit = () => {
		fetchApiData();
	};

	const getStepFields = () => {
		const stepKeys = Object.keys(
			fieldDefinitions
		) as (keyof typeof fieldDefinitions)[];
		return fieldDefinitions[stepKeys[activeStep]] || [];
	};

	const getStepDataKey = () => {
		const stepKeys = Object.keys(
			fieldDefinitions
		) as (keyof typeof fieldDefinitions)[];
		return stepKeys[activeStep];
	};

	const [selectedProviderType, setSelectedProviderType] = useState("");
	const handleProviderTypeChange = (value: string) => {
		setSelectedProviderType(value);
		setFormData((prevData) => ({
			...prevData,
			identificationAndPersonalDetails: {
				...prevData.identificationAndPersonalDetails,
				provider_type_selection: value,
			},
		}));
	};

	const renderField = (field: any) => {
		const stepKey = getStepDataKey();
		const providerType =
			formData.identificationAndPersonalDetails.provider_type_selection;

		const isFieldHidden =
			(providerType === "Professional" &&
				(field.name === "institute_name" ||
					field.name === "provider_contact_person")) ||
			(providerType === "Institute" &&
				(field.name === "provider_first_name" ||
					field.name === "provider_last_name" ||
					field.name === "provider_middle_initial" ||
					field.name === "provider_title"));

		// If hidden, return null
		if (isFieldHidden) {
			return null;
		}
		if (field.type === "select") {
			if (field.name === "provider_primary_specialty") {
				return (
					<Select
						key={field.name}
						onValueChange={(value) => {
							handleChange(field.name, value, stepKey);
							handlePrimarySpecialtyChange(value);
						}}
						value={formData[stepKey][field.name] || ""}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder={field.label} />
						</SelectTrigger>
						<SelectContent>
							{field.options.map((option: string) => (
								<SelectItem key={option} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			} else if (field.name === "provider_sub_specialty") {
				return (
					<Select
						key={field.name}
						onValueChange={(value) => handleChange(field.name, value, stepKey)}
						value={formData[stepKey][field.name] || ""}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder={field.label} />
						</SelectTrigger>
						<SelectContent>
							{subSpecialtyOptions.map((option: string) => (
								<SelectItem key={option} value={option}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			}
			return (
				<Select
					key={field.name}
					onValueChange={(value) => handleChange(field.name, value, stepKey)}
					value={formData[stepKey][field.name] || ""}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder={field.label} />
					</SelectTrigger>
					<SelectContent>
						{field.options.map((option: string) => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			);
		}

		return (
			<Input
				key={field.name}
				type={field.type}
				placeholder={field.label}
				value={formData[stepKey][field.name] || ""}
				onChange={(e) => handleChange(field.name, e.target.value, stepKey)}
				className="w-full"
			/>
		);
	};

	return (
		<div className={`${showPricing ? "" : "mt-10"}`}>
			{showPricing ? (
				<RegistrationSuccess />
			) : (
				<Card className="w-full mx-auto">
					<CardContent className="p-6">
						<div className="mb-6">
							<div className="flex justify-between mb-2">
								{steps.map((label, index) => (
									<div
										key={label}
										className={`text-sm font-medium ${
											index <= activeStep
												? "text-primary"
												: "text-muted-foreground"
										}`}
									>
										{label}
									</div>
								))}
							</div>
							<div className="w-full bg-secondary h-2 rounded-full">
								<div
									className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
									style={{
										width: `${((activeStep + 1) / steps.length) * 100}%`,
									}}
								/>
							</div>
						</div>

						{/* {activeStep < steps.length - 1 && (
							<div className="grid grid-cols-2 gap-4">
								{getStepFields().map((field) => (
									<div key={field.name} className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-1">
											{field.required ? `${field.label} *` : field.label}
										</label>
										{renderField(field)}
										{errors[field.name] && (
											<p className="mt-1 text-xs text-red-500">
												{errors[field.name]}
											</p>
										)}
									</div>
								))}
							</div>
						)} */}
						{activeStep < steps.length - 1 && (
							<div className="grid grid-cols-2 gap-4">
								{getStepFields().map((field) => {
									// Check if the field is visible
									const stepKey = getStepDataKey();
									const providerType =
										formData.identificationAndPersonalDetails
											.provider_type_selection;

									const isFieldHidden =
										(providerType === "Professional" &&
											(field.name === "institute_name" ||
												field.name === "provider_contact_person")) ||
										(providerType === "Institute" &&
											(field.name === "provider_first_name" ||
												field.name === "provider_last_name" ||
												field.name === "provider_middle_initial" ||
												field.name === "provider_title"));

									if (isFieldHidden) {
										return null; // Skip rendering both the label and the field
									}

									return (
										<div key={field.name} className="mb-4">
											<label className="block text-sm font-medium mb-1">
												{field.required ? `${field.label} *` : field.label}
											</label>
											{renderField(field)}
											{errors[field.name] && (
												<p className="mt-1 text-xs text-red-500">
													{errors[field.name]}
												</p>
											)}
										</div>
									);
								})}
							</div>
						)}

						{activeStep === steps.length - 1 && (
							<div className="mt-6">
								<h3 className="text-lg font-semibold mb-4">
									Review Your Information
								</h3>
								<pre className="bg-muted p-4 rounded-md overflow-x-auto">
									{JSON.stringify(formData, null, 2)}
								</pre>
							</div>
						)}

						<div className="flex justify-between mt-6">
							<Button
								variant="outline"
								onClick={handleBack}
								disabled={activeStep === 0}
							>
								Back
							</Button>
							<Button
								onClick={
									activeStep === steps.length - 1 ? handleSubmit : handleNext
								}
							>
								{activeStep === steps.length - 1 ? "Submit" : "Next"}
							</Button>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default ProviderRegistration;
