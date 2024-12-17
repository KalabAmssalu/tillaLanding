"use client";

import { useState } from "react";

import { format } from "date-fns";
import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FamilyInfoFormValues } from "@/types/memeber/memberValidation";

import FamilyMemberInfoForm from "./MemberFamilyForm";

interface FamilyMemberInfoFormProps {
	onFormComplete: (data: FamilyInfoFormValues[]) => void;
}

export default function FamilyMember({
	onFormComplete,
}: FamilyMemberInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const [familyMembers, setFamilyMembers] = useState<FamilyInfoFormValues[]>(
		[]
	);
	const [showForm, setShowForm] = useState(true);

	// const handleAddMember = (data: FamilyInfoFormValues) => {
	// 	setFamilyMembers([...familyMembers, data]);
	// 	setShowForm(false);
	// };
	// const handleSubmit = (data: FamilyInfoFormValues) => {
	// 	onFormComplete([...familyMembers, data]);
	// 	console.log("submitted family member", data);
	// 	setVisible(false);
	// };
	const handleAddMember = (data: FamilyInfoFormValues) => {
		setFamilyMembers((prevMembers) => [...prevMembers, data]);
		setShowForm(false);
	};
	const handleSubmit = () => {
		onFormComplete(familyMembers);
		console.log("submitted family members", familyMembers);
		setVisible(false);
	};

	const handleAddAnotherMember = () => {
		setShowForm(true);
	};

	return (
		<div className="p-4">
			{showForm ? (
				<FamilyMemberInfoForm onFormComplete={handleAddMember} />
			) : (
				<div className="flex justify-center mt-4">
					<Button onClick={handleAddAnotherMember} className="flex gap-2">
						Add Another Family Member
						<CirclePlus size={20} />
					</Button>
				</div>
			)}
			{familyMembers.length > 0 && (
				<Card className="my-6 ">
					<CardHeader>
						<CardTitle>Family Members</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-4">
							{familyMembers.map((member, index) => (
								<li key={index} className="bg-muted rounded p-4">
									<h3 className="font-bold text-lg mb-2">
										{member.first_name} {member.middle_name} {member.last_name}
									</h3>
									<p className="text-muted-foreground mb-1">
										Relationship: {member.relationship_to_member}
									</p>
									<p className="text-muted-foreground mb-1">
										Gender: {member.gender}
									</p>
									<p className="text-muted-foreground mb-1">
										Date of Birth:{" "}
										{member.date_of_birth
											? format(new Date(member.date_of_birth), "MMMM d, yyyy")
											: "Not provided"}
									</p>
									<p className="text-muted-foreground mb-1">
										Phone: {member.phone_number || "Not provided"}
									</p>
									<p className="text-muted-foreground">
										Email: {member.email_address || "Not provided"}
									</p>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			)}
			{visible && familyMembers.length > 0 && (
				<div className="flex w-full justify-end items-end">
					<Button
						type="submit"
						onClick={handleSubmit}
						className="bg-green-500 flex items"
					>
						Save and Continue
					</Button>
				</div>
			)}
		</div>
	);
}
