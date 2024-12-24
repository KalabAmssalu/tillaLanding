"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { PersonStanding } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusablePhoneInputField from "@/components/shared/Form/ReusablePhoneInput";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks";
import {
	type ProviderInfoFormValues,
	createProviderInfoSchema,
	createProviderTitleOptions,
	getAllTiers,
	getSubTiersForTier,
} from "@/types/provider/ProviderInfoType";
import { type ProviderTitle } from "@/types/provider/ProviderType";

interface ProviderInfoFormProps {
	onFormComplete: (data: ProviderInfoFormValues) => void;
}

export default function ProviderInfoForm({
	onFormComplete,
}: ProviderInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("providerInfoForm");
	const providerTitleOptions = createProviderTitleOptions(t);
	const providerInfoSchema = createProviderInfoSchema(t);
	const DataInfo = useAppSelector((state) => state.provider.providerSlice);

	const form = useForm<ProviderInfoFormValues>({
		resolver: zodResolver(providerInfoSchema),
		defaultValues: {
			tin_number: DataInfo.tin_number || "",
			institute_name: DataInfo.institute_name || "",
			provider_id: DataInfo.provider_id || "",
			provider_first_name: DataInfo.provider_first_name || "",
			provider_middle_initial: DataInfo.provider_middle_initial || "",
			provider_last_name: DataInfo.provider_last_name || "",
			provider_title: DataInfo.provider_title || "",
			provider_gender: "male",
			provider_date_of_birth: DataInfo.provider_date_of_birth || "",
			provider_contact_person: DataInfo.provider_contact_person || "",
			provider_contact_email: DataInfo.provider_contact_email || "",
			provider_contact_phone_number:
				DataInfo.provider_contact_phone_number || "",
			provider_phone_number: DataInfo.provider_phone_number || "",
			provider_email: DataInfo.provider_email || "",
			provider_health_sub_tier: DataInfo.provider_health_sub_tier || "",
			provider_health_tier: DataInfo.provider_health_tier || "",
			provider_service_type: "institute",
		},
	});

	const [subTiers, setSubTiers] = useState<string[]>([]);
	const [selectedMainTier, setSelectedMainTier] = useState("");
	const [isProfessional, setIsProfessional] = useState(false);
	const [selectedServiceType, setSelectedServiceType] = useState("");
	const [isRequired, setIsRequired] = useState(false);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (selectedServiceType === "professional") {
			setIsProfessional(true);
			form.setValue("institute_name", "");
			setIsRequired(true);
		} else {
			setIsProfessional(false);
			form.setValue("provider_first_name", "");
			form.setValue("provider_middle_initial", "");
			form.setValue("provider_last_name", "");
			form.setValue("provider_title", "");
			form.setValue("provider_gender", "");
		}
	}, [selectedServiceType, form]);

	useEffect(() => {
		const selectedTier = form.getValues("provider_health_tier");
		if (selectedTier) {
			setSubTiers(getSubTiersForTier(selectedTier) || []);
		}
	}, [selectedMainTier, form]);

	// Get all main tiers for the provider_health_tier dropdown
	const mainTiers = getAllTiers();

	function onSubmit(data: ProviderInfoFormValues) {
		onFormComplete(data);
		console.log("submitted data 1", data);
		setVisible(false);
	}

	const handleTitleValueChange = (value: string) => {
		form.setValue("provider_title", value);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background ">
					<legend className="text-lg font-semibold">
						{t("identifiation")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<ReusableFormField
							control={form.control}
							name="provider_id"
							type="text"
							local="providerInfoForm"
							labelKey="fields.provider_id.label"
							placeholderKey="fields.provider_id.placeholder"
							descriptionKey="fields.provider_id.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="tin_number"
							type="text"
							local="providerInfoForm"
							labelKey="fields.tin_number.label"
							placeholderKey="fields.tin_number.placeholder"
							descriptionKey="fields.tin_number.description"
							required
							isRequired={true}
						/>
						<FormField
							control={form.control}
							name="provider_service_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_service_type.label")}
										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) => {
												setSelectedServiceType(value);
												form.setValue(
													"provider_service_type",
													value as "group" | "institute" | "professional"
												);
											}}
										>
											<SelectTrigger className="items-start [&_[data-description]]:hidden">
												<SelectValue
													placeholder={t(
														"fields.provider_service_type.placeholder"
													)}
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="group">
													<div className="flex items-start gap-3 text-muted-foreground">
														<p>
															{t("fields.provider_service_type.options.group")}
														</p>
													</div>
												</SelectItem>
												<SelectItem value="institute">
													<div className="flex items-start gap-3 text-muted-foreground">
														<p>
															{t(
																"fields.provider_service_type.options.institute"
															)}
														</p>
													</div>
												</SelectItem>
												<SelectItem value="professional">
													<div className="flex items-start gap-3 text-muted-foreground">
														<p>
															{t(
																"fields.provider_service_type.options.professional"
															)}
														</p>
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_service_type.description")}
									</FormDescription>
								</FormItem>
							)}
						/>
						{/* <ReusableSelectField
							control={form.control}
							name="provider_service_type"
							labelKey="fields.provider_service_type.label"
							local="providerInfoForm"
							placeholderKey="fields.provider_service_type.placeholder"
							descriptionKey="fields.provider_service_type.description"
							options={[
								{
									label: t("fields.provider_service_type.options.group"),
									value: "group",
								},
								{
									label: t("fields.provider_service_type.options.institute"),
									value: "institute",
								},
								{
									label: t("fields.provider_service_type.options.professional"),
									value: "professional",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"provider_service_type",
									value as "group" | "institute" | "professional"
								);
							}}
							required
						/> */}

						<ReusableFormField
							control={form.control}
							name="provider_email"
							type="email"
							local="providerInfoForm"
							labelKey="fields.provider_email.label"
							placeholderKey="fields.provider_email.placeholder"
							descriptionKey="fields.provider_email.description"
							required
							isRequired={true}
						/>

						<ReusablePhoneInputField
							control={form.control}
							name="provider_phone_number"
							labelKey="fields.provider_phone_number.label"
							placeholderKey="fields.provider_phone_number.placeholder"
							descriptionKey="fields.provider_phone_number.description"
							local="providerInfoForm"
							required
							isRequired={true}
						/>
					</div>
				</fieldset>
				{isProfessional && (
					<>
						<Alert className="border-primary border-[1.5px]">
							<PersonStanding className="h-4 w-4" />
							<AlertTitle>{t("alert.title")}</AlertTitle>
							<AlertDescription>{t("alert.description")}</AlertDescription>
						</Alert>
						<fieldset className="border p-4 rounded-md bg-background ">
							<legend className="text-lg font-semibold ">
								{t("personal")}
							</legend>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6 ">
								<ReusableFormField
									control={form.control}
									name="provider_first_name"
									type="text"
									local="providerInfoForm"
									labelKey="fields.provider_first_name.label"
									placeholderKey="fields.provider_first_name.placeholder"
									descriptionKey="fields.provider_first_name.description"
									required
									isRequired={true}
								/>
								<ReusableFormField
									control={form.control}
									name="provider_middle_initial"
									type="text"
									local="providerInfoForm"
									labelKey="fields.provider_middle_initial.label"
									placeholderKey="fields.provider_middle_initial.placeholder"
									descriptionKey="fields.provider_middle_initial.description"
									required
									isRequired={true}
								/>
								<ReusableFormField
									control={form.control}
									name="provider_last_name"
									type="text"
									local="providerInfoForm"
									labelKey="fields.provider_last_name.label"
									placeholderKey="fields.provider_last_name.placeholder"
									descriptionKey="fields.provider_last_name.description"
									required
									isRequired={true}
								/>
							</div>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-4">
								<FormField
									control={form.control}
									name="provider_title"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="flex gap-1">
												{t("fields.provider_title.label")}
												<p className="text-red-500">*</p>
											</FormLabel>
											<FormControl>
												<Select
													onValueChange={(value) => {
														form.setValue(
															"provider_title",
															value as ProviderTitle
														); // Ensure type matches your ProviderTitle type
													}}
													required={isRequired}
												>
													<SelectTrigger className="items-start [&_[data-description]]:hidden">
														<SelectValue
															placeholder={t(
																"fields.provider_title.placeholder"
															)}
														/>
													</SelectTrigger>
													<SelectContent>
														{providerTitleOptions.map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}
															>
																<div className="flex items-start gap-3 text-muted-foreground">
																	<p>{option.label}</p>
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
											<FormDescription>
												{t("fields.provider_title.description")}
											</FormDescription>
										</FormItem>
									)}
								/>
								<ReusableSelectField
									control={form.control}
									name="provider_gender"
									labelKey="fields.provider_gender.label"
									local="providerInfoForm"
									placeholderKey="fields.provider_gender.placeholder"
									descriptionKey="fields.provider_gender.description"
									options={[
										{
											label: t("fields.provider_gender.options.male"),
											value: "male",
										},
										{
											label: t("fields.provider_gender.options.female"),
											value: "female",
										},
										{
											label: t(
												"fields.provider_gender.options.not_prefer_to_say"
											),
											value: "not_prefer_to_say",
										},
									]}
									onValueChange={(value) => {
										form.setValue(
											"provider_gender",
											value as "male" | "female" | "not_prefer_to_say"
										);
									}}
									required
								/>
								<ReusableDatePickerField
									control={form.control}
									name="provider_date_of_birth"
									labelKey="fields.provider_date_of_birth.label"
									placeholderKey="fields.provider_date_of_birth.placeholder"
									descriptionKey="fields.provider_date_of_birth.description"
									required
									buttonClassName="custom-button-class"
									local="providerInfoForm"
								/>
							</div>
						</fieldset>
					</>
				)}
				<fieldset className="border p-4 rounded-md bg-background mt-6 ">
					<legend className="text-lg font-semibold">{t("information")}</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
						{!isProfessional && (
							<ReusableFormField
								control={form.control}
								name="institute_name"
								type="text"
								local="providerInfoForm"
								labelKey="fields.institute_name.label"
								placeholderKey="fields.institute_name.placeholder"
								descriptionKey="fields.institute_name.description"
								required
								isRequired={true}
							/>
						)}

						<FormField
							control={form.control}
							name="provider_health_tier"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("fields.provider_health_tier.label")}
									</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={(value) => {
												setSelectedMainTier(value);

												form.setValue("provider_health_tier", value);
												form.setValue("provider_health_sub_tier", "");
											}}
										>
											<SelectTrigger className="items-start [&_[data-description]]:hidden">
												<SelectValue
													placeholder={t(
														"fields.provider_health_tier.placeholder"
													)}
												/>
											</SelectTrigger>
											<SelectContent>
												{mainTiers.map((tier) => (
													<SelectItem key={tier} value={tier}>
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>
																{t(
																	`fields.provider_health_tier.options.${tier}`
																)}
															</p>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_health_tier.description")}
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="provider_health_sub_tier"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("fields.provider_health_sub_tier.label")}
									</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={(value) =>
												form.setValue("provider_health_sub_tier", value)
											}
										>
											<SelectTrigger className="items-start [&_[data-description]]:hidden">
												<SelectValue
													placeholder={t(
														"fields.provider_health_sub_tier.placeholder"
													)}
												/>
											</SelectTrigger>
											<SelectContent>
												{subTiers.map((subTier, index) => (
													<SelectItem key={index} value={subTier}>
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>{subTier}</p>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.provider_health_sub_tier.description")}
									</FormDescription>
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
						<ReusableFormField
							control={form.control}
							name="provider_contact_person"
							type="text"
							local="providerInfoForm"
							labelKey="fields.provider_contact_person.label"
							placeholderKey="fields.provider_contact_person.placeholder"
							descriptionKey="fields.provider_contact_person.description"
						/>
						<ReusableFormField
							control={form.control}
							name="provider_contact_email"
							type="email"
							local="providerInfoForm"
							labelKey="fields.provider_contact_email.label"
							placeholderKey="fields.provider_contact_email.placeholder"
							descriptionKey="fields.provider_contact_email.description"
						/>

						<ReusablePhoneInputField
							control={form.control}
							name="provider_contact_phone_number"
							labelKey="fields.provider_contact_phone_number.label"
							placeholderKey="fields.provider_contact_phone_number.placeholder"
							descriptionKey="fields.provider_contact_phone_number.description"
							local="providerInfoForm"
							required
							isRequired={true}
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
