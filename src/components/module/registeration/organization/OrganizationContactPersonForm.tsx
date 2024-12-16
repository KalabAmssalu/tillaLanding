"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusablePhoneInputField from "@/components/shared/Form/ReusablePhoneInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/storehooks";
import {
	type OrganizationContactPersonInfoFormValues,
	contactPersonInfoSchema,
} from "@/types/organization/organizationValidation";

interface OrganizationContactPersonFormProps {
	onFormComplete: (data: OrganizationContactPersonInfoFormValues) => void;
}

export default function OrganizationContactPersonForm({
	onFormComplete,
}: OrganizationContactPersonFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("OrganizationInfoForm");
	const contactPersonSchema = contactPersonInfoSchema(t);
	const DataInfo = useAppSelector(
		(state) => state.organization.organizationSlice
	);
	const form = useForm<OrganizationContactPersonInfoFormValues>({
		resolver: zodResolver(contactPersonSchema),
		defaultValues: {
			contact_person_first_name: DataInfo.contact_person_first_name || "",
			contact_person_last_name: DataInfo.contact_person_last_name || "",
			contact_person_middle_name: DataInfo.contact_person_middle_name || "",
			contact_person_position: DataInfo.contact_person_position || "",
			contact_person_phone_number: DataInfo.contact_person_phone_number || "",
			contact_person_email_address: DataInfo.contact_person_email_address || "",
		},
	});

	function onSubmit(data: OrganizationContactPersonInfoFormValues) {
		onFormComplete(data);
		setVisible(false);
		console.log("data to submit", data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background">
					<legend className="text-lg font-semibold">
						{t("representative_info")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-1">
						<ReusableFormField
							control={form.control}
							name="contact_person_first_name"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.contact_person_first_name.label"
							placeholderKey="fields.contact_person_first_name.placeholder"
							descriptionKey="fields.contact_person_first_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="contact_person_middle_name"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.contact_person_middle_name.label"
							placeholderKey="fields.contact_person_middle_name.placeholder"
							descriptionKey="fields.contact_person_middle_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="contact_person_last_name"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.contact_person_last_name.label"
							placeholderKey="fields.contact_person_last_name.placeholder"
							descriptionKey="fields.contact_person_last_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="contact_person_position"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.contact_person_position.label"
							placeholderKey="fields.contact_person_position.placeholder"
							descriptionKey="fields.contact_person_position.description"
						/>
					</div>
				</fieldset>

				<fieldset className="border p-4 rounded-md bg-background mt-6 ">
					<legend className="text-lg font-semibold">
						{t("contact_information")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
						<ReusablePhoneInputField
							control={form.control}
							name="contact_person_phone_number"
							labelKey="fields.contact_person_phone_number.label"
							placeholderKey="fields.contact_person_phone_number.placeholder"
							descriptionKey="fields.contact_person_phone_number.description"
							local="personalInfoForm"
						/>
						<ReusableFormField
							control={form.control}
							name="contact_person_email_address"
							type="email"
							local="OrganizationInfoForm"
							labelKey="fields.contact_person_email_address.label"
							placeholderKey="fields.contact_person_email_address.placeholder"
							descriptionKey="fields.contact_person_email_address.description"
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
