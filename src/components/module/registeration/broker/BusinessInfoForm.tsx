"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

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
import { useAppSelector } from "@/hooks/storehooks";
import { formatToMMDDYYYY } from "@/lib/utils/dateUtils";
import {
	type BusinessInfoFormValues,
	createbusinessInfoSchema,
} from "@/types/broker/BrokerInfoType";

interface BusinessInfoFormProps {
	onFormComplete: (data: BusinessInfoFormValues) => void;
}

export default function BusinessInfoForm({
	onFormComplete,
}: BusinessInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("brokerInfoForm");
	const businessInfoSchema = createbusinessInfoSchema(t);
	const DataInfo = useAppSelector((state) => state.broker.brokerSlice);
	const form = useForm<BusinessInfoFormValues>({
		resolver: zodResolver(businessInfoSchema),
		defaultValues: {
			company_name: DataInfo.company_name || "",
			business_license_number: DataInfo.business_license_number || "",
			tax_identification_number: DataInfo.tax_identification_number || "",
			business_type: "Private",
			license_state: DataInfo.license_state || "",
			license_issued_date: DataInfo.license_issued_date || "",
			license_expired_date: DataInfo.license_expired_date || "",
		},
	});

	function onSubmit(data: BusinessInfoFormValues) {
		onFormComplete(data);
		setVisible(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md">
					<legend className="text-lg font-semibold">
						Business Information
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="company_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.company_name.label")}</FormLabel>
									<FormControl>
										<Input
											type="text"
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
											type="text"
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
							name="license_issued_date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.license_issued_date.label")}</FormLabel>
									<FormControl>
										<DateSelector
											selectedDate={
												field.value ? new Date(field.value) : undefined
											}
											onDateChange={(date) => {
												form.setValue(
													"license_issued_date",
													date ? formatToMMDDYYYY(date) : ""
												);
											}}
											placeholder={t("fields.license_issued_date.placeholder")}
											buttonClassName="custom-button-class"
										/>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.license_issued_date.description")}
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="license_state"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.license_state.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("fields.license_state.placeholder")}
											{...field}
											type="number"
										/>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.license_state.description")}
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="license_expired_date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("fields.license_expired_date.label")}
									</FormLabel>
									<FormControl>
										<DateSelector
											selectedDate={
												field.value ? new Date(field.value) : undefined
											}
											onDateChange={(date) => {
												form.setValue(
													"license_expired_date",
													date ? formatToMMDDYYYY(date) : ""
												);
											}}
											placeholder={t("fields.license_expired_date.placeholder")}
											buttonClassName="custom-button-class"
										/>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.license_expired_date.description")}
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="business_type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("fields.business_type.label")}</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) => {
												form.setValue(
													"business_type",
													value as "Private" | "Group" | "Sector"
												);
											}}
										>
											<SelectTrigger className="items-start [&_[data-description]]:hidden">
												<SelectValue
													placeholder={t("fields.business_type.placeholder")}
												/>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Private">
													<div className="flex items-start gap-3 text-muted-foreground">
														<p>{t("fields.business_type.options.Private")}</p>
													</div>
												</SelectItem>
												<SelectItem value="Group">
													<div className="flex items-start gap-3 text-muted-foreground">
														<p>{t("fields.business_type.options.Group")}</p>
													</div>
												</SelectItem>
												<SelectItem value="Sector">
													<div className="flex items-start gap-3 text-muted-foreground">
														<p>{t("fields.business_type.options.Sector")}</p>
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
									<FormDescription>
										{t("fields.business_type.description")}
									</FormDescription>
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
