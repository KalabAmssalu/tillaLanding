"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import Confetti from "react-confetti";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const RegistrationSuccess = () => {
	const route = useRouter();
	const [windowDimension, setWindowDimension] = useState({
		width: 0,
		height: 0,
	});
	const [confettiShouldStop, setConfettiShouldStop] = useState(false);

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
							Registration Successful!
						</h1>
						<p className="text-xl mb-8">
							Congratulations! You&apos;re now part of Tilla Health Providers.
						</p>
						<div className="flex justify-center space-x-4">
							<Button variant="outline" onClick={() => route.push("/home")}>
								Go to Dashboard
							</Button>
						</div>
					</motion.div>
				</CardContent>
			</Card>
		</div>
	);
};

export default RegistrationSuccess;
