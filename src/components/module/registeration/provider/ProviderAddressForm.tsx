"use client";

import { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/hooks/storehooks";
import {
	ProviderAddressFormValues,
	createProviderAddressSchema,
	getAllCountries,
	getStatesForCountry,
} from "@/types/provider/ProviderInfoType";

interface AddressInfoFormProps {
	onFormComplete: (data: ProviderAddressFormValues) => void;
}

export default function ProviderAddressForm({
	onFormComplete,
}: AddressInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("providerInfoForm");
	const DataInfo = useAppSelector((state) => state.provider.providerSlice);
	const addressInfoSchema = createProviderAddressSchema(t);

	const form = useForm<ProviderAddressFormValues>({
		resolver: zodResolver(addressInfoSchema),
		defaultValues: {
			provider_phone_number: DataInfo.provider_phone_number || "",
			provider_address: DataInfo.provider_address || "",
			provider_address_line2: DataInfo.provider_address_line2 || "",
			provider_kifle_ketema: DataInfo.provider_kifle_ketema || "",
			provider_country: DataInfo.provider_country || "",
			provider_city: DataInfo.provider_city || "",
			provider_region: DataInfo.provider_region || "",
			provider_zip_code: DataInfo.provider_zip_code || "",
			provider_fax: DataInfo.provider_fax || "",
			provider_email: DataInfo.provider_email || "",
		},
	});

	function onSubmit(data: ProviderAddressFormValues) {
		onFormComplete(data);
		setVisible(false);
		console.log("data to submit", data);
	}
	const [subStates, setSubStates] = useState<string[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<string>("");
	useEffect(() => {
		const selectedCountry = form.getValues("provider_country");
		if (selectedCountry) {
			setSubStates(getStatesForCountry(selectedCountry) || []);
			form.setValue("provider_region", "");
		}
	}, [selectedCountry, form]);

	const countryOptions = useMemo(() => {
		return getAllCountries();
	}, []);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background pb-6">
					<legend className="text-lg font-semibold">{t("AddressInfo")}</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2">
						<FormField
							control={form.control}
							name="provider_email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_email.label")}
										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder={t("fields.provider_email.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_email.description")}
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_phone_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_phone_number.label")}
										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t(
												"fields.provider_phone_number.placeholder"
											)}
											{...field}
										/>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_phone_number.description")}
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="provider_country"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_country.label")}

										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={(value) => {
												setSelectedCountry(value);

												form.setValue("provider_country", value);
												form.setValue("provider_region", "");
											}}
										>
											<SelectTrigger className="items-start [&_[data-description]]:hidden">
												<SelectValue
													placeholder={t("fields.provider_country.placeholder")}
												/>
											</SelectTrigger>
											<SelectContent>
												{countryOptions.map((country) => (
													<SelectItem key={country} value={country}>
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>{country}</p>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_country.description")}
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_region"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_region.label")}
										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={(value) =>
												form.setValue("provider_region", value)
											}
										>
											<SelectTrigger className="items-start [&_[data-description]]:hidden">
												<SelectValue
													placeholder={t("fields.provider_region.placeholder")}
												/>
											</SelectTrigger>
											<SelectContent>
												{subStates.map((state, index) => (
													<SelectItem key={index} value={state}>
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>{state}</p>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_region.description")}
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_city"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_city.label")}

										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder={t("fields.provider_city.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t("fields.provider_city.description")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_kifle_ketema"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("fields.provider_kifle_ketema.label")}
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder={t(
												"fields.provider_kifle_ketema.placeholder"
											)}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t("fields.provider_kifle_ketema.description")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="provider_address"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start">
									<FormLabel className="text-left flex gap-1">
										{t("fields.provider_address.label")}
										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl className="w-full">
										<Input
											placeholder={t("fields.provider_address.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormDescription className="text-left">
										{t("fields.provider_address.description")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_address_line2"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("fields.provider_address_line2.label")}
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder={t(
												"fields.provider_address_line2.placeholder"
											)}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t("fields.provider_address_line2.description")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_zip_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.provider_zip_code.label")}</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder={t("fields.provider_zip_code.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t("fields.provider_zip_code.description")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_fax"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.provider_fax.label")}</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder={t("fields.provider_fax.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t("fields.provider_fax.description")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
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
