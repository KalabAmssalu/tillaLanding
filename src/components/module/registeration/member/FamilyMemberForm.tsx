"use client";

import { useState } from "react";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type FamilyMember = {
	relationship: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	amharic_first_name: string;
	amharic_last_name: string;
	amharic_middle_name: string;
	gender: string;
	date_of_birth: string;
	phone_number: string;
	email_address: string;
};

const initialMemberState: FamilyMember = {
	relationship: "",
	first_name: "",
	last_name: "",
	middle_name: "",
	amharic_first_name: "",
	amharic_last_name: "",
	amharic_middle_name: "",
	gender: "",
	date_of_birth: "",
	phone_number: "",
	email_address: "",
};

export default function FamilyMemberForm() {
	const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
	const [currentMember, setCurrentMember] =
		useState<FamilyMember>(initialMemberState);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCurrentMember((prev) => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name: string) => (value: string) => {
		setCurrentMember((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddMember = () => {
		if (currentMember.first_name && currentMember.last_name) {
			setFamilyMembers([...familyMembers, currentMember]);
			setCurrentMember(initialMemberState);
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			<Card>
				<CardHeader>
					<CardTitle>Add Family Member</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="relationship">Relationship</Label>
								<Select
									value={currentMember.relationship}
									onValueChange={handleSelectChange("relationship")}
								>
									<SelectTrigger id="relationship">
										<SelectValue placeholder="Select relationship" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="spouse">Spouse</SelectItem>
										<SelectItem value="child">Child</SelectItem>
										<SelectItem value="parent">Parent</SelectItem>
										<SelectItem value="sibling">Sibling</SelectItem>
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="gender">Gender</Label>
								<Select
									value={currentMember.gender}
									onValueChange={handleSelectChange("gender")}
								>
									<SelectTrigger id="gender">
										<SelectValue placeholder="Select gender" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="male">Male</SelectItem>
										<SelectItem value="female">Female</SelectItem>
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="first_name">First Name</Label>
								<Input
									id="first_name"
									name="first_name"
									value={currentMember.first_name}
									onChange={handleInputChange}
									placeholder="Enter first name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="middle_name">Middle Name</Label>
								<Input
									id="middle_name"
									name="middle_name"
									value={currentMember.middle_name}
									onChange={handleInputChange}
									placeholder="Enter middle name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="last_name">Last Name</Label>
								<Input
									id="last_name"
									name="last_name"
									value={currentMember.last_name}
									onChange={handleInputChange}
									placeholder="Enter last name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="amharic_first_name">Amharic First Name</Label>
								<Input
									id="amharic_first_name"
									name="amharic_first_name"
									value={currentMember.amharic_first_name}
									onChange={handleInputChange}
									placeholder="Enter Amharic first name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="amharic_middle_name">Amharic Middle Name</Label>
								<Input
									id="amharic_middle_name"
									name="amharic_middle_name"
									value={currentMember.amharic_middle_name}
									onChange={handleInputChange}
									placeholder="Enter Amharic middle name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="amharic_last_name">Amharic Last Name</Label>
								<Input
									id="amharic_last_name"
									name="amharic_last_name"
									value={currentMember.amharic_last_name}
									onChange={handleInputChange}
									placeholder="Enter Amharic last name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="date_of_birth">Date of Birth</Label>
								<Input
									id="date_of_birth"
									name="date_of_birth"
									type="date"
									value={currentMember.date_of_birth}
									onChange={handleInputChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="phone_number">Phone Number</Label>
								<Input
									id="phone_number"
									name="phone_number"
									value={currentMember.phone_number}
									onChange={handleInputChange}
									placeholder="Enter phone number"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email_address">Email Address</Label>
								<Input
									id="email_address"
									name="email_address"
									type="email"
									value={currentMember.email_address}
									onChange={handleInputChange}
									placeholder="Enter email address"
								/>
							</div>
						</div>
						<Button type="button" onClick={handleAddMember} className="w-full">
							Add Family Member
						</Button>
					</form>
				</CardContent>
			</Card>

			{familyMembers.length > 0 && (
				<Card className="mt-6">
					<CardHeader>
						<CardTitle>Family Members</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="space-y-4">
							{familyMembers.map((member, index) => (
								<li key={index} className="bg-secondary rounded p-4">
									<h3 className="font-bold text-lg mb-2">
										{member.first_name} {member.middle_name} {member.last_name}
									</h3>
									<p className="text-muted-foreground mb-1">
										Relationship: {member.relationship}
									</p>
									<p className="text-muted-foreground mb-1">
										Gender: {member.gender}
									</p>
									<p className="text-muted-foreground mb-1">
										Amharic Name: {member.amharic_first_name}{" "}
										{member.amharic_middle_name} {member.amharic_last_name}
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
		</div>
	);
}
