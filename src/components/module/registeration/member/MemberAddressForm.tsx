"use client";

import { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAppSelector } from "@/hooks/storehooks";
import {
	type MemberAddressFormValues,
	createMemberAddressSchema,
} from "@/types/memeber/memberValidation";
import {
	getAllCountries,
	getStatesForCountry,
} from "@/types/provider/ProviderInfoType";

interface AddressInfoFormProps {
	onFormComplete: (data: MemberAddressFormValues) => void;
}

export default function MemberAddressForm({
	onFormComplete,
}: AddressInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("personalInfoForm");
	const DataInfo = useAppSelector((state) => state.member.memberSlice);
	const addressInfoSchema = createMemberAddressSchema(t);

	const form = useForm<MemberAddressFormValues>({
		resolver: zodResolver(addressInfoSchema),
		defaultValues: {
			street_address: DataInfo.street_address || "",
			mailing_address_line1: DataInfo.mailing_address_line1 || "",
			kifle_ketema: DataInfo.kifle_ketema || "",
			country: DataInfo.country || "",
			city: DataInfo.city || "",
			region: DataInfo.region || "",
			zip_code: DataInfo.zip_code || "",
		},
	});

	function onSubmit(data: MemberAddressFormValues) {
		onFormComplete(data);
		setVisible(false);
		console.log("data to submit", data);
	}
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
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background pb-6">
					<legend className="text-lg font-semibold">{t("AddressInfo")}</legend>
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
