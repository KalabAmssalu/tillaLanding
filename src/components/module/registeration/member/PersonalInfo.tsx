"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
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
import {
	ClearIndividualSlice,
	SetIndividualSlice,
} from "@/lib/store/redux/individualSlice";

interface PersonalInfoProps {
	onFormComplete: () => void;
	active: boolean; // Define the active prop
}

export function PersonalInfo({ onFormComplete, active }: PersonalInfoProps) {
	const t = useTranslations("personalInfoForm");
	const dispatch = useAppDispatch();
	const DataInfo = useAppSelector((state) => state.individual.individualSlice);
	// Validation schema using zod
	const personalInfoSchema = z.object({
		first_name: z.string().min(2, {
			message: t("fields.firstName.error"),
		}),
		middle_name: z.string().min(2, {
			message: t("fields.firstName.error"),
		}),
		last_name: z.string().min(2, {
			message: t("fields.lastName.error"),
		}),
		first_name_Am: z.string().min(2, {
			message: t("fields.firstNameAm.error"),
		}),
		middle_name_Am: z.string().min(2, {
			message: t("fields.firstNameAm.error"),
		}),
		last_name_Am: z.string().min(2, {
			message: t("fields.lastNameAm.error"),
		}),
		phone_number: z
			.string()
			.min(10, { message: t("fields.contactPhone.error") }),
		email_address: z
			.string()
			.email({ message: t("fields.contactEmail.error") }),
		gender: z.enum(["male", "female", "not_prefer_to_say"]).optional(),
		date_of_birth: z.string().optional(),
		marital_status: z
			.enum(["single", "married", "widowed", "divorced"])
			.optional(),
		benefit_plan: z
			.enum(["basic", "standard", "comprehensive", "family"])
			.optional(),
		tin_number: z.string(),
		height: z.string(),
		weight: z.string(),
		mailing_address_line1: z.string(),
		kifle_ketema: z.string(),
		country: z.string(),
		region: z.string(),
		street_address: z.string(),
		city: z.string(),
	});

	type PersonalFormValues = z.infer<typeof personalInfoSchema>;

	const form = useForm<PersonalFormValues>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			first_name: DataInfo.first_name || "",
			middle_name: DataInfo.middle_name || "",
			last_name: DataInfo.last_name || "",
			first_name_Am: DataInfo.first_name_Am || "",
			middle_name_Am: DataInfo.middle_name_Am || "",
			last_name_Am: DataInfo.last_name_Am || "",
			phone_number: DataInfo.phone_number || "",
			email_address: DataInfo.email_address || "",
			tin_number: DataInfo.tin_number || "",
			gender: DataInfo.gender || undefined,
			benefit_plan: DataInfo.benefit_plan || undefined,
			date_of_birth: DataInfo.date_of_birth || "",
			mailing_address_line1: DataInfo.mailing_address_line1 || "",
			kifle_ketema: DataInfo.kifle_ketema || "",
			country: DataInfo.country || "",
			region: DataInfo.region || "",
			street_address: DataInfo.street_address || "",
			city: DataInfo.city || "",
		},
	});

	const [disableBtn, setDisableBtn] = useState(true);
	const onSubmit = (data: z.infer<typeof personalInfoSchema>) => {
		const formattedData = {
			...data,
		};

		console.log(formattedData);

		dispatch(SetIndividualSlice(formattedData));
		onFormComplete();
		setDisableBtn(!disableBtn);
	};

	const handleReset = () => {
		dispatch(ClearIndividualSlice());
		form.reset();
		window.location.reload();
	};

	return (
		<div id="organizationForm">
			<div className="relative">
				<CardHeader>
					<CardDescription>{t("description")}</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="gap-6 flex flex-col"
						>
							<fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Full Name
								</legend>
								<FormField
									control={form.control}
									name="first_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.firstName.label")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t("fields.firstName.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.firstName.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="middle_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.middleName.label")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t("fields.middleName.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.middleName.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="last_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.lastName.label")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t("fields.lastName.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.lastName.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="first_name_Am"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.firstNameAm.label")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t("fields.firstNameAm.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.firstNameAm.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="middle_name_Am"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.middleNameAm.label")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t("fields.middleNameAm.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.middleNameAm.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="last_name_Am"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.lastNameAm.label")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t("fields.lastNameAm.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.lastNameAm.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</fieldset>
							<fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Personal Information
								</legend>

								<FormField
									control={form.control}
									name="gender"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.gender.label")}</FormLabel>
											<FormControl>
												<Select
													onValueChange={(value) => {
														form.setValue(
															"gender",
															value as "male" | "female" | undefined
														);
													}}
												>
													<SelectTrigger className="items-start [&_[data-description]]:hidden">
														<SelectValue
															placeholder={t("fields.gender.placeholder")}
														/>
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="male">
															<div className="flex items-start gap-3 text-muted-foreground">
																<p>{t("fields.gender.options.male")}</p>
															</div>
														</SelectItem>
														<SelectItem value="female">
															<div className="flex items-start gap-3 text-muted-foreground">
																<p>{t("fields.gender.options.female")}</p>
															</div>
														</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
											<FormDescription>
												{t("fields.gender.description")}
											</FormDescription>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="date_of_birth"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.dateOfBirth.label")}</FormLabel>
											<FormControl>
												<Input
													type="date"
													placeholder={t("fields.dateOfBirth.placeholder")}
													{...field}
													className="w-full"
													onChange={(e) =>
														form.setValue("date_of_birth", e.target.value)
													}
												/>
											</FormControl>
											<FormMessage />
											<FormDescription>
												{t("fields.dateOfBirth.description")}
											</FormDescription>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="height"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.height.label")}</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder={t("fields.height.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.height.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="weight"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.weight.label")}</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder={t("fields.weight.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.weight.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="marital_status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.maritalStatus.label")}</FormLabel>
											<FormControl>
												<Select
													onValueChange={(value) => {
														form.setValue(
															"marital_status",
															value as
																| "single"
																| "married"
																| "widowed"
																| "divorced"
																| undefined
														);
													}}
												>
													<SelectTrigger className="items-start [&_[data-description]]:hidden">
														<SelectValue
															placeholder={t(
																"fields.maritalStatus.placeholder"
															)}
														/>
													</SelectTrigger>
													<SelectContent>
														{[
															"single",
															"married",
															"widowed",
															"divorced",
															"separated",
														].map((status) => (
															<SelectItem key={status} value={status}>
																<div className="flex items-start gap-3 text-muted-foreground">
																	<p>
																		{t(
																			`fields.maritalStatus.options.${status}`
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
												{t("fields.maritalStatus.description")}
											</FormDescription>
										</FormItem>
									)}
								/>
							</fieldset>
							<fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Address Information
								</legend>
								<FormField
									control={form.control}
									name="email_address"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.contactEmail.label")}</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder={t("fields.contactEmail.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.contactEmail.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="phone_number"
									render={({ field }) => (
										<FormItem className="flex flex-col items-start">
											<FormLabel className="text-left">
												{t("fields.contactPhone.label")}
											</FormLabel>
											<FormControl className="w-full">
												<Input
													placeholder={t("fields.contactPhone.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription className="text-left">
												{t("fields.contactPhone.description")}
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
											<FormLabel>{t("fields.tin_number.label")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t("fields.tin_number.placeholder")}
													{...field}
													type="number"
												/>
											</FormControl>
											<FormMessage />
											<FormDescription>
												{t("fields.tin_number.description")}
											</FormDescription>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="mailing_address_line1"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.mailing_address_line1.label")}
											</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t(
														"fields.mailing_address_line1.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.mailing_address_line1.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.city.label")}</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t("fields.city.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.city.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="region"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.region.label")}</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t("fields.region.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.region.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="street_address"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.street_address.label")}</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t("fields.street_address.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.street_address.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="kifle_ketema"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.kifle_ketema.label")}</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t("fields.kifle_ketema.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.kifle_ketema.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="country"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.country.label")}</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t("fields.country.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.country.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</fieldset>

							<FormField
								control={form.control}
								name="benefit_plan"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("fields.benefit_plan.label")}</FormLabel>
										<FormControl>
											<Select
												onValueChange={(value) => {
													form.setValue(
														"benefit_plan",
														value as
															| "basic"
															| "standard"
															| "comprehensive"
															| "family"
															| undefined
													);
												}}
											>
												<SelectTrigger className="items-start [&_[data-description]]:hidden">
													<SelectValue
														placeholder={t("fields.benefit_plan.placeholder")}
													/>
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="basic">
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>{t("fields.benefit_plan.options.basic")}</p>
														</div>
													</SelectItem>
													<SelectItem value="standard">
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>{t("fields.benefit_plan.options.standard")}</p>
														</div>
													</SelectItem>
													<SelectItem value="comprehensive">
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>
																{t("fields.benefit_plan.options.comprehensive")}
															</p>
														</div>
													</SelectItem>
													<SelectItem value="family">
														<div className="flex items-start gap-3 text-muted-foreground">
															<p>{t("fields.benefit_plan.options.family")}</p>
														</div>
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
										<FormDescription>
											{t("fields.benefit_plan.description")}
										</FormDescription>
									</FormItem>
								)}
							/>
							{disableBtn && (
								<div className="flex items-center gap-4 justify-center">
									<Button className="w-32" type="submit">
										Save
									</Button>
									<Button
										className="w-32"
										type="reset"
										variant={"outline"}
										onClick={handleReset}
									>
										Clear
									</Button>
								</div>
							)}
						</form>
					</Form>
				</CardContent>
			</div>
		</div>
	);
}
