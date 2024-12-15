"use client";

import { useEffect, useMemo, useState } from "react";

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
	type MemberRepresentativeFormValues,
	createMemberRepresentativeSchema,
} from "@/types/memeber/memberValidation";
import {
	getAllCountries,
	getStatesForCountry,
} from "@/types/provider/ProviderInfoType";

interface MemberRepresentativeInfoFormProps {
	onFormComplete: (data: MemberRepresentativeFormValues) => void;
}

export default function MemberRepresentativeInfoForm({
	onFormComplete,
}: MemberRepresentativeInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("personalInfoForm");
	const memberRepInfoSchema = createMemberRepresentativeSchema(t);
	const DataInfo = useAppSelector((state) => state.member.memberSlice);
	const form = useForm<MemberRepresentativeFormValues>({
		resolver: zodResolver(memberRepInfoSchema),
		defaultValues: {
			representative_first_name: DataInfo.representative_first_name || "",
			representative_last_name: DataInfo.representative_last_name || "",
			representative_middle_name: DataInfo.representative_middle_name || "",
			representative_gender: "male",
			representative_date_of_birth: DataInfo.representative_date_of_birth || "",
			representative_marital_status: "single",
			representative_mailing_address_line1:
				DataInfo.representative_mailing_address_line1 || "",
			representative_country: DataInfo.representative_country || "",
			representative_street_address:
				DataInfo.representative_street_address || "",
			representative_city: DataInfo.representative_city || "",
			representative_region: DataInfo.representative_region || "",
			representative_kifle_ketema: DataInfo.representative_kifle_ketema || "",
			representative_phone_number: DataInfo.representative_phone_number || "",
			representative_email_address: DataInfo.representative_email_address || "",
			relationship_to_member: DataInfo.relationship_to_member || "",
			dependent_of: DataInfo.dependent_of || 0,
		},
	});

	function onSubmit(data: MemberRepresentativeFormValues) {
		onFormComplete(data);
		setVisible(false);
		console.log("data to submit", data);
	}
	const [subStates, setSubStates] = useState<string[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<string>("");
	useEffect(() => {
		const selectedCountry = form.getValues("representative_country");
		if (selectedCountry) {
			setSubStates(getStatesForCountry(selectedCountry) || []);
			form.setValue("representative_region", "");
		}
	}, [selectedCountry, form]);

	const countryOptions = useMemo(() => {
		return getAllCountries();
	}, []);

	const handleCountryValueChange = (value: string) => {
		setSelectedCountry(value);

		form.setValue("representative_country", value);
		form.setValue("representative_region", "");
	};

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
							name="representative_first_name"
							type="text"
							local="personalInfoForm"
							labelKey="fields.representative_first_name.label"
							placeholderKey="fields.representative_first_name.placeholder"
							descriptionKey="fields.representative_first_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="representative_middle_name"
							type="text"
							local="personalInfoForm"
							labelKey="fields.representative_middle_name.label"
							placeholderKey="fields.representative_middle_name.placeholder"
							descriptionKey="fields.representative_middle_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="representative_last_name"
							type="text"
							local="personalInfoForm"
							labelKey="fields.representative_last_name.label"
							placeholderKey="fields.representative_last_name.placeholder"
							descriptionKey="fields.representative_last_name.description"
							required
							isRequired={true}
						/>
						<ReusableSelectField
							control={form.control}
							name="representative_gender"
							labelKey="fields.representative_gender.label"
							local="personalInfoForm"
							placeholderKey="fields.representative_gender.placeholder"
							descriptionKey="fields.representative_gender.description"
							options={[
								{
									label: t("fields.representative_gender.options.male"),
									value: "male",
								},
								{
									label: t("fields.representative_gender.options.female"),
									value: "female",
								},
								{
									label: t(
										"fields.representative_gender.options.not_prefer_to_say"
									),
									value: "not_prefer_to_say",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"representative_gender",
									value as "male" | "female" | "not_prefer_to_say"
								);
							}}
							required
						/>
						<ReusableDatePickerField
							control={form.control}
							name="representative_date_of_birth"
							labelKey="fields.representative_date_of_birth.label"
							placeholderKey="fields.representative_date_of_birth.placeholder"
							descriptionKey="fields.representative_date_of_birth.description"
							required
							buttonClassName="custom-button-class"
							local="personalInfoForm"
						/>
						<ReusableSelectField
							control={form.control}
							name="representative_marital_status"
							labelKey="fields.representative_marital_status.label"
							placeholderKey="fields.representative_marital_status.placeholder"
							descriptionKey="fields.representative_marital_status.description"
							options={[
								{
									label: t(
										"fields.representative_marital_status.options.single"
									),
									value: "single",
								},
								{
									label: t(
										"fields.representative_marital_status.options.married"
									),
									value: "married",
								},
								{
									label: t(
										"fields.representative_marital_status.options.widowed"
									),
									value: "widowed",
								},
								{
									label: t(
										"fields.representative_marital_status.options.divorced"
									),
									value: "divorced",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"representative_marital_status",
									value as "single" | "married" | "widowed" | "divorced"
								);
							}}
							local="personalInfoForm"
							required={true}
						/>
					</div>
				</fieldset>

				<fieldset className="border p-4 rounded-md bg-background mt-6 ">
					<legend className="text-lg font-semibold">{t("relationship")}</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
						<ReusableFormField
							control={form.control}
							name="relationship_to_member"
							type="text"
							local="personalInfoForm"
							labelKey="fields.relationship_to_member.label"
							placeholderKey="fields.relationship_to_member.placeholder"
							descriptionKey="fields.relationship_to_member.description"
						/>
						<ReusableFormField
							control={form.control}
							name="dependent_of"
							type="number"
							local="personalInfoForm"
							labelKey="fields.dependent_of.label"
							placeholderKey="fields.dependent_of.placeholder"
							descriptionKey="fields.dependent_of.description"
						/>
					</div>
				</fieldset>

				<fieldset className="border p-4 rounded-md bg-background mt-6 ">
					<legend className="text-lg font-semibold">
						{t("contact_information")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
						<ReusableFormField
							control={form.control}
							name="representative_phone_number"
							type="text"
							local="personalInfoForm"
							labelKey="fields.representative_phone_number.label"
							placeholderKey="fields.representative_phone_number.placeholder"
							descriptionKey="fields.representative_phone_number.description"
						/>
						<ReusableFormField
							control={form.control}
							name="representative_email_address"
							type="email"
							local="personalInfoForm"
							labelKey="fields.representative_email_address.label"
							placeholderKey="fields.representative_email_address.placeholder"
							descriptionKey="fields.representative_email_address.description"
						/>
					</div>
				</fieldset>
				<fieldset className="border p-4 rounded-md bg-background">
					<legend className="text-lg font-semibold">
						{t("representative_address")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<ReusableSelectField
							control={form.control}
							name="representative_country"
							labelKey="fields.representative_country.label"
							local="personalInfoForm"
							placeholderKey="fields.representative_country.placeholder"
							descriptionKey="fields.representative_country.description"
							options={countryOptions}
							onValueChange={handleCountryValueChange}
							required
						/>
						<ReusableSelectField
							control={form.control}
							name="representative_region"
							labelKey="fields.representative_region.label"
							local="personalInfoForm"
							placeholderKey="fields.representative_region.placeholder"
							descriptionKey="fields.representative_region.description"
							options={subStates}
							onValueChange={(value) =>
								form.setValue("representative_region", value)
							}
							required
						/>

						<ReusableFormField
							control={form.control}
							name="representative_city"
							type="text"
							local="personalInfoForm"
							labelKey="fields.representative_city.label"
							placeholderKey="fields.representative_city.placeholder"
							descriptionKey="fields.representative_city.description"
							required
							isRequired={true}
						/>

						<ReusableFormField
							control={form.control}
							name="representative_kifle_ketema"
							type="text"
							local="personalInfoForm"
							labelKey="fields.representative_kifle_ketema.label"
							placeholderKey="fields.representative_kifle_ketema.placeholder"
							descriptionKey="fields.representative_kifle_ketema.description"
						/>
						<ReusableFormField
							control={form.control}
							name="representative_street_address"
							type="text"
							local="personalInfoForm"
							labelKey="fields.representative_street_address.label"
							placeholderKey="fields.representative_street_address.placeholder"
							descriptionKey="fields.representative_street_address.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="representative_mailing_address_line1"
							type="text"
							local="personalInfoForm"
							labelKey="fields.representative_mailing_address_line1.label"
							placeholderKey="fields.representative_mailing_address_line1.placeholder"
							descriptionKey="fields.representative_mailing_address_line1.description"
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
