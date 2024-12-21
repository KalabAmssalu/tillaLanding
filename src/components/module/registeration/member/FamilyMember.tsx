"use client";

import { useState } from "react";

import { format } from "date-fns";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks";
import {
	addFamilyMember,
	clearFamilyMembers,
	removeFamilyMember,
	setFamilyMemberSlice,
	updateFamilyMember,
} from "@/lib/store/redux/familyMemberSlice";
import { type FamilyInfoType } from "@/types/memeber/memeber";

import FamilyMemberInfoForm from "./MemberFamilyForm";

export default function FamilyMember({
	onFormComplete,
}: {
	onFormComplete: (data: FamilyInfoType[]) => void;
}) {
	const t = useTranslations("familyInfoForm");

	const dispatch = useAppDispatch();
	const familyMembers = useAppSelector(
		(state) => state.familyMember.familyMember
	);
	const [showForm, setShowForm] = useState(false);
	const [userData, setUserdata] = useState<FamilyInfoType>();

	const handleAddMember = (data: FamilyInfoType) => {
		if (userData) {
			handleUpdateMember(data); // Editing
		} else {
			dispatch(addFamilyMember(data)); // Adding
		}
		setShowForm(false);
	};

	// Submit all members and notify parent
	const handleSubmit = () => {
		dispatch(setFamilyMemberSlice(familyMembers));
		onFormComplete(familyMembers);
	};

	// Clear all members
	const handleClear = () => {
		setShowForm(false);
		dispatch(clearFamilyMembers());
	};

	// Open form to edit an existing member
	const handleEdit = (data: FamilyInfoType) => {
		setUserdata(data);
		setShowForm(true);
	};
	const handleDelete = (data: FamilyInfoType) => {
		const id = data.id ? data.id : "";
		dispatch(removeFamilyMember(id));
	};
	const handleUpdateMember = (updatedMember: FamilyInfoType) => {
		if (userData?.id) {
			dispatch(
				updateFamilyMember({ id: userData.id, updatedMember: updatedMember })
			);
		}
		setShowForm(false);
		setUserdata(undefined);
	};

	return (
		<div className="p-4">
			{familyMembers.length === 0 && !showForm ? (
				<div className="flex justify-center mt-4 h-[300px]">
					<Button onClick={() => setShowForm(true)} className="flex gap-2">
						{t("AddAFamilyMember")}
						<CirclePlus size={20} />
					</Button>
				</div>
			) : (
				<>
					{showForm && (
						<FamilyMemberInfoForm
							onFormComplete={handleAddMember}
							user={userData}
						/>
					)}

					{familyMembers.length > 0 && (
						<>
							{!showForm && (
								<div className="flex justify-center mt-4">
									<Button
										onClick={() => setShowForm(true)}
										className="flex gap-2"
									>
										{t("AddAnotherMember")}
										<CirclePlus size={20} />
									</Button>
								</div>
							)}
							<Card className="my-6">
								<CardHeader>
									<div className="flex items-center justify-between">
										<CardTitle>Family Members</CardTitle>
										<Button
											onClick={handleClear}
											className="flex gap-2"
											variant="destructive"
										>
											Remove All Family Members
											<Trash size={20} />
										</Button>
									</div>
								</CardHeader>
								<CardContent>
									<ul className="space-y-4">
										{familyMembers.map((member) => (
											<li key={member.id} className="bg-muted rounded p-4">
												<h3 className="font-bold text-lg mb-2">
													{member.first_name} {member.middle_name}{" "}
													{member.last_name}
												</h3>
												<p>Relationship: {member.relationship_to_member}</p>
												<p>Gender: {member.gender}</p>
												<p>
													Date of Birth:{" "}
													{member.date_of_birth
														? format(
																new Date(member.date_of_birth),
																"MMMM d, yyyy"
															)
														: "Not provided"}
												</p>
												<p>Phone: {member.phone_number || "Not provided"}</p>
												<p>Email: {member.email_address || "Not provided"}</p>
												<div className="flex justify-end gap-2">
													<Button
														onClick={() => handleEdit(member)}
														className="flex "
														variant={"outline"}
														size={"sm"}
													>
														<Pencil className="mr-2" size={12} />
														Edit
													</Button>
													<Button
														onClick={() => handleDelete(member)}
														className="flex "
														variant={"destructive"}
														size={"sm"}
													>
														<Trash className="mr-2" size={12} />
														Delete
													</Button>
												</div>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						</>
					)}

					{familyMembers.length > 0 && (
						<div className="flex w-full justify-end items-end mt-4">
							<Button
								type="submit"
								onClick={handleSubmit}
								className="bg-green-500"
							>
								Save and Continue
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
