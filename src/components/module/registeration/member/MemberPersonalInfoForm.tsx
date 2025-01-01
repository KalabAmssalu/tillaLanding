"use client";

import { useState } from "react";

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
import { UserPayload } from "@/lib/store/redux/userSlice";
import {
	type MemberInfoFormValues,
	createMemeberInfoSchema,
} from "@/types/memeber/memberValidation";

interface MemberInfoFormProps {
	user: UserPayload;
	type: string;
	self: boolean;
	onFormComplete: (data: MemberInfoFormValues) => void;
}

export default function MemberPersonalInfoForm({
	user,
	type,
	self,
	onFormComplete,
}: MemberInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("personalInfoForm");
	const memberInfoSchema = createMemeberInfoSchema(t);
	const DataInfo = useAppSelector((state) => state.member.memberSlice);

	const form = useForm<MemberInfoFormValues>({
		resolver: zodResolver(memberInfoSchema),
		defaultValues: {
			tin_number: DataInfo.tin_number || "",
			first_name: DataInfo.first_name || "",
			middle_name: DataInfo.middle_name || "",
			last_name: DataInfo.last_name || "",
			gender: "male",
			marital_status: "single",
			date_of_birth: DataInfo.date_of_birth || "",
			phone_number: DataInfo.phone_number || "",
			email_address: self ? "" : user.email || "",
			height: DataInfo.height || 0,
			weight: DataInfo.weight || 0,
		},
	});

	function onSubmit(data: MemberInfoFormValues) {
		onFormComplete(data);
		console.log("submitted data 1", data);
		setVisible(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background ">
					<legend className="text-lg font-semibold">
						{t("personal_information")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<ReusableFormField
							control={form.control}
							name="first_name"
							type="text"
							local="personalInfoForm"
							labelKey="fields.first_name.label"
							placeholderKey="fields.first_name.placeholder"
							descriptionKey="fields.first_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="middle_name"
							type="text"
							local="personalInfoForm"
							labelKey="fields.middle_name.label"
							placeholderKey="fields.middle_name.placeholder"
							descriptionKey="fields.middle_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="last_name"
							type="text"
							local="personalInfoForm"
							labelKey="fields.last_name.label"
							placeholderKey="fields.last_name.placeholder"
							descriptionKey="fields.last_name.description"
							required
							isRequired={true}
						/>
						{/* <ReusableFormField
							control={form.control}
							name="amharic_first_name"
							type="text"
							local="personalInfoForm"
							labelKey="fields.amharic_first_name.label"
							placeholderKey="fields.amharic_first_name.placeholder"
							descriptionKey="fields.amharic_first_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="amharic_middle_name"
							type="text"
							local="personalInfoForm"
							labelKey="fields.amharic_middle_name.label"
							placeholderKey="fields.amharic_middle_name.placeholder"
							descriptionKey="fields.amharic_middle_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="amharic_last_name"
							type="text"
							local="personalInfoForm"
							labelKey="fields.amharic_last_name.label"
							placeholderKey="fields.amharic_last_name.placeholder"
							descriptionKey="fields.amharic_last_name.description"
							required
							isRequired={true}
						/> */}
						<ReusableFormField
							control={form.control}
							name="tin_number"
							type="text"
							local="personalInfoForm"
							labelKey="fields.tin_number.label"
							placeholderKey="fields.tin_number.placeholder"
							descriptionKey="fields.tin_number.description"
							isRequired={type === "diaspora" ? true : false}
							required={type === "diaspora" ? true : false}
						/>
						<ReusableSelectField
							control={form.control}
							name="gender"
							labelKey="fields.gender.label"
							local="personalInfoForm"
							placeholderKey="fields.gender.placeholder"
							descriptionKey="fields.gender.description"
							options={[
								{ label: t("fields.gender.options.male"), value: "male" },
								{ label: t("fields.gender.options.female"), value: "female" },
								{
									label: t("fields.gender.options.not_prefer_to_say"),
									value: "not_prefer_to_say",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"gender",
									value as "male" | "female" | "not_prefer_to_say"
								);
							}}
							required
						/>

						<ReusableDatePickerField
							control={form.control}
							name="date_of_birth"
							labelKey="fields.date_of_birth.label"
							placeholderKey="fields.date_of_birth.placeholder"
							descriptionKey="fields.date_of_birth.description"
							required
							buttonClassName="custom-button-class"
							local="personalInfoForm"
						/>
						<ReusableSelectField
							control={form.control}
							name="marital_status"
							labelKey="fields.marital_status.label"
							placeholderKey="fields.marital_status.placeholder"
							descriptionKey="fields.marital_status.description"
							options={[
								{
									label: t("fields.marital_status.options.single"),
									value: "single",
								},
								{
									label: t("fields.marital_status.options.married"),
									value: "married",
								},
								{
									label: t("fields.marital_status.options.divorced"),
									value: "divorced",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"marital_status",
									value as "single" | "married" | "divorced"
								);
							}}
							local="personalInfoForm"
							required={true}
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
							name="phone_number"
							labelKey="fields.phone_number.label"
							placeholderKey="fields.phone_number.placeholder"
							descriptionKey="fields.phone_number.description"
							local="personalInfoForm"
						/>
						<ReusableFormField
							control={form.control}
							name="email_address"
							type="email"
							local="personalInfoForm"
							labelKey="fields.email_address.label"
							placeholderKey="fields.email_address.placeholder"
							descriptionKey="fields.email_address.description"
							required
							value={user.email}
							disabled={self ? true : false}
						/>
					</div>
				</fieldset>

				<fieldset className="border p-4 rounded-md bg-background mt-6 ">
					<legend className="text-lg font-semibold">
						{t("physical_attributes")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
						<ReusableFormField
							control={form.control}
							name="height"
							type="number"
							local="personalInfoForm"
							labelKey="fields.height.label"
							placeholderKey="fields.height.placeholder"
							descriptionKey="fields.height.description"
						/>
						<ReusableFormField
							control={form.control}
							name="weight"
							type="number"
							local="personalInfoForm"
							labelKey="fields.weight.label"
							placeholderKey="fields.weight.placeholder"
							descriptionKey="fields.weight.description"
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
