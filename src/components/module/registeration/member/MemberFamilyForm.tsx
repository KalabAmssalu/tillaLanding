"use client";

import { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusablePhoneInputField from "@/components/shared/Form/ReusablePhoneInput";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getAllRelationships } from "@/constants/data/familyData";
import { useAppSelector } from "@/hooks/storehooks";
import {
	type FamilyInfoFormValues,
	createFamilyInfoSchema,
} from "@/types/memeber/memberValidation";

interface FamilyMemberInfoFormProps {
	onFormComplete: (data: FamilyInfoFormValues) => void;
}

export default function FamilyMemberInfoForm({
	onFormComplete,
}: FamilyMemberInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("familyInfoForm");
	const familyInfoSchema = createFamilyInfoSchema(t);
	const DataInfo = useAppSelector((state) => state.member.memberSlice);

	const form = useForm<FamilyInfoFormValues>({
		resolver: zodResolver(familyInfoSchema),
		defaultValues: {
			first_name: DataInfo.first_name || "",
			middle_name: DataInfo.middle_name || "",
			last_name: DataInfo.last_name || "",
			gender: "male",
			date_of_birth: DataInfo.date_of_birth || "",
			phone_number: DataInfo.phone_number || "",
			email_address: DataInfo.email_address || "",
			relationship_to_member: DataInfo.relationship_to_member || "",
			dependent_of: DataInfo.dependent_of || 0,
		},
	});

	const [selectedRelationship, setSelectedRelationship] = useState<string>("");
	useEffect(() => {
		const selectedValue = form.getValues("relationship_to_member");
		if (selectedValue && selectedValue !== selectedRelationship) {
			setSelectedRelationship(selectedValue);
			setOtherRelationship(selectedValue === "other");
		}
	}, [form]);

	const relationshipOptions = useMemo(() => {
		return getAllRelationships();
	}, []);

	const [otherRelationship, setOtherRelationship] = useState(false);

	const handleRelationshipChange = (value: string) => {
		setSelectedRelationship(value);

		if (value === "other") {
			setOtherRelationship(true);
		} else {
			setOtherRelationship(false);
			// Clear custom input field value and ensure the selected relationship is set
			form.setValue("relationship_to_member_other", "");
			form.setValue("relationship_to_member", value);
		}
	};
	const handleCustomInputChange = (value: string | number) => {
		form.setValue("relationship_to_member_other", String(value));
	};

	function onSubmit(data: FamilyInfoFormValues) {
		if (
			data.relationship_to_member === "other" &&
			data.relationship_to_member_other
		) {
			data.relationship_to_member = data.relationship_to_member_other;
		}
		// Remove the custom input field value from the form data
		delete data.relationship_to_member_other;
		console.log("data to submit", data);
		onFormComplete(data);

		setVisible(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background ">
					<legend className="text-lg font-semibold">{t("relationship")}</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
						<ReusableSelectField
							control={form.control}
							name="relationship_to_member"
							labelKey="fields.relationship_to_member.label"
							local="familyInfoForm"
							placeholderKey="fields.relationship_to_member.placeholder"
							descriptionKey="fields.relationship_to_member.description"
							options={relationshipOptions}
							onValueChange={handleRelationshipChange}
							required
						/>

						{otherRelationship && (
							<ReusableFormField
								name="relationship_to_member_other"
								type="text"
								local="familyInfoForm"
								labelKey="fields.relationship_to_member_other.label"
								placeholderKey="fields.relationship_to_member_other.placeholder"
								descriptionKey="fields.relationship_to_member_other.description"
								control={form.control}
								onChange={handleCustomInputChange}
								required
							/>
						)}
					</div>
				</fieldset>
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
						/>
					</div>
				</fieldset>
				<div className="flex w-full justify-center items-center">
					<Button className="flex gap-2">
						Add This Member <CirclePlus size={20} />
					</Button>
				</div>
				{/* {visible && (
					<div className="flex w-full justify-end items-end">
						<Button type="submit" className="bg-green-500 flex items">
							Save and Continue
						</Button>
					</div>
				)} */}
			</form>
		</Form>
	);
}
