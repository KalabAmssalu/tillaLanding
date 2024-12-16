"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusablePhoneInputField from "@/components/shared/Form/ReusablePhoneInput";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/hooks/storehooks";
import {
	type ProviderGroupFormValues,
	createProviderGroupSchema,
	getAllSpecialityCategories,
	getSpecialtiesForCategory,
	getSubSpecialtiesForCategory,
} from "@/types/provider/ProviderInfoType";

interface ProviderInfoFormProps {
	onFormComplete: (data: ProviderGroupFormValues) => void;
}

export default function ProviderGroupForm({
	onFormComplete,
}: ProviderInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("providerInfoForm");
	const providerInfoSchema = createProviderGroupSchema(t);
	const DataInfo = useAppSelector((state) => state.provider.providerSlice);
	const form = useForm<ProviderGroupFormValues>({
		resolver: zodResolver(providerInfoSchema),
		defaultValues: {
			provider_type: DataInfo.provider_type || "",
			provider_primary_specialty: DataInfo.provider_primary_specialty || "",
			provider_sub_specialty: DataInfo.provider_sub_specialty || "",
			provider_discount_agreement: DataInfo.provider_discount_agreement || 0,
			provider_group_name: DataInfo.provider_group_name || "",
			provider_group_contact_person:
				DataInfo.provider_group_contact_person || "",
			provider_group_phone_number: DataInfo.provider_group_phone_number || "",
			provider_group_contact_email: DataInfo.provider_group_contact_email || "",
			provider_group_address: DataInfo.provider_group_address || "",
		},
	});
	const [selectedProviderType, setSelectedProviderType] = useState("");
	const [selectedPrimarySpecialty, setSelectedPrimarySpecialty] = useState<
		string[]
	>([]);
	const [subSpecialtyOptions, setSubSpecialtyOptions] = useState<string[]>([]);

	useEffect(() => {
		const selectedtype = form.getValues("provider_type");

		if (selectedtype) {
			// Update options dynamically based on the selected provider type
			const specialties = getSpecialtiesForCategory(selectedtype) || [];
			const subspecialties = getSubSpecialtiesForCategory(selectedtype) || [];

			setSelectedPrimarySpecialty(specialties);
			setSubSpecialtyOptions(subspecialties);

			// Reset form fields
			form.setValue("provider_primary_specialty", "");
			form.setValue("provider_sub_specialty", "");
		}
	}, [selectedProviderType, form]);

	function onSubmit(data: ProviderGroupFormValues) {
		onFormComplete(data);
		setVisible(false);
		console.log("data to submit", data);
	}
	// const [specialityOptions] = useState(() => getAllSpecialityCategories());
	const specialityOptions = getAllSpecialityCategories();
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background">
					<legend className="text-lg font-semibold">{t("speciality")}</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-1">
						<FormField
							control={form.control}
							name="provider_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_type.label")}

										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={(value) => {
												setSelectedProviderType(value);

												form.setValue("provider_type", value);
												form.setValue("provider_sub_specialty", "");
											}}
										>
											<SelectTrigger className="items-start [&_[data-description]]:hidden">
												<SelectValue
													placeholder={t("fields.provider_type.placeholder")}
												/>
											</SelectTrigger>
											<SelectContent>
												{specialityOptions.map((spec) => (
													<SelectItem key={spec} value={spec}>
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>{spec}</p>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_type.description")}
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_primary_specialty"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_primary_specialty.label")}

										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={(value) => {
												setSelectedPrimarySpecialty([value]);
												form.setValue("provider_primary_specialty", value);
												form.setValue("provider_sub_specialty", "");
											}}
										>
											<SelectTrigger className="items-start [&_[data-description]]:hidden">
												<SelectValue
													placeholder={t(
														"fields.provider_primary_specialty.placeholder"
													)}
												/>
											</SelectTrigger>
											<SelectContent>
												{selectedPrimarySpecialty.map((spec) => (
													<SelectItem key={spec} value={spec}>
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>{spec}</p>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_primary_specialty.description")}
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_sub_specialty"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_sub_specialty.label")}
										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={(value) =>
												form.setValue("provider_sub_specialty", value)
											}
										>
											<SelectTrigger className="items-start [&_[data-description]]:hidden">
												<SelectValue
													placeholder={t(
														"fields.provider_sub_specialty.placeholder"
													)}
												/>
											</SelectTrigger>
											<SelectContent>
												{subSpecialtyOptions.map((subSpeciality, index) => (
													<SelectItem key={index} value={subSpeciality}>
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>{subSpeciality}</p>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_sub_specialty.description")}
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_discount_agreement"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_discount_agreement.label")}
										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) => {
												form.setValue(
													"provider_discount_agreement",
													parseInt(value) as 0 | 5 | 10
												);
											}}
										>
											<SelectTrigger className="items-start [&_[data-description]]:hidden">
												<SelectValue
													placeholder={t(
														"fields.provider_discount_agreement.placeholder"
													)}
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="0">
													<div className="flex items-start gap-3 text-muted-foreground">
														<p>
															{t(
																"fields.provider_discount_agreement.options.NoDiscount"
															)}
														</p>
													</div>
												</SelectItem>
												<SelectItem value="5">
													<div className="flex items-start gap-3 text-muted-foreground">
														<p>
															{t(
																"fields.provider_discount_agreement.options.fivePercent"
															)}
														</p>
													</div>
												</SelectItem>
												<SelectItem value="10">
													<div className="flex items-start gap-3 text-muted-foreground">
														<p>
															{t(
																"fields.provider_discount_agreement.options.tenPercent"
															)}
														</p>
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_discount_agreement.description")}
									</FormDescription>
								</FormItem>
							)}
						/>
					</div>
				</fieldset>
				<fieldset className="border p-4 rounded-md bg-background">
					<legend className="text-lg font-semibold">{t("group")}</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<ReusableFormField
							control={form.control}
							name="provider_group_name"
							type="text"
							local="providerInfoForm"
							labelKey="fields.provider_group_name.label"
							placeholderKey="fields.provider_group_name.placeholder"
							descriptionKey="fields.provider_group_name.description"
						/>
						<ReusableFormField
							control={form.control}
							name="provider_group_contact_person"
							type="text"
							local="providerInfoForm"
							labelKey="fields.provider_group_contact_person.label"
							placeholderKey="fields.provider_group_contact_person.placeholder"
							descriptionKey="fields.provider_group_contact_person.description"
						/>

						<ReusablePhoneInputField
							control={form.control}
							name="provider_group_phone_number"
							labelKey="fields.provider_group_phone_number.label"
							placeholderKey="fields.provider_group_phone_number.placeholder"
							descriptionKey="fields.provider_group_phone_number.description"
							local="providerInfoForm"
						/>
						<ReusableFormField
							control={form.control}
							name="provider_group_contact_email"
							type="email"
							local="providerInfoForm"
							labelKey="fields.provider_group_contact_email.label"
							placeholderKey="fields.provider_group_contact_email.placeholder"
							descriptionKey="fields.provider_group_contact_email.description"
						/>
						<ReusableFormField
							control={form.control}
							name="provider_group_address"
							type="email"
							local="providerInfoForm"
							labelKey="fields.provider_group_address.label"
							placeholderKey="fields.provider_group_address.placeholder"
							descriptionKey="fields.provider_group_address.description"
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
