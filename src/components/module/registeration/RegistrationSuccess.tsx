"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";
import Confetti from "react-confetti";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { downloadFile } from "@/lib/utils/fileDownload";

const RegistrationSuccess = () => {
	const router = useRouter();
	const [windowDimension, setWindowDimension] = useState({
		width: 0,
		height: 0,
	});
	const [confettiShouldStop, setConfettiShouldStop] = useState(false);

	// Extract query parameters
	const { searchParams } = new URL(window.location.href);
	const type = searchParams.get("type") || "user";
	const title = searchParams.get("title") || "Registration Successful!";
	const message =
		searchParams.get("message") ||
		"Congratulations! You're now part of our platform.";
	const redirectPath = searchParams.get("redirectPath") || "/home";
	const buttonText = searchParams.get("buttonText") || "Go to Dashboard";

	const detectSize = () => {
		setWindowDimension({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		detectSize();
		window.addEventListener("resize", detectSize);
		const timer = setTimeout(() => setConfettiShouldStop(true), 5000);

		return () => {
			window.removeEventListener("resize", detectSize);
			clearTimeout(timer);
		};
	}, []);
	const handleDownloadPDF = () => {
		downloadFile(`${window.location.origin}/docs/company.xlsx`, "company.xlsx");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
			<Confetti
				width={windowDimension.width}
				height={windowDimension.height}
				recycle={!confettiShouldStop}
				numberOfPieces={200}
			/>
			<Card className="w-full max-w-lg">
				<CardContent className="p-6">
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 260, damping: 20 }}
						className="text-center"
					>
						<h1 className="text-4xl font-bold mb-6 text-gradient bg-clip-text text-primary">
							{title}
						</h1>
						<p className="text-xl mb-8">{message} .</p>
						<div className="flex justify-center space-x-4">
							{type === "ngo" || type === "private" ? (
								<Button
									variant={"default"}
									className="h-16 w-44 flex gap-4"
									onClick={() => handleDownloadPDF()}
								>
									<ArrowDownToLine size={20} />
									{buttonText}
								</Button>
							) : (
								<Button
									variant="outline"
									onClick={() => router.push(redirectPath as `/${string}`)}
								>
									{buttonText}
								</Button>
							)}
						</div>
					</motion.div>
				</CardContent>
			</Card>
		</div>
	);
};

export default RegistrationSuccess;
