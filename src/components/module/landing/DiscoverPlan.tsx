"use Client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { planData } from "@/constants/data/planData";

export default function DiscoverPlans() {
	const descRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".desc-animate", {
				y: 30,
				opacity: 0,
				duration: 3,
				stagger: 0.2,
				ease: "power3.out",
			});
		}, descRef);

		return () => ctx.revert();
	}, []);

	return (
		<section className="py-12 " ref={descRef}>
			<div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
					Discover your plan
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
					{planData.map((plan, index) => (
						<Card
							key={index}
							className="border-none desc-animate shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
						>
							<CardContent className="p-6">
								<div className="mb-4">
									<Image
										src={plan.image}
										alt=""
										width={64}
										height={64}
										className="w-16 h-16"
									/>
								</div>
								<Link
									href={plan.link as `/${string}`}
									className="inline-flex items-center gap-2 text-xl font-semibold text-primary mb-3 hover:underline"
								>
									{plan.title}
									<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
								</Link>
								<p className="text-muted-foreground">{plan.description}</p>
							</CardContent>
						</Card>
					))}
				</div>

				{/* <div className="flex flex-wrap justify-center gap-4">
					<Button
						variant="default"
						className="bg-primary hover:bg-secondary px-8"
					>
						Find care
					</Button>
					<Button variant="outline" className="border-primary">
						Find medicine
					</Button>
				</div> */}
			</div>
		</section>
	);
}
