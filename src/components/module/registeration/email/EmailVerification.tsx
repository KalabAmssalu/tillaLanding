"use client";

import { useState } from "react";

import { DialogTitle } from "@radix-ui/react-dialog";
import { ArrowRight, Mail, Send } from "lucide-react";

import { useSendOTP, useVerifyOTP } from "@/actions/Query/user_Query/request";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

export default function EmailVerification({
	isOpen,
	onVerificationComplete,
}: {
	isOpen: boolean;
	onVerificationComplete: () => void;
}) {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [step, setStep] = useState("email"); // 'email' or 'otp'

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const { mutate: sendOTP } = useSendOTP();
	const { mutate: verifyOTP } = useVerifyOTP();

	const handleSendCode = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate sending code
		console.log("email", email);
		await sendOTP(email);
		// await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		setStep("otp");
	};
	const handleOtpChange = (value: string) => {
		setOtp(value);
	};

	const handleVerifyOtp = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		console.log("otp", otp);
		// Simulate OTP verification
		const verify = { email, otp_code: otp };
		await verifyOTP(verify, {
			onSuccess: (data) => {
				console.log("data", data);
				onVerificationComplete();
			},
			onError: (error) => {
				console.error("Error verifying OTP:", error);
			},
		});
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setIsSubmitting(false);
	};

	return (
		<Dialog open={isOpen}>
			<DialogContent className="sm:max-w-md">
				<Card className="border-0 shadow-none">
					<DialogTitle>
						<CardTitle className="text-2xl font-bold text-center">
							Verify Your Email
						</CardTitle>
						<CardDescription className="text-center">
							{step === "email"
								? "Enter your email to receive a verification code"
								: "We've sent a code to your email. Please enter it below."}
						</CardDescription>
					</DialogTitle>
					<CardContent>
						{step === "email" ? (
							<form onSubmit={handleSendCode}>
								<div className="flex justify-center my-6">
									<Mail className="h-12 w-12 text-primary" />
								</div>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="email">Email address</Label>
										<Input
											id="email"
											type="email"
											placeholder="Enter your email"
											value={email}
											onChange={handleEmailChange}
											required
										/>
									</div>
									<Button
										type="submit"
										className="w-full"
										disabled={!email || isSubmitting}
									>
										{isSubmitting ? "Sending..." : "Send Verification Code"}
										<Send className="ml-2 h-4 w-4" />
									</Button>
								</div>
							</form>
						) : (
							<form onSubmit={handleVerifyOtp}>
								<div className="flex justify-center my-6">
									<Mail className="h-12 w-12 text-primary" />
								</div>
								<div className="flex justify-center space-x-2 mb-6">
									<InputOTP
										maxLength={6}
										value={otp}
										onChange={handleOtpChange}
										disabled={isSubmitting}
										className="gap-2 sm:gap-4"
									>
										<InputOTPGroup className="w-full">
											{[0, 1, 2, 3, 4, 5].map((index) => (
												<InputOTPSlot
													key={index}
													index={index}
													className="sm:w-14 sm:h-14 text-2xl sm:text-3xl"
												/>
											))}
										</InputOTPGroup>
									</InputOTP>
								</div>
								<Button
									type="submit"
									className="w-full"
									disabled={otp.length !== 6 || isSubmitting}
								>
									{isSubmitting ? "Verifying..." : "Verify Email"}
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</form>
						)}
					</CardContent>
					<CardFooter className="justify-center">
						{step === "otp" && (
							<p className="text-sm text-muted-foreground">
								Didn&apos;t receive the code?{" "}
								<a
									href="#"
									className="text-primary hover:underline"
									onClick={() => setStep("email")}
								>
									Resend
								</a>
							</p>
						)}
					</CardFooter>
				</Card>
			</DialogContent>
		</Dialog>
	);
}
