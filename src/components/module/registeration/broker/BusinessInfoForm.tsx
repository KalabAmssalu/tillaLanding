"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/storehooks";
import {
	type BusinessInfoFormValues,
	createbusinessInfoSchema,
} from "@/types/broker/BrokerInfoType";

interface BusinessInfoFormProps {
	onFormComplete: (data: BusinessInfoFormValues) => void;
}

export default function BusinessInfoForm({
	onFormComplete,
}: BusinessInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("brokerInfoForm");
	const businessInfoSchema = createbusinessInfoSchema(t);
	const DataInfo = useAppSelector((state) => state.broker.brokerSlice);
	const form = useForm<BusinessInfoFormValues>({
		resolver: zodResolver(businessInfoSchema),
		defaultValues: {
			company_name: DataInfo.company_name || "",
			business_license_number: DataInfo.business_license_number || "",
			tax_identification_number: DataInfo.tax_identification_number || "",
			business_type: "private",
			license_state: DataInfo.license_state || "",
			license_issued_date: DataInfo.license_issued_date || "",
			license_expired_date: DataInfo.license_expired_date || "",
		},
	});

	function onSubmit(data: BusinessInfoFormValues) {
		onFormComplete(data);
		setVisible(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md">
					<legend className="text-lg font-semibold">
						Business Information
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<ReusableFormField
							control={form.control}
							name="company_name"
							type="text"
							local="brokerInfoForm"
							labelKey="fields.company_name.label"
							placeholderKey="fields.company_name.placeholder"
							descriptionKey="fields.company_name.description"
						/>
						<ReusableFormField
							control={form.control}
							name="business_license_number"
							type="text"
							local="brokerInfoForm"
							labelKey="fields.business_license_number.label"
							placeholderKey="fields.business_license_number.placeholder"
							descriptionKey="fields.business_license_number.description"
						/>
						<ReusableFormField
							control={form.control}
							name="tax_identification_number"
							type="text"
							local="brokerInfoForm"
							labelKey="fields.tax_identification_number.label"
							placeholderKey="fields.tax_identification_number.placeholder"
							descriptionKey="fields.tax_identification_number.description"
						/>
						<ReusableDatePickerField
							control={form.control}
							name="license_issued_date"
							labelKey="fields.license_issued_date.label"
							placeholderKey="fields.license_issued_date.placeholder"
							descriptionKey="fields.license_issued_date.description"
							required={true}
							buttonClassName="custom-button-class"
							local="brokerInfoForm"
						/>
						<ReusableFormField
							control={form.control}
							name="license_state"
							type="text"
							local="brokerInfoForm"
							labelKey="fields.license_state.label"
							placeholderKey="fields.license_state.placeholder"
							descriptionKey="fields.license_state.description"
						/>
						<ReusableDatePickerField
							control={form.control}
							name="license_expired_date"
							labelKey="fields.license_expired_date.label"
							placeholderKey="fields.license_expired_date.placeholder"
							descriptionKey="fields.license_expired_date.description"
							required={true}
							buttonClassName="custom-button-class"
							local="brokerInfoForm"
						/>
						<ReusableSelectField
							control={form.control}
							name="business_type"
							labelKey="fields.business_type.label"
							placeholderKey="fields.business_type.placeholder"
							descriptionKey="fields.business_type.description"
							options={[
								{
									label: t("fields.business_type.options.private"),
									value: "private",
								},
								{
									label: t("fields.business_type.options.group"),
									value: "group",
								},
								{
									label: t("fields.business_type.options.sector"),
									value: "sector",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"business_type",
									value as "private" | "group" | "sector"
								);
							}}
							local="brokerInfoForm"
							required={true}
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
