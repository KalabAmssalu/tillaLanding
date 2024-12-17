"use client";

import Image from "next/image";
import { forwardRef, useMemo, useState } from "react";

import Field from "@/components/shared/field/Field";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/files";
import { useAppSelector } from "@/hooks/storehooks";

interface PersonalInfoProps {
	onConfirm: () => void;
	isSelf: boolean;
	ref: React.RefObject<HTMLDivElement>;
}

// eslint-disable-next-line react/display-name
const Preview = forwardRef<HTMLDivElement, PersonalInfoProps>(
	({ onConfirm, isSelf }, ref) => {
		const data = useAppSelector((state) => state.member.memberSlice);
		const [memberselfs, setMemberselfs] = useState(isSelf);
		const displayedData = useMemo(() => {
			if (!data) return null;

			if (isSelf) {
				const {
					representative_first_name,
					representative_last_name,
					representative_middle_name,
					representative_gender,
					representative_date_of_birth,
					representative_marital_status,
					representative_mailing_address_line1,
					representative_country,
					representative_street_address,
					representative_city,
					representative_region,
					representative_kifle_ketema,
					representative_phone_number,
					representative_email_address,
					...Saved
				} = data;
				console.log(
					representative_first_name,
					representative_last_name,
					representative_middle_name,
					representative_gender,
					representative_date_of_birth,
					representative_marital_status,
					representative_mailing_address_line1,
					representative_country,
					representative_street_address,
					representative_city,
					representative_region,
					representative_kifle_ketema,
					representative_phone_number,
					representative_email_address
				);
				return Saved;
			} else {
				return data;
			}
		}, [data]);

		const handlemodal = () => {
			// onIsOpenChange(true);
			onConfirm();
		};

		return (
			<>
				<div className="min-h-screen bg-gray-100 p-8 flex justify-center">
					{/* A4 size container */}
					<div
						className="bg-white w-[210mm] h-[297mm] shadow-lg p-12 relative"
						ref={ref}
					>
						<div className="border-b pb-6 mb-6">
							<h1 className="text-3xl font-bold text-gray-900">
								Member Information Preview
							</h1>
							<h2 className="text-md font-semibold text-gray-700 mt-2">
								{`${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}`}
							</h2>

							<h3 className="text-md text-gray-600 mt-1">
								{`${data.amharic_first_name || ""} ${data.amharic_middle_name || ""} ${data.amharic_last_name || ""}`}
							</h3>

							{!memberselfs && (
								<h3 className="text-md text-gray-600 mt-1">
									Representative :{" "}
									{`${data.representative_first_name || ""} ${data.representative_middle_name || ""} ${data.representative_last_name || ""}`}
								</h3>
							)}

							<div className="text-sm text-gray-500 mt-2">
								Document generated on {new Date().toLocaleDateString()}
							</div>
						</div>

						<Image
							src={IMAGES.blueLogo}
							width={60}
							alt={"logo"}
							className="absolute top-12 right-12"
						/>

						{/* Content Grid */}
						{displayedData ? (
							<div className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm">
								<div>
									<h2 className="text-lg font-semibold text-gray-900 mb-4">
										Basic Information
									</h2>
									<div className="space-y-3">
										{[
											"date_of_birth",
											"gender",
											"marital_status",
											"height",
											"weight",
											"tin_number",
										].map((key) => (
											<Field
												key={key}
												label={key}
												value={String(
													displayedData[key as keyof typeof displayedData] || ""
												)}
												local="personalInfoForm.fields"
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
											"phone_number",
											"email_address",
											"mailing_address_line1",
											"street_address",
											"city",
											"region",
											"country",
											"kifle_ketema",
										].map((key) => (
											<Field
												key={key}
												label={key}
												value={String(
													displayedData[key as keyof typeof displayedData] || ""
												)}
												local="personalInfoForm.fields"
											/>
										))}
									</div>
								</div>
								{/* Representative Information Section */}

								{!memberselfs && (
									<div>
										<h2 className="text-lg font-semibold text-gray-900 mb-4">
											Representative Information
										</h2>
										<div className="space-y-3">
											{[
												"representative_first_name",
												"representative_middle_name",
												"representative_last_name",
												"representative_phone_number",
												"representative_email_address",
											].map((key) => (
												<Field
													key={key}
													label={key}
													value={String(
														displayedData[key as keyof typeof displayedData] ||
															""
													)}
													local="personalInfoForm.fields"
												/>
											))}
										</div>
									</div>
								)}
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
					</div>
				</div>
			</>
		);
	}
);

export default Preview;
