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

export function BrokerInfoForm({ onFormComplete, active }: PersonalInfoProps) {
	const t = useTranslations("brokerInfoForm");
	const dispatch = useAppDispatch();
	const DataInfo = useAppSelector((state) => state.individual.individualSlice);
	// Validation schema using zod
	const personalInfoSchema = z.object({
		first_name: z.string().min(2, {
			message: t("fields.firstName.error"),
		}),
		middle_initial: z.string().min(2, {
			message: t("fields.middleName.error"),
		}),
		last_name: z.string().min(2, {
			message: t("fields.lastName.error"),
		}),
		// first_name_Am: z.string().min(2, {
		// 	message: t("fields.firstNameAm.error"),
		// }),
		// middle_name_Am: z.string().min(2, {
		// 	message: t("fields.middleNameAm.error"),
		// }),
		// last_name_Am: z.string().min(2, {
		// 	message: t("fields.lastNameAm.error"),
		// }),
		phone_number: z
			.string()
			.min(10, { message: t("fields.contactPhone.error") }),
		email_address: z
			.string()
			.email({ message: t("fields.contactEmail.error") }),
		gender: z.enum(["male", "female"]).optional(),
		date_of_birth: z.string().optional(),
		tax_identification_number: z.string(),
		business_zip_code: z.string(),
		business_type: z.string(),
		business_license_number: z.string(),
		business_address_line_1: z.string(),
		business_address_line_2: z.string(),
		business_kifle_ketema: z.string(),
		business_state: z.string(),
		business_city: z.string(),
		company_name: z.string(),
	});

	type PersonalFormValues = z.infer<typeof personalInfoSchema>;

	const form = useForm<PersonalFormValues>({
		resolver: zodResolver(personalInfoSchema),
		defaultValues: {
			first_name: "",
			middle_initial: "",
			last_name: "",
			// first_name_Am: "",
			// middle_name_Am: "",
			// last_name_Am: "",
			phone_number: "",
			email_address: "",
			tax_identification_number: "",
			gender: undefined,
			business_type: "",
			date_of_birth: "",
			business_zip_code: "",
			business_address_line_1: "",
			business_address_line_2: "",
			business_kifle_ketema: "",
			business_license_number: "",
			business_state: "",
			company_name: "",
			business_city: "",
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
									name="middle_initial"
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
								{/* <FormField
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
								/> */}
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
														<SelectItem value="Male">
															<div className="flex items-start gap-3 text-muted-foreground">
																<p>{t("fields.gender.options.male")}</p>
															</div>
														</SelectItem>
														<SelectItem value="Female">
															<div className="flex items-start gap-3 text-muted-foreground">
																<p>{t("fields.gender.options.female")}</p>
															</div>
														</SelectItem>
														<SelectItem value="">
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
									name="company_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.company_name.label")}</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder={t("fields.company_name.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.company_name.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="business_license_number"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.business_license_number.label")}
											</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder={t(
														"fields.business_license_number.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.business_license_number.description")}
											</FormDescription>
											<FormMessage />
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
									name="tax_identification_number"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.tax_identification_number.label")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"fields.tax_identification_number.placeholder"
													)}
													{...field}
													type="number"
												/>
											</FormControl>
											<FormMessage />
											<FormDescription>
												{t("fields.tax_identification_number.description")}
											</FormDescription>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="business_address_line_1"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.business_address_line_1.label")}
											</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t(
														"fields.business_address_line_1.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.business_address_line_1.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="business_address_line_2"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.business_address_line_2.label")}
											</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t(
														"fields.business_address_line_2.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.business_address_line_2.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="business_city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.business_city.label")}</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t("fields.business_city.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.business_city.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="business_state"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("fields.business_state.label")}</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t("fields.business_state.placeholder")}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.business_state.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="business_kifle_ketema"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("fields.business_kifle_ketema.label")}
											</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder={t(
														"fields.business_kifle_ketema.placeholder"
													)}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												{t("fields.business_kifle_ketema.description")}
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</fieldset>

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
