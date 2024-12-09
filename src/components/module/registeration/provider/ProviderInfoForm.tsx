"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { PersonStanding } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DateSelector } from "@/components/ui/custom/date-selector";
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
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks";
import { ClearProviderSlice } from "@/lib/store/redux/providerSlice";
import { formatToMMDDYYYY } from "@/lib/utils/dateUtils";
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
			provider_first_name_amharic: DataInfo.provider_first_name_amharic || "",
			provider_middle_initial_amharic:
				DataInfo.provider_middle_initial_amharic || "",
			provider_last_name_amharic: DataInfo.provider_last_name_amharic || "",
			provider_title: DataInfo.provider_title || "",
			provider_gender: "male",
			provider_date_of_birth: DataInfo.provider_date_of_birth || "",
			provider_contact_person: DataInfo.provider_contact_person || "",
			provider_contact_email: DataInfo.provider_contact_email || "",
			provider_contact_phone_number:
				DataInfo.provider_contact_phone_number || "",
			provider_phone_number: DataInfo.provider_phone_number || "",
			provider_email: DataInfo.provider_email || "",
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
			form.setValue("provider_first_name_amharic", "");
			form.setValue("provider_middle_initial_amharic", "");
			form.setValue("provider_last_name_amharic", "");
			form.setValue("provider_title", "");
			form.setValue("provider_gender", "");
		}
	}, [selectedServiceType, form]);

	useEffect(() => {
		const selectedTier = form.getValues("provider_health_tier");
		if (selectedTier) {
			setSubTiers(getSubTiersForTier(selectedTier) || []);

			form.setValue("provider_health_sub_tier", "");
		}
	}, [selectedMainTier, form]);

	// Get all main tiers for the provider_health_tier dropdown
	const mainTiers = getAllTiers();

	function onSubmit(data: ProviderInfoFormValues) {
		onFormComplete(data);
		console.log("submitted data 1", data);
		setVisible(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background ">
					<legend className="text-lg font-semibold">
						{t("identifiation")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<FormField
							control={form.control}
							name="provider_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.provider_id.label")}
										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.provider_id.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t("fields.provider_id.description")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="tin_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex gap-1">
										{t("fields.tin_number.label")}
										<p className="text-red-500">*</p>
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.tin_number.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t("fields.tin_number.description")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
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
							<div className="grid grid-cols-1 gap-6 md:grid-cols-3 my-4">
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
								<FormField
									control={form.control}
									name="provider_gender"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.provider_gender.label")}</FormLabel>
											<FormControl>
												<Select
													onValueChange={(value) => {
														form.setValue(
															"provider_gender",
															value as "male" | "female" | "not_prefer_to_say"
														);
													}}
												>
													<SelectTrigger className="items-start [&_[data-description]]:hidden">
														<SelectValue
															placeholder={t(
																"fields.provider_gender.placeholder"
															)}
														/>
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="male">
															<div className="flex items-start gap-3 text-muted-foreground">
																<p>
																	{t("fields.provider_gender.options.male")}
																</p>
															</div>
														</SelectItem>
														<SelectItem value="female">
															<div className="flex items-start gap-3 text-muted-foreground">
																<p>
																	{t("fields.provider_gender.options.female")}
																</p>
															</div>
														</SelectItem>
														<SelectItem value="not_prefer_to_say">
															<div className="flex items-start gap-3 text-muted-foreground">
																<p>
																	{t(
																		"fields.provider_gender.options.not_prefer_to_say"
																	)}
																</p>
															</div>
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
											<FormDescription>
												{t("fields.provider_gender.description")}
											</FormDescription>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="provider_date_of_birth"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.provider_date_of_birth.label")}
											</FormLabel>
											<FormControl>
												<DateSelector
													selectedDate={
														field.value ? new Date(field.value) : undefined
													} // Convert string to Date
													onDateChange={(date) => {
														form.setValue(
															"provider_date_of_birth",
															date ? formatToMMDDYYYY(date) : "" // Format Date to MM, DD, YYYY
														);
													}}
													placeholder={t(
														"fields.provider_date_of_birth.placeholder"
													)}
													buttonClassName="custom-button-class"
												/>
											</FormControl>
											<FormMessage />
											<FormDescription>
												{t("fields.provider_date_of_birth.description")}
											</FormDescription>
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-6 ">
								<FormField
									control={form.control}
									name="provider_first_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="flex gap-1">
												{t("fields.provider_first_name.label")}
												<p className="text-red-500">*</p>
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"fields.provider_first_name.placeholder"
													)}
													{...field}
													required={isRequired}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.provider_first_name.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="provider_middle_initial"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.provider_middle_initial.label")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"fields.provider_middle_initial.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.provider_middle_initial.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="provider_last_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="flex gap-1">
												{t("fields.provider_last_name.label")}
												<p className="text-red-500">*</p>
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"fields.provider_last_name.placeholder"
													)}
													{...field}
													required={isRequired}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.provider_last_name.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="provider_first_name_amharic"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.provider_first_name_amharic.label")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"fields.provider_first_name_amharic.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.provider_first_name_amharic.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="provider_middle_initial_amharic"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.provider_middle_initial_amharic.label")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"fields.provider_middle_initial_amharic.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t(
													"fields.provider_middle_initial_amharic.description"
												)}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="provider_last_name_amharic"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.provider_last_name_amharic.label")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"fields.provider_last_name_amharic.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.provider_last_name_amharic.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</fieldset>
					</>
				)}
				<fieldset className="border p-4 rounded-md bg-background mt-6 ">
					<legend className="text-lg font-semibold">{t("information")}</legend>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
						{!isProfessional && (
							<FormField
								control={form.control}
								name="institute_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex gap-1">
											{t("fields.institute_name.label")}
											<p className="text-red-500">*</p>
										</FormLabel>
										<FormControl>
											<Input
												placeholder={t("fields.institute_name.placeholder")}
												{...field}
												required={isRequired}
											/>
										</FormControl>
										<FormDescription>
											{t("fields.institute_name.description")}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
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
						<FormField
							control={form.control}
							name="provider_contact_person"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("fields.provider_contact_person.label")}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t(
												"fields.provider_contact_person.placeholder"
											)}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t("fields.provider_contact_person.description")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_contact_email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("fields.provider_contact_email.label")}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t(
												"fields.provider_contact_email.placeholder"
											)}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t("fields.provider_contact_email.description")}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="provider_contact_phone_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("fields.provider_contact_phone_number.label")}
									</FormLabel>
									<FormControl>
										<Input
											placeholder={t(
												"fields.provider_contact_phone_number.placeholder"
											)}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										{t("fields.provider_contact_phone_number.description")}
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
