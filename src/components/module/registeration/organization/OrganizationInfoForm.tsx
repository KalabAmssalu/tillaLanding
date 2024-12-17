"use client";

import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusablePhoneInputField from "@/components/shared/Form/ReusablePhoneInput";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/storehooks";
import {
	type OrganizationInfoFormValues,
	createorganizationInfoSchema,
} from "@/types/organization/organizationValidation";
import { getAllCountries } from "@/types/provider/ProviderInfoType";

interface OrganizationInfoFormProps {
	type: string;
	onFormComplete: (data: OrganizationInfoFormValues) => void;
}

export default function OrganizationInfoForm({
	type,
	onFormComplete,
}: OrganizationInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("OrganizationInfoForm");
	const organizationInfoSchema = createorganizationInfoSchema(t);
	const DataInfo = useAppSelector(
		(state) => state.organization.organizationSlice
	);

	const form = useForm<OrganizationInfoFormValues>({
		resolver: zodResolver(organizationInfoSchema),
		defaultValues: {
			name: DataInfo.name || "",
			registration_number: DataInfo.registration_number || "",
			industry_type: DataInfo.industry_type || "",
			number_of_employees: DataInfo.number_of_employees || "",
			company_website: DataInfo.company_website || "",
			// plan_coverage_type: DataInfo.plan_coverage_type || "",
			preferred_start_date: DataInfo.preferred_start_date || "",
			// preferred_end_date: DataInfo.preferred_end_date || "",
			phone_number: DataInfo.phone_number || "",
			email_address: DataInfo.email_address || "",
			country_of_origin: DataInfo.country_of_origin || "",
		},
	});

	function onSubmit(data: OrganizationInfoFormValues) {
		onFormComplete(data);
		console.log("submitted data 1", data);
		setVisible(false);
	}

	const countryOptions = useMemo(() => {
		return getAllCountries();
	}, []);

	const handleCountryValueChange = (value: string) => {
		form.setValue("country_of_origin", value);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background ">
					<legend className="text-lg font-semibold">
						{t("organization_information")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<ReusableFormField
							control={form.control}
							name="name"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.name.label"
							placeholderKey="fields.name.placeholder"
							descriptionKey="fields.name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="registration_number"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.registration_number.label"
							placeholderKey="fields.registration_number.placeholder"
							descriptionKey="fields.registration_number.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="industry_type"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.industry_type.label"
							placeholderKey="fields.industry_type.placeholder"
							descriptionKey="fields.industry_type.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="company_website"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.company_website.label"
							placeholderKey="fields.company_website.placeholder"
							descriptionKey="fields.company_website.description"
							required
							isRequired={true}
						/>

						<ReusableSelectField
							control={form.control}
							name="number_of_employees"
							labelKey="fields.number_of_employees.label"
							local="OrganizationInfoForm"
							placeholderKey="fields.number_of_employees.placeholder"
							descriptionKey="fields.number_of_employees.description"
							options={[
								{
									label: t("fields.number_of_employees.options.0_to_10"),
									value: "0_to_10",
								},
								{
									label: t("fields.number_of_employees.options.10_to_50"),
									value: "10_to_50",
								},
								{
									label: t("fields.number_of_employees.options.50_to_100"),
									value: "50_to_100",
								},
								{
									label: t("fields.number_of_employees.options.over_100"),
									value: "over_100",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"number_of_employees",
									value as "0_to_10" | "10_to_50" | "50_to_100" | "over_100"
								);
							}}
							required
						/>

						<ReusableDatePickerField
							control={form.control}
							name="preferred_start_date"
							labelKey="fields.preferred_start_date.label"
							placeholderKey="fields.preferred_start_date.placeholder"
							descriptionKey="fields.preferred_start_date.description"
							required
							buttonClassName="custom-button-class"
							local="OrganizationInfoForm"
						/>
						{type === "ngo" && (
							<ReusableSelectField
								control={form.control}
								name="country_of_origin"
								labelKey="fields.country_of_origin.label"
								local="OrganizationInfoForm"
								placeholderKey="fields.country_of_origin.placeholder"
								descriptionKey="fields.country_of_origin.description"
								options={countryOptions}
								onValueChange={handleCountryValueChange}
								required
							/>
						)}
					</div>
				</fieldset>

				<fieldset className="border p-4 rounded-md bg-background mt-6 ">
					<legend className="text-lg font-semibold">
						{t("contact_information")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
						<ReusablePhoneInputField
							control={form.control}
							name="phone_number"
							labelKey="fields.phone_number.label"
							placeholderKey="fields.phone_number.placeholder"
							descriptionKey="fields.phone_number.description"
							local="OrganizationInfoForm"
						/>
						<ReusableFormField
							control={form.control}
							name="email_address"
							type="email"
							local="OrganizationInfoForm"
							labelKey="fields.email_address.label"
							placeholderKey="fields.email_address.placeholder"
							descriptionKey="fields.email_address.description"
						/>
					</div>
				</fieldset>

				{visible && (
					<div className="flex w-full justify-end items-end">
						<Button type="submit" className="bg-green-500 flex items">
							Save and Continue
						</Button>
					</div>
				)}
			</form>
		</Form>
	);
}
