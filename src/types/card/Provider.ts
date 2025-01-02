import { IMAGES } from "@/constants/files";

export interface Provider {
	name: string;
	specialty: string;
	href: string;
	providertype: string;
	description: string;
	website: string;
	image: keyof typeof IMAGES;
	phone: string;
	openingHours: string;
	address: string;
}
