"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	QuestionnaireformSchema,
	type QuestionnaireformSchemaValues,
} from "@/types/memeber/memberValidation";

export default function HealthQuestionnaire({
	onFormComplete,
}: {
	onFormComplete: (data: QuestionnaireformSchemaValues) => void;
}) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("Questionnaire");
	const questionnaireSchema = QuestionnaireformSchema(t);
	const form = useForm<QuestionnaireformSchemaValues>({
		resolver: zodResolver(questionnaireSchema),
		defaultValues: {
			familyHistory: [],
			currentConditions: [],
			preventiveHealth: [],
		},
	});

	function onSubmit(values: QuestionnaireformSchemaValues) {
		onFormComplete(values);
		console.log(values);
	}

	return (
		<div className="container mx-auto pb-10">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>{t("memberQuestionnaire")}</CardTitle>
							<CardDescription>{t("helpUsUnderstand")}</CardDescription>
							<p className="text-sm text-muted-foreground"></p>
						</CardHeader>
					</Card>

					{/* Family Medical History */}
					<Card>
						<CardHeader>
							<CardTitle>{t("familyMedicalHistory")}</CardTitle>
						</CardHeader>
						<CardContent className="gap-6 grid grid-cols-2">
							<FormField
								control={form.control}
								name="familyHistory"
								render={() => (
									<FormItem>
										<div className="mb-4">
											<FormLabel>1. {t("familyHistoryQuestion")}</FormLabel>
										</div>
										<div className="grid gap-4 pl-6">
											{[
												"Heart Disease",
												"Diabetes",
												"Hypertension",
												"Cancer",
												"Stroke",
												"Mental Health Disorders",
											].map((item) => (
												<FormField
													key={item}
													control={form.control}
													name="familyHistory"
													render={({ field }) => (
														<FormItem className="flex flex-row items-start space-x-3 space-y-0">
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(item)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([
																					...(field.value || []),
																					item,
																				])
																			: field.onChange(
																					field.value?.filter(
																						(value) => value !== item
																					)
																				);
																	}}
																/>
															</FormControl>
															<FormLabel className="font-normal">
																{t(item)}
															</FormLabel>
														</FormItem>
													)}
												/>
											))}
										</div>
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="pt-4">
							<FormField
								control={form.control}
								name="cancerType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>2. {t("specifyType")}</FormLabel>
										<FormControl>
											<Input {...field} placeholder={t("enterCancerType")} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4">
							<FormField
								control={form.control}
								name="otherCondition"
								render={({ field }) => (
									<FormItem>
										<FormLabel>3. {t("otherCondition")}</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder={t("specifyOtherCondition")}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
					{/* Personal Medical History */}
					<Card>
						<CardHeader>
							<CardTitle>{t("personalMedicalHistory")}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<FormField
								control={form.control}
								name="currentConditions"
								render={() => (
									<FormItem>
										<div className="mb-4">
											<FormLabel>4. {t("currentConditionsQuestion")}</FormLabel>
										</div>
										<div className="grid gap-4">
											{[
												"Hypertension",
												"Diabetes",
												"Asthma or Respiratory Conditions",
												"Chronic Pain",
												"Mental Health Conditions",
											].map((item) => (
												<FormField
													key={item}
													control={form.control}
													name="currentConditions"
													render={({ field }) => (
														<FormItem className="flex flex-row items-start space-x-3 pl-6 space-y-0">
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(item)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([
																					...(field.value || []),
																					item,
																				])
																			: field.onChange(
																					field.value?.filter(
																						(value) => value !== item
																					)
																				);
																	}}
																/>
															</FormControl>
															<FormLabel className="font-normal">
																{t(item)}
															</FormLabel>
														</FormItem>
													)}
												/>
											))}
										</div>
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-4 grid grid-cols-2 gap-6">
							<FormField
								control={form.control}
								name="currentMedications.taking"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>5. {t("takingMedications")}</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-col ml-6 space-y-1"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="yes" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("yes")}
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="no" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("no")}
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>
							{form.watch("currentMedications.taking") === "yes" && (
								<FormField
									control={form.control}
									name="currentMedications.medications"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("listMedications")}</FormLabel>
											<FormControl>
												<Input {...field} placeholder={t("enterMedications")} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</CardContent>
					</Card>
					{/* Lifestyle Questions */}
					<Card>
						<CardHeader>
							<CardTitle>{t("lifestyleQuestions")}</CardTitle>
						</CardHeader>
						<CardContent className="gap-6 grid grid-cols-2">
							{/* Smoking */}

							<FormField
								control={form.control}
								name="lifestyle.smoking.smokes"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>6. {t("doYouSmoke")}</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-col space-y-1 ml-6"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="yes" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("yes")}
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="no" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("no")}
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>
							{form.watch("lifestyle.smoking.smokes") === "yes" && (
								<FormField
									control={form.control}
									name="lifestyle.smoking.amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("specifyAmount")}</FormLabel>
											<FormControl>
												<Input {...field} placeholder={t("enterAmount")} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{/* light, moderate, heavy */}
						</CardContent>
					</Card>
					<Card>
						<CardContent className="gap-6 pt-4 grid grid-cols-2">
							{/* Alcohol */}
							<FormField
								control={form.control}
								name="lifestyle.alcohol.drinks"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>7. {t("doYouDrinkAlcohol")}</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-col space-y-1 ml-6"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="yes" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("yes")}
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="no" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("no")}
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>
							{form.watch("lifestyle.alcohol.drinks") === "yes" && (
								<FormField
									control={form.control}
									name="lifestyle.alcohol.frequency"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("specifyFrequency")}</FormLabel>
											<FormControl>
												<Input {...field} placeholder={t("enterFrequency")} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardContent className="gap-6 pt-4 grid grid-cols-2">
							{/* Exercise */}
							<FormField
								control={form.control}
								name="lifestyle.exercise"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>8. {t("howOftenExercise")}</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-col space-y-1 ml-6"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="daily" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("daily")}
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="3-5_weekly" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("threeFiveTimes")}
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="rarely" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("rarely")}
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="none" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("none")}
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
					{/* Allergies */}
					<Card>
						<CardHeader>
							<CardTitle>{t("allergies")}</CardTitle>
						</CardHeader>
						<CardContent className="gap-6 grid grid-cols-2">
							<FormField
								control={form.control}
								name="allergies.hasAllergies"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>9. {t("anyAllergies")}</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-col space-y-1 ml-6"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="yes" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("yes")}
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="no" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("no")}
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>
							{form.watch("allergies.hasAllergies") === "yes" && (
								<FormField
									control={form.control}
									name="allergies.allergyList"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("listAllergies")}</FormLabel>
											<FormControl>
												<Input {...field} placeholder={t("enterAllergies")} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
						</CardContent>
					</Card>

					{/* Preventive Health */}
					<Card>
						<CardHeader>
							<CardTitle>{t("preventiveHealth")}</CardTitle>
						</CardHeader>
						<CardContent>
							<FormField
								control={form.control}
								name="preventiveHealth"
								render={() => (
									<FormItem>
										<div className="mb-4">
											<FormLabel>
												10. {t("preventiveScreeningsQuestion")}
											</FormLabel>
										</div>
										<div className="grid gap-4">
											{[
												"Annual Physical",
												"Blood Pressure Check",
												"Blood Sugar Test",
												"Cancer Screenings",
												"Dental Checkup",
												"Eye Exam",
											].map((item) => (
												<FormField
													key={item}
													control={form.control}
													name="preventiveHealth"
													render={({ field }) => (
														<FormItem className="flex flex-row items-start ml-6 space-x-3 space-y-0">
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(item)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([
																					...(field.value || []),
																					item,
																				])
																			: field.onChange(
																					field.value?.filter(
																						(value) => value !== item
																					)
																				);
																	}}
																/>
															</FormControl>
															<FormLabel className="font-normal">
																{t(item)}
															</FormLabel>
														</FormItem>
													)}
												/>
											))}
										</div>
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Women's Health */}
					<Card>
						<CardHeader>
							<CardTitle>{t("womensHealth")}</CardTitle>
						</CardHeader>
						<CardContent className="gap-6 grid grid-cols-2">
							<FormField
								control={form.control}
								name="womensHealth.pregnant"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>11. {t("pregnantOrPlanning")}</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-col space-y-1 ml-6"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="yes" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("yes")}
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="no" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("no")}
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="womensHealth.hadMammogram"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>12. {t("hadMammogramLastYear")}</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-col space-y-1 ml-6"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="yes" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("yes")}
													</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="no" />
													</FormControl>
													<FormLabel className="font-normal">
														{t("no")}
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
					<div className="flex justify-center items-center w-full">
						<Button type="submit" className="">
							{t("submitQuestionnaire")}
						</Button>
					</div>
					{visible && (
						<div className="flex w-full justify-end items-end">
							<Button type="submit" className="bg-green-500 flex items">
								Continue
							</Button>
						</div>
					)}
				</form>
			</Form>
		</div>
	);
}
