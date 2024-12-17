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
	type OrganizationAddressFormValues,
	organizationAddressSchema,
} from "@/types/organization/organizationValidation";
import {
	getAllCountries,
	getStatesForCountry,
} from "@/types/provider/ProviderInfoType";

interface AddressInfoFormProps {
	onFormComplete: (data: OrganizationAddressFormValues) => void;
}

export default function OrganizationAddressForm({
	onFormComplete,
}: AddressInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("OrganizationInfoForm");
	const DataInfo = useAppSelector(
		(state) => state.organization.organizationSlice
	);
	const addressInfoSchema = organizationAddressSchema(t);

	const form = useForm<OrganizationAddressFormValues>({
		resolver: zodResolver(addressInfoSchema),
		defaultValues: {
			street_address: DataInfo.street_address || "",
			kifle_ketema: DataInfo.kifle_ketema || "",
			country: DataInfo.country || "",
			city: DataInfo.city || "",
			region: DataInfo.region || "",
			zip_code: DataInfo.zip_code || "",
		},
	});

	function onSubmit(data: OrganizationAddressFormValues) {
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2">
						<ReusableFormField
							control={form.control}
							name="street_address"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.street_address.label"
							placeholderKey="fields.street_address.placeholder"
							descriptionKey="fields.street_address.description"
							required
							isRequired={true}
						/>

						<ReusableFormField
							control={form.control}
							name="zip_code"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.zip_code.label"
							placeholderKey="fields.zip_code.placeholder"
							descriptionKey="fields.zip_code.description"
						/>

						<ReusableFormField
							control={form.control}
							name="city"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.city.label"
							placeholderKey="fields.city.placeholder"
							descriptionKey="fields.city.description"
							required
							isRequired={true}
						/>

						<ReusableFormField
							control={form.control}
							name="kifle_ketema"
							type="text"
							local="OrganizationInfoForm"
							labelKey="fields.kifle_ketema.label"
							placeholderKey="fields.kifle_ketema.placeholder"
							descriptionKey="fields.kifle_ketema.description"
						/>
						<ReusableSelectField
							control={form.control}
							name="country"
							labelKey="fields.country.label"
							local="OrganizationInfoForm"
							placeholderKey="fields.country.placeholder"
							descriptionKey="fields.country.description"
							options={countryOptions}
							onValueChange={handleCountryValueChange}
							required
						/>
						<ReusableSelectField
							control={form.control}
							name="region"
							labelKey="fields.region.label"
							local="OrganizationInfoForm"
							placeholderKey="fields.region.placeholder"
							descriptionKey="fields.region.description"
							options={subStates}
							onValueChange={(value) => form.setValue("region", value)}
							required
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
