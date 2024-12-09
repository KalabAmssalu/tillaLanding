"use client";

import Image from "next/image";
import { forwardRef, useMemo } from "react";

import Field from "@/components/shared/field/Field";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/files";
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks";
import { ClearProviderSlice } from "@/lib/store/redux/providerSlice";

interface PersonalInfoProps {
	onConfirm: () => void;
	ref: React.RefObject<HTMLDivElement>;
}

// eslint-disable-next-line react/display-name
const Preview = forwardRef<HTMLDivElement, PersonalInfoProps>(
	({ onConfirm }, ref) => {
		const data = useAppSelector((state) => state.provider.providerSlice);
		const dispatch = useAppDispatch();
		const displayedData = useMemo(() => {
			if (!data) return null;

			if (data.provider_service_type === "institute") {
				const {
					provider_first_name,
					provider_last_name,
					provider_middle_initial,
					provider_title,
					provider_first_name_amharic,
					provider_last_name_amharic,
					provider_middle_initial_amharic,
					provider_gender,
					...Saved
				} = data;
				console.log(
					provider_first_name_amharic,
					provider_last_name_amharic,
					provider_middle_initial_amharic,
					provider_first_name,
					provider_last_name,
					provider_middle_initial,
					provider_title,
					provider_gender
				);
				return Saved;
			} else {
				const { institute_name, ...Saved } = data;
				console.log(institute_name);
				return Saved;
			}
		}, [data]);
		const handlemodal = () => {
			// onIsOpenChange(true);
			onConfirm();
		};
		const handleClear = () => {
			dispatch(ClearProviderSlice());
		};
		return (
			<>
				<div className="min-h-screen bg-gray-100 p-8 flex justify-center">
					{/* A4 size container - 210mm x 297mm */}
					<div
						className="bg-white w-[210mm] h-[297mm] shadow-lg p-12 relative"
						ref={ref}
					>
						<div className="border-b pb-6 mb-6">
							<h1 className="text-3xl font-bold text-gray-900">
								Provider Information Preview
							</h1>
							{data.provider_service_type !== "institute" && (
								<h2 className="text-md font-semibold text-gray-700 mt-2">
									{`${data.provider_title || ""} ${data.provider_first_name || ""} ${data.provider_middle_initial || ""} ${data.provider_last_name || ""}`}
								</h2>
							)}
							{data.provider_service_type !== "institute" &&
								(data.provider_first_name_amharic ||
									data.provider_last_name_amharic ||
									data.provider_middle_initial_amharic) && (
									<h3 className="text-md text-gray-600 mt-1">
										{`${data.provider_first_name_amharic || ""} ${data.provider_middle_initial_amharic || ""} ${data.provider_last_name_amharic || ""}`}
									</h3>
								)}
							{data.provider_service_type === "institute" && (
								<h3 className="text-md text-gray-600 mt-1">
									{data.institute_name}
								</h3>
							)}
							<div className="text-sm text-gray-500 mt-2">
								Document generated on {new Date().toLocaleDateString()}
							</div>
						</div>
						<Image
							src={IMAGES.OrginalLogo}
							width={60}
							alt={"logo"}
							className="absolute top-12 right-12"
						/>
						{/* Content Grid */}
						{displayedData ? (
							<div className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm">
								<div className="space-y-6">
									<div>
										<h2 className="text-lg font-semibold text-gray-900 mb-4">
											Basic Information
										</h2>
										<div className="space-y-3">
											{data.provider_service_type === "professional"
												? [
														"tin_number",
														"provider_id",
														"provider_service_type",
														"provider_gender",
														"provider_date_of_birth",
													].map((key) => (
														<Field
															key={key}
															label={key}
															value={String(
																displayedData[key as keyof typeof displayedData]
															)}
															local="providerInfoForm.fields"
														/>
													))
												: [
														"tin_number",
														"provider_id",
														"institute_name",
														"provider_service_type",
													].map((key) => (
														<Field
															key={key}
															label={key}
															value={String(
																displayedData[key as keyof typeof displayedData]
															)}
															local="providerInfoForm.fields"
														/>
													))}
										</div>
									</div>

									<div>
										<h2 className="text-lg font-semibold text-gray-900 mb-4">
											Contact Information
										</h2>
										<div className="space-y-3">
											{[
												"provider_email",
												"provider_phone_number",
												"provider_fax",
												"provider_contact_person",
												"provider_contact_email",
												"provider_contact_phone_number",
											].map((key) => (
												<Field
													key={key}
													label={key}
													value={String(
														displayedData[key as keyof typeof displayedData]
													)}
													local="providerInfoForm.fields"
												/>
											))}
										</div>
									</div>
								</div>

								<div className="space-y-4">
									<div>
										<h2 className="text-lg font-semibold text-gray-900 mb-4">
											Address
										</h2>
										<div className="space-y-3 ">
											{[
												"provider_address",
												"provider_address_line2",
												"provider_city",
												"provider_region",
												"provider_country",
												"provider_kifle_ketema",
												"provider_zip_code",
											].map((key) => (
												<Field
													key={key}
													label={key}
													value={String(
														displayedData[key as keyof typeof displayedData]
													)}
													local="providerInfoForm.fields"
												/>
											))}
										</div>
									</div>

									<div>
										<h2 className="text-lg font-semibold text-gray-900 mb-4">
											Professional Details
										</h2>
										<div className="space-y-3">
											{[
												"provider_type",
												"provider_primary_specialty",
												"provider_sub_specialty",
												"provider_health_tier",
												"provider_health_sub_tier",
												"provider_discount_agreement",
											].map((key) => (
												<Field
													key={key}
													label={key}
													value={String(
														displayedData[key as keyof typeof displayedData]
													)}
													local="providerInfoForm.fields"
												/>
											))}
										</div>
									</div>
								</div>

								<div className="col-span-2 mt-2">
									<h2 className="text-lg font-semibold text-gray-900 mb-4">
										Group Information
									</h2>
									<div className="grid grid-cols-2 gap-x-6 gap-y-3">
										{[
											"provider_group_name",
											"provider_group_contact_person",
											"provider_group_phone_number",
											"provider_group_address",
											"provider_group_contact_email",
										].map((key) => (
											<Field
												key={key}
												label={key}
												value={String(
													displayedData[key as keyof typeof displayedData]
												)}
												local="providerInfoForm.fields"
											/>
										))}
									</div>
								</div>
							</div>
						) : (
							<p>No data available to preview.</p>
						)}

						{/* Footer */}
						<div className="absolute bottom-8 left-12 right-12 text-xs text-gray-400 border-t pt-4">
							<div className="flex justify-between">
								<span>Generated by Tilla Health Insurance Provider System</span>
								<span>Page 1 of 1</span>
							</div>
						</div>
					</div>
					{/* Submit Button */}
					<div className="absolute bottom-20 right-12">
						<Button
							onClick={handlemodal}
							className="bg-green-500 hover:bg-green-600 text-white"
						>
							Confirm
						</Button>
						<Button
							onClick={() => handleClear()}
							className="bg-red-500 flex items"
						>
							Clear
						</Button>
					</div>
				</div>
			</>
		);
	}
);

export default Preview;
