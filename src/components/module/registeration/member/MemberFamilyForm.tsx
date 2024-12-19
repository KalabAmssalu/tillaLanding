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
import { Switch } from "@/components/ui/switch";
import { getAllRelationships } from "@/constants/data/familyData";
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks";
import {
	type FamilyInfoFormValues,
	createFamilyInfoSchema,
} from "@/types/memeber/memberValidation";
import { type FamilyInfoType } from "@/types/memeber/memeber";
import {
	getAllCountries,
	getStatesForCountry,
} from "@/types/provider/ProviderInfoType";

interface FamilyMemberInfoFormProps {
	user?: FamilyInfoType;
	onFormComplete: (data: FamilyInfoFormValues) => void;
}

export default function FamilyMemberInfoForm({
	user,
	onFormComplete,
}: FamilyMemberInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("familyInfoForm");
	const familyInfoSchema = createFamilyInfoSchema(t);
	const dispatch = useAppDispatch();
	const Representative = useAppSelector((state) => state.member.memberSlice);
	const [DataInfo, setDataInfo] = useState(user);
	const [isRepresentativeAddress, setIsRepresentativeAddress] = useState(false);

	const form = useForm<FamilyInfoFormValues>({
		resolver: zodResolver(familyInfoSchema),
		defaultValues: {
			first_name: (DataInfo && DataInfo.first_name) || "",
			middle_name: (DataInfo && DataInfo.middle_name) || "",
			last_name: (DataInfo && DataInfo.last_name) || "",
			gender:
				DataInfo && DataInfo.gender?.toLowerCase() === "male"
					? "male"
					: DataInfo && DataInfo.gender?.toLowerCase() === "not_prefer_to_say"
						? "not_prefer_to_say"
						: "male",
			marital_status:
				DataInfo && DataInfo.marital_status?.toLowerCase() === "divorced"
					? "divorced"
					: DataInfo && DataInfo.marital_status?.toLowerCase() === "single"
						? "single"
						: "married",
			height: (DataInfo && DataInfo.height) || 0,
			weight: (DataInfo && DataInfo.weight) || 0,
			date_of_birth: (DataInfo && DataInfo.date_of_birth) || "",
			phone_number: (DataInfo && DataInfo.phone_number) || "",
			email_address: (DataInfo && DataInfo.email_address) || "",
			relationship_to_member:
				(DataInfo && DataInfo.relationship_to_member) || "",
			tin_number: (DataInfo && DataInfo.tin_number) || "",
			street_address:
				(DataInfo && DataInfo.street_address) ||
				(isRepresentativeAddress &&
					Representative &&
					Representative.street_address) ||
				"",
			mailing_address_line1:
				(DataInfo && DataInfo.mailing_address_line1) ||
				(isRepresentativeAddress &&
					Representative &&
					Representative.mailing_address_line1) ||
				"",
			country:
				(DataInfo && DataInfo.country) ||
				(isRepresentativeAddress && Representative && Representative.country) ||
				"",
			city:
				(DataInfo && DataInfo.city) ||
				(isRepresentativeAddress && Representative && Representative.city) ||
				"",
			region:
				(DataInfo && DataInfo.region) ||
				(isRepresentativeAddress && Representative && Representative.region) ||
				"",
			kifle_ketema:
				(DataInfo && DataInfo.kifle_ketema) ||
				(isRepresentativeAddress &&
					Representative &&
					Representative.kifle_ketema) ||
				"",
			zip_code:
				(DataInfo && DataInfo.zip_code) ||
				(isRepresentativeAddress &&
					Representative &&
					Representative.zip_code) ||
				"",
		},
	});
	useEffect(() => {
		if (user) {
			form.reset({
				first_name: user.first_name || "",
				middle_name: user.middle_name || "",
				last_name: user.last_name || "",
				gender:
					user && user.gender?.toLowerCase() === "male"
						? "male"
						: user && user.gender?.toLowerCase() === "not_prefer_to_say"
							? "not_prefer_to_say"
							: "male",
				marital_status:
					user && user.marital_status?.toLowerCase() === "divorced"
						? "divorced"
						: user && user.marital_status?.toLowerCase() === "single"
							? "single"
							: "married",
				height: user.height || 0,
				weight: user.weight || 0,
				date_of_birth: user.date_of_birth || "",
				phone_number: user.phone_number || "",
				email_address: user.email_address || "",
				relationship_to_member: user.relationship_to_member || "",

				tin_number: user.tin_number || "",

				street_address: user.street_address || "",
				mailing_address_line1: user.mailing_address_line1 || "",
				country: user.country || "",
				city: user.city || "",
				region: user.region || "",
				kifle_ketema: user.kifle_ketema || "",
				zip_code: user.zip_code || "",
			});
		}
	}, [user, form]);

	useEffect(() => {
		if (Representative && isRepresentativeAddress) {
			form.reset({
				...form.getValues(), // Preserve other form values
				street_address: Representative.representative_street_address || "",
				mailing_address_line1:
					Representative.representative_mailing_address_line1 || "",
				country: Representative.representative_country || "",
				city: Representative.representative_city || "",
				region: Representative.representative_region || "",
				kifle_ketema: Representative.representative_kifle_ketema || "",
				zip_code: Representative.representative_zip_code || "",
			});
		}
	}, [Representative, form, isRepresentativeAddress]);

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
	const [subStates, setSubStates] = useState<string[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<string>("");
	useEffect(() => {
		const selectedCountry = form.getValues("country");
		if (selectedCountry) {
			setSubStates(getStatesForCountry(selectedCountry) || []);
		}
	}, [selectedCountry, form]);

	const countryOptions = useMemo(() => {
		return getAllCountries();
	}, []);

	const handleCountryValueChange = (value: string) => {
		setSelectedCountry(value);

		form.setValue("country", value);
		form.setValue("region", "");
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
		// dispatch(addFamilyMember(data));
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
							required={true}
							buttonClassName="custom-button-class"
							local="personalInfoForm"
						/>
						<ReusableFormField
							control={form.control}
							name="tin_number"
							type="text"
							local="personalInfoForm"
							labelKey="fields.tin_number.label"
							placeholderKey="fields.tin_number.placeholder"
							descriptionKey="fields.tin_number.description"
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
				{/* add a switch to toggle between member and representative */}
				<fieldset className="border p-4 rounded-md bg-background pb-6">
					<legend className="text-lg font-semibold">{t("AddressInfo")}</legend>

					<div className="flex items-center bg-muted p-2 rounded-md space-x-2 mb-4">
						<Switch
							id="use-representative-address"
							checked={isRepresentativeAddress}
							onCheckedChange={(checked) => {
								setIsRepresentativeAddress(checked);
							}}
						/>
						<label
							htmlFor="use-representative-address"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{t("use_representative_address")}
						</label>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<ReusableSelectField
							control={form.control}
							name="country"
							labelKey="fields.country.label"
							local="personalInfoForm"
							placeholderKey="fields.country.placeholder"
							descriptionKey="fields.country.description"
							options={countryOptions}
							onValueChange={handleCountryValueChange}
							required
						/>
						<ReusableFormField
							control={form.control}
							name="street_address"
							type="text"
							local="personalInfoForm"
							labelKey="fields.street_address.label"
							placeholderKey="fields.street_address.placeholder"
							descriptionKey="fields.street_address.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="mailing_address_line1"
							type="text"
							local="personalInfoForm"
							labelKey="fields.mailing_address_line1.label"
							placeholderKey="fields.mailing_address_line1.placeholder"
							descriptionKey="fields.mailing_address_line1.description"
						/>
						<ReusableFormField
							control={form.control}
							name="city"
							type="text"
							local="personalInfoForm"
							labelKey="fields.city.label"
							placeholderKey="fields.city.placeholder"
							descriptionKey="fields.city.description"
							required
							isRequired={true}
						/>

						<ReusableSelectField
							control={form.control}
							name="region"
							labelKey="fields.region.label"
							local="personalInfoForm"
							placeholderKey="fields.region.placeholder"
							descriptionKey="fields.region.description"
							options={subStates}
							onValueChange={(value) => form.setValue("region", value)}
							required
						/>

						<ReusableFormField
							control={form.control}
							name="zip_code"
							type="text"
							local="personalInfoForm"
							labelKey="fields.zip_code.label"
							placeholderKey="fields.zip_code.placeholder"
							descriptionKey="fields.zip_code.description"
						/>

						<ReusableFormField
							control={form.control}
							name="kifle_ketema"
							type="text"
							local="personalInfoForm"
							labelKey="fields.kifle_ketema.label"
							placeholderKey="fields.kifle_ketema.placeholder"
							descriptionKey="fields.kifle_ketema.description"
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
