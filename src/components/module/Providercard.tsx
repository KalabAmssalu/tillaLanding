import Image from "next/image";

import { motion } from "framer-motion";
import {
	ArrowRight,
	Briefcase,
	Clock,
	Globe,
	LocateIcon,
	Map,
	Phone,
	Pin,
	Star,
} from "lucide-react";

// Importing additional icons
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/files";
import { Provider } from "@/types/card/Provider";

interface ProviderCardProps {
	provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
	return (
		<motion.div
			className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
			whileHover={{ scale: 1.02 }} // Slightly increase scale on hover for effect
			transition={{ type: "spring", stiffness: 300 }}
		>
			<div className="relative h-48">
				<Image
					src={IMAGES[provider.image]}
					alt={provider.name}
					layout="fill"
					objectFit="cover"
					className="transition-transform duration-300 transform hover:scale-105"
				/>
			</div>
			<div className="p-6">
				<h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
					{provider.name}
				</h3>
				<p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center">
					<Briefcase className="mr-2 h-4 w-4 text-primary" />
					{provider.providertype}
				</p>
				<p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center">
					<Star className="mr-2 h-4 w-4 text-yellow-500" />
					{provider.specialty}
				</p>
				<p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center">
					<Globe className="mr-2 h-4 w-4 text-primary" />
					<a
						href={provider.website}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline"
					>
						{provider.website}
					</a>
				</p>
				<p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center">
					<Phone className="mr-2 h-4 w-4 text-green-500" />
					<a href={`tel:${provider.phone}`} className="hover:underline">
						{provider.phone}
					</a>
				</p>
				<p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center">
					<Clock className="mr-2 h-4 w-4 text-purple-500" />
					{provider.openingHours}
				</p>
				<p className="text-gray-600 dark:text-gray-300 mb-4">
					{provider.description}
				</p>
				<p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex items-center">
					<LocateIcon className="mr-2 h-4 w-4 text-blue-500" />
					{provider.address}
				</p>
				{/* <Button asChild className="w-full">
					<a href={provider.href} className="flex items-center justify-center">
						View Profile
						<ArrowRight className="ml-2 h-4 w-4" />
					</a>
				</Button> */}
			</div>
		</motion.div>
	);
}
