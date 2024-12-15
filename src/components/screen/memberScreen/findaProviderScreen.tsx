"use client";

import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Filter, Search } from "lucide-react";
import { useDebounce } from "use-debounce";

import { ProviderCard } from "@/components/module/Providercard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useProviders } from "@/hooks/useProviders";
import { Provider } from "@/types/card/Provider";

export default function FindProviderScreen() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedSpecialty, setSelectedSpecialty] = useState("All");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

	const { providers, isLoading, error } = useProviders();

	const specialties = [
		"All",
		...Array.from(new Set(providers.map((provider) => provider.specialty))),
	];

	const filteredProviders = useCallback(() => {
		return providers.filter((provider) => {
			const matchesSearch = provider.name
				.toLowerCase()
				.includes(debouncedSearchTerm.toLowerCase());
			const matchesSpecialty =
				selectedSpecialty === "All" || provider.specialty === selectedSpecialty;
			return matchesSearch && matchesSpecialty;
		});
	}, [providers, debouncedSearchTerm, selectedSpecialty]);

	const [displayedProviders, setDisplayedProviders] = useState<Provider[]>([]);

	useEffect(() => {
		setDisplayedProviders(filteredProviders());
	}, [filteredProviders]);

	if (error) {
		return <div>Error loading providers: {error.message}</div>;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
			<main className="container mx-auto px-6 py-8 min-h-screen">
				<motion.h1
					className="text-4xl font-bold text-center mb-6 text-primary"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Find Your Ideal Healthcare Provider
				</motion.h1>
				<motion.p
					className="text-xl text-center mb-12 text-gray-600 dark:text-gray-300"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					Discover the perfect match for your health needs using our advanced
					search and filtering system.
				</motion.p>

				<div className="flex flex-col md:flex-row gap-4 mb-8">
					<div className="relative flex-1">
						<Input
							type="text"
							placeholder="Search for a provider"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent"
						/>
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
					</div>
					<div className="relative flex-1">
						<Select
							value={selectedSpecialty}
							onValueChange={setSelectedSpecialty}
						>
							<SelectTrigger className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent">
								<SelectValue placeholder="Select a specialty" />
							</SelectTrigger>
							<SelectContent>
								{specialties.map((specialty) => (
									<SelectItem key={specialty} value={specialty}>
										{specialty}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Filter
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
					</div>
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
					</div>
				) : (
					<AnimatePresence>
						{displayedProviders.length > 0 ? (
							<motion.div
								className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{displayedProviders.map((provider, index) => (
									<motion.div
										key={provider.href}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.3, delay: index * 0.1 }}
									>
										<ProviderCard provider={provider} />
									</motion.div>
								))}
							</motion.div>
						) : (
							<motion.p
								className="text-center text-xl text-gray-500 dark:text-gray-400 mt-12"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								No providers found. Please try adjusting your search criteria.
							</motion.p>
						)}
					</AnimatePresence>
				)}
			</main>
		</div>
	);
}
