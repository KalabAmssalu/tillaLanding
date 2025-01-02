"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowRight,
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Facebook,
	Linkedin,
	Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IMAGES } from "@/constants/files";

export interface Feature {
	icon: React.ReactNode;
	title: string;
	features: string[];
}

export interface BlogPostProps {
	title: string;
	headerImage: keyof typeof IMAGES;
	introduction: string;
	keyfeaturetitle: string;
	features: Feature[];
	whyChooseTitle: string;
	whyChoosePoints: string[];
	howToGetStarted: {
		title: string;
		steps: string[];
	};
	promiseSection: {
		title: string;
		content: string;
	};
	callToAction: {
		title: string;
		content: string;
		buttonText: string;
		buttonLink: string;
	};
}

export function BlogPost({
	title,
	headerImage,
	introduction,
	keyfeaturetitle,
	features,
	whyChooseTitle,
	whyChoosePoints,
	howToGetStarted,
	promiseSection,
	callToAction,
}: BlogPostProps) {
	const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
	const [activeSection, setActiveSection] = useState("");

	const toggleFeature = (index: number) => {
		setExpandedFeature(expandedFeature === index ? null : index);
	};

	const openFeatureModal = (feature: Feature) => {
		setSelectedFeature(feature);
		setIsModalOpen(true);
	};

	const sections = [
		{ title: "Introduction", id: "introduction" },
		{ title: keyfeaturetitle, id: "key-features" },
		{ title: whyChooseTitle, id: "why-choose" },
		{ title: howToGetStarted.title, id: "how-to-start" },
		{ title: promiseSection.title, id: "our-promise" },
		{ title: callToAction.title, id: "call-to-action" },
	];

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.5 }
		);

		sections.forEach((section) => {
			const element = document.getElementById(section.id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [sections]);

	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	const shareOnTwitter = () => {
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
			"_blank"
		);
	};

	const shareOnFacebook = () => {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
			"_blank"
		);
	};

	const shareOnLinkedIn = () => {
		window.open(
			`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
			"_blank"
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted">
			<article className="container max-w-4xl mx-auto px-4 py-12">
				{/* Table of Contents */}
				{/* <nav className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
					<h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
					<ul className="space-y-2">
						{sections.map((section) => (
							<motion.li
								key={section.id}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.3 }}
							>
								<a
									href={`#${section.id}`}
									className={`block py-1 px-2 rounded transition-colors duration-200 ${
										activeSection === section.id
											? "bg-primary text-primary-foreground"
											: "hover:bg-muted"
									}`}
								>
									{section.title}
								</a>
							</motion.li>
						))}
					</ul>
				</nav> */}

				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="relative h-[400px] mb-12 rounded-xl overflow-hidden shadow-2xl"
				>
					<Image
						src={IMAGES[headerImage]}
						alt={title}
						fill
						style={{ objectFit: "cover" }}
						className="brightness-75 transition-all duration-300 hover:scale-105 hover:brightness-100"
					/>
					<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
						<h1 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg px-4 tracking-tight">
							{title}
						</h1>
					</div>
				</motion.div>

				<Separator className="bg-primary/20 h-1 mb-8" />

				{/* Share Buttons */}
				<div className="flex justify-center space-x-4 mb-8">
					<Button variant="outline" size="icon" onClick={shareOnTwitter}>
						<Twitter className="h-4 w-4" />
						<span className="sr-only">Share on Twitter</span>
					</Button>
					<Button variant="outline" size="icon" onClick={shareOnFacebook}>
						<Facebook className="h-4 w-4" />
						<span className="sr-only">Share on Facebook</span>
					</Button>
					<Button variant="outline" size="icon" onClick={shareOnLinkedIn}>
						<Linkedin className="h-4 w-4" />
						<span className="sr-only">Share on LinkedIn</span>
					</Button>
				</div>

				{/* Introduction Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					id="introduction"
				>
					<p className="text-muted-foreground text-xl leading-relaxed mb-12 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
						{introduction}
					</p>
				</motion.div>

				{/* Top Features Section */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className="text-3xl font-semibold mb-6 text-primary text-center"
					id="key-features"
				>
					{keyfeaturetitle}
				</motion.h2>
				<div className="grid md:grid-cols-3 gap-6 mb-12">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
						>
							<Card
								className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
								onClick={() => openFeatureModal(feature)}
							>
								<CardHeader>
									<div className="text-4xl text-primary mb-4">
										{feature.icon}
									</div>
									<CardTitle className="text-xl font-semibold mb-2">
										{feature.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<Button
										variant="ghost"
										className="w-full justify-between"
										onClick={(e) => {
											e.stopPropagation();
											toggleFeature(index);
										}}
									>
										{expandedFeature === index
											? "Hide Details"
											: "Show Details"}
										{expandedFeature === index ? (
											<ChevronUp className="ml-2 h-4 w-4" />
										) : (
											<ChevronDown className="ml-2 h-4 w-4" />
										)}
									</Button>
									<AnimatePresence>
										{expandedFeature === index && (
											<motion.ul
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												className="space-y-2 mt-4"
											>
												{feature.features.map((item, idx) => (
													<motion.li
														key={idx}
														initial={{ opacity: 0, x: -20 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ delay: idx * 0.1 }}
														className="flex items-start"
													>
														<CheckCircle className="h-5 w-5 text-secondary mr-2 mt-1 flex-shrink-0" />
														<span className="text-card-foreground">{item}</span>
													</motion.li>
												))}
											</motion.ul>
										)}
									</AnimatePresence>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>

				{/* Why Choose Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.5 }}
					id="why-choose"
				>
					<Card className="bg-muted shadow-inner mb-12">
						<CardHeader>
							<CardTitle className="text-3xl font-semibold text-primary">
								{whyChooseTitle}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-4">
								{whyChoosePoints.map((item, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
										className="flex items-start"
									>
										<CheckCircle className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
										<span className="text-card-foreground text-lg">{item}</span>
									</motion.li>
								))}
							</ul>
						</CardContent>
					</Card>
				</motion.div>

				{/* How to Get Started Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.5 }}
					id="how-to-start"
				>
					<h2 className="text-3xl font-semibold mb-6 text-primary">
						{howToGetStarted.title}
					</h2>
					<ol className="list-none mb-8 space-y-4">
						{howToGetStarted.steps.map((step, index) => (
							<motion.li
								key={index}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
								className="flex items-center"
							>
								<span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">
									{index + 1}
								</span>
								<span className="text-muted-foreground text-lg">{step}</span>
							</motion.li>
						))}
					</ol>
				</motion.div>

				{/* Promise Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.5 }}
					id="our-promise"
				>
					<Card className="bg-card shadow-lg mb-12">
						<CardHeader>
							<CardTitle className="text-3xl font-semibold text-primary">
								{promiseSection.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-card-foreground text-lg leading-relaxed">
								{promiseSection.content}
							</p>
						</CardContent>
					</Card>
				</motion.div>

				{/* Call to Action Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.1, duration: 0.5 }}
					className="text-center bg-primary text-primary-foreground rounded-xl p-8 shadow-2xl"
					id="call-to-action"
				>
					<h2 className="text-3xl font-semibold mb-4">{callToAction.title}</h2>
					<p className="text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
						{callToAction.content}
					</p>
					<Button
						asChild
						size="lg"
						variant="secondary"
						className="font-semibold text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform duration-300"
					>
						<a
							href={callToAction.buttonLink}
							className="inline-flex items-center"
						>
							{callToAction.buttonText}
							<ArrowRight className="ml-2 h-5 w-5" />
						</a>
					</Button>
				</motion.div>
			</article>

			{/* Feature Modal */}
			<Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{selectedFeature?.title}</DialogTitle>
						<DialogDescription>
							Explore the details of this feature
						</DialogDescription>
					</DialogHeader>
					<div className="mt-4">
						<ul className="space-y-2">
							{selectedFeature?.features.map((item, index) => (
								<li key={index} className="flex items-start">
									<CheckCircle className="h-5 w-5 text-secondary mr-2 mt-1 flex-shrink-0" />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
