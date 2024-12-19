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
	isFamily: boolean;
	ref: React.RefObject<HTMLDivElement>;
}

// eslint-disable-next-line react/display-name
const Preview = forwardRef<HTMLDivElement, PersonalInfoProps>(
	({ onConfirm, isSelf, isFamily }, ref) => {
		const data = useAppSelector((state) => state.member.memberSlice);
		const familyData = useAppSelector((state) => state.family.familyMembers);
		const [memberselfs, setMemberselfs] = useState(isSelf);
		const repLocal = isFamily
			? "familyInfoForm.fields"
			: "personalInfoForm.fields";

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
				return Saved;
			} else {
				return data;
			}
		}, [data]);

		const handlemodal = () => {
			onConfirm();
		};

		return (
			<div className="min-h-screen bg-gray-100 p-8 flex justify-center">
				{/* A4 size container */}
				<div
					className="bg-white w-[210mm] h-[297mm] shadow-lg p-12 relative overflow-hidden"
					ref={ref}
				>
					<div className="border-b pb-6 mb-6">
						<h1 className="text-3xl font-bold text-gray-900">
							{isFamily
								? "Family Member Information Preview"
								: "Member Information Preview"}
						</h1>
						<h2 className="text-md font-semibold text-gray-700 mt-2">
							{`${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}`}
						</h2>

						{!memberselfs && (
							<h3 className="text-md text-gray-600 mt-1">
								{isFamily ? "Primary Member" : "Representative"} :{" "}
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
						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 text-sm mt-6">
							{/* Basic Information */}
							{!isFamily && (
								<>
									<div>
										<h2 className="text-lg font-semibold text-gray-900 mb-4 text-sm">
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
														displayedData[key as keyof typeof displayedData] ||
															""
													)}
													local="personalInfoForm.fields"
												/>
											))}
										</div>
									</div>

									{/* Contact Information */}
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
														displayedData[key as keyof typeof displayedData] ||
															""
													)}
													local="personalInfoForm.fields"
												/>
											))}
										</div>
									</div>
								</>
							)}

							{/* Representative Information Section */}
							{!memberselfs && (
								<div>
									<h2 className="text-lg font-semibold text-gray-900 mb-4">
										{isFamily
											? "Primary Member Information"
											: "Representative Information"}
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
													displayedData[key as keyof typeof displayedData] || ""
												)}
												local={repLocal}
											/>
										))}
									</div>
								</div>
							)}
						</div>
					) : (
						<p>No data available to preview.</p>
					)}
					{/* Family Member Table */}
					{isFamily && familyData && familyData.length > 0 && (
						<>
							<div className="mt-12">
								<h2 className="text-xl font-bold text-gray-800 mb-4">
									Family Member Information
								</h2>
								<div className="overflow-x-auto">
									<table className="w-full text-left border-collapse">
										<thead>
											<tr className="bg-primary">
												<th className="px-1 border-r-2 border-white  py-2 text-xs font-medium text-white uppercase">
													First Name
												</th>
												<th className="px-2 border-r-2 border-white  py-2 text-xs font-medium text-white uppercase">
													Middle Name
												</th>
												<th className="px-2 border-r-2 border-white  py-2 text-xs font-medium text-white uppercase">
													Last Name
												</th>
												<th className="px-2 border-r-2 border-white  py-2 text-xs font-medium text-white uppercase">
													Relationship
												</th>

												<th className="px-2 border-r-2 border-white  py-2 text-xs font-medium text-white uppercase">
													Phone
												</th>
												<th className="px-2 border-r-2 border-white  py-2 text-xs font-medium text-white uppercase">
													Email
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{familyData.map((member, index) => (
												<tr key={index} className="hover:bg-gray-50">
													<td className="pr-3 py-2 text-sm">
														{member.first_name}
													</td>
													<td className="pr-3 py-2 text-sm">
														{member.middle_name}{" "}
													</td>
													<td className="pr-3 py-2 text-sm">
														{member.last_name}
													</td>
													<td className="px-3 py-2 text-sm">
														{member.relationship_to_member}
													</td>

													<td className="px-3 py-2 text-sm">
														{member.phone_number}
													</td>
													<td className="px-3 py-2 text-sm">
														{member.email_address}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</>
					)}

					{/* Footer */}
					<div className="absolute bottom-8 left-8 right-8 text-xs text-gray-400 border-t pt-4">
						<div className="flex justify-between">
							<span>Generated by Tilla Health Insurance Provider System</span>
							<span>Page 1 of 1</span>
						</div>
					</div>
				</div>

				{/* Submit Button */}
				<div className="absolute bottom-20 right-12 ">
					<Button
						onClick={handlemodal}
						className="bg-green-500 hover:bg-green-600 text-white"
					>
						Confirm
					</Button>
				</div>
			</div>
		);
	}
);

export default Preview;
