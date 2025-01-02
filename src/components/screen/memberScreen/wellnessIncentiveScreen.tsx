"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WellnessIncentiveScreen() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
			<article className="container max-w-4xl mx-auto px-4 py-12">
				<motion.h1
					className="text-4xl font-bold text-center mb-6 text-primary"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Tilla Health Cares About Your Wellness
				</motion.h1>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					id="introduction"
				>
					<p className="text-muted-foreground text-xl leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
						At Tilla Health, we believe in the importance of your health and
						well-being. It is essential that you and your family members
						complete yearly physical exams. To encourage wellness screenings,
						Tilla Health offers incentives to support your preventive care.
						These incentives will be provided through a Tilla Health Prepaid
						Mastercard®.
					</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					id="introduction"
				>
					<p className="text-muted-foreground text-xl mb-6 leading-relaxed ">
						Regular screening tests and immunizations play a vital role in
						keeping you and your family healthy. Without these screenings,
						potential health issues may go undetected. Don’t worry—Tilla Health
						is here to assist you!
					</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					id="introduction"
				>
					<p className="text-muted-foreground text-xl leading-relaxed mb-12 ">
						Our dedicated Outreach team can help you and your family schedule
						these important appointments with your doctor. Once you or your
						child completes any of the services listed above, you may be
						eligible to receive a prepaid card.
					</p>
				</motion.div>

				<h2 className="text-2xl font-semibold text-center mb-4">
					Eligible Services
				</h2>

				<div className="grid md:grid-cols-3 gap-6 mb-12">
					{[
						" Yearly physicals",
						"Well-child visits",
						"Lead testing",
						"Mammograms",
						"Diabetic testing",
						"Prenatal appointments",
					].map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
						>
							<Card className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
								<CardHeader>
									<div className="text-4xl text-primary mb-4">
										{/* {feature.icon} */}
									</div>
									<CardTitle className="text-xl font-semibold mb-2">
										{feature}
									</CardTitle>
								</CardHeader>
								<CardContent></CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</article>
		</div>
	);
}
