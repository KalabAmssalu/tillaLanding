"use client";

import { useState } from "react";

import FormStepper from "@/components/shared/Stepper/FormStepper";

import Preview from "../preview";
import { PersonalInfo } from "./PersonalInfo";

export default function MemberRegForm() {
	const [nextActive, setNextActive] = useState(false);

	const steps = [
		{
			title: "Personal Information",
			content: (
				<PersonalInfo
					onFormComplete={() => setNextActive(true)}
					active={nextActive}
				/>
			),
		},
		{
			title: "Preview",
			content: (
				<div className="space-y-4">
					<Preview
						onFormComplete={() => setNextActive(true)}
						active={nextActive}
					/>
				</div>
			),
		},
	];

	return (
		<main className="container mx-auto p-4 flex items-center flex-col justify-center">
			<h1 className="text-2xl font-bold mb-6 text-center">
				Member Registration Form
			</h1>
			<FormStepper steps={steps} nextActive={nextActive} />
			<p className="w-[70%] text-center mt-20 border-primary py-32 border-t-2">
				The Tilla Health Insurance Registration Form is designed to capture
				essential details from applicants for seamless onboarding. The form
				ensures data accuracy, security, and user-friendliness, accommodating
				individuals, families, or businesses.
			</p>
		</main>
	);
}
