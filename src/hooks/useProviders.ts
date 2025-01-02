import { useEffect, useState } from "react";

import { IMAGES } from "@/constants/files";
import { Provider } from "@/types/card/Provider";

// Simulating an API call
const fetchProviders = (): Promise<Provider[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					name: "Abay Medium Clinic",
					specialty: "General Practitioner",
					href: "/provider/dr-john-smith",
					description: "Experienced in family medicine and preventive care.",
					image: "abayHospital" as keyof typeof IMAGES,
					providertype: "Private Hospital",
					website: "www.Abay Medium Clinic.com",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
				{
					name: "Semah Mch Center | A DKT Partner Clinic",
					specialty: "General Practitioner",
					href: "/provider/dr-john-smith",
					description: "Experienced in family medicine and preventive care.",
					image: "semahHospital" as keyof typeof IMAGES,
					providertype: "Hospital",
					website: "www.Semah Mch Center .com",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
				{
					name: "Care Land General Hospital",
					specialty: "General Practitioner",
					href: "/provider/dr-john-smith",
					description: "Experienced in family medicine and preventive care.",
					image: "careLandHospital" as keyof typeof IMAGES,
					providertype: "Private Hospital",
					website: "www.CareLand General Hospital.com",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
				{
					name: "Nordic Medical Centre",
					specialty: "General Practitioner",
					href: "/provider/dr-john-smith",
					description: "Experienced in family medicine and preventive care.",
					image: "nordicHospital" as keyof typeof IMAGES,
					providertype: "Medical Centre",
					website: "www.Nordic Medical Centre.com",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
				{
					name: "Kadisco General Hospital",
					specialty: "General Practitioner",
					href: "/provider/dr-john-smith",
					description: "Experienced in family medicine and preventive care.",
					image: "kadiscoHospital" as keyof typeof IMAGES,
					providertype: "Private Hospital",
					website: "www.Kadisco General Hospital.com",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
				{
					name: "Tikur Anbessa Hospital",
					specialty: "General Practitioner",
					href: "/provider/dr-john-smith",
					description: "Experienced in family medicine and preventive care.",
					image: "tikurHospital" as keyof typeof IMAGES,
					providertype: "Hospital",
					website: "www.Tikur Anbessa Hospital.com",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
				{
					name: "Landmark General Hospital",
					specialty: "Pediatrician",
					href: "/provider/dr-jane-doe",
					description: "Specializes in child health and development.",
					image: "landMarkHospital" as keyof typeof IMAGES,
					providertype: "Private Hospital",
					website: "www.Landmark General Hospital.com",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
				{
					name: "Zewditu Memorial Hospital",
					specialty: "Dermatologist",
					href: "/provider/dr-emily-johnson",
					description: "Experienced in family medicine and preventive care.",
					image: "zewdituHospital" as keyof typeof IMAGES,
					providertype: "Medical Center",
					website: "www.Zewditu Memorial Hospital.com",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
				{
					name: "Hallelujah General Hospital",
					specialty: "General Practitioner",
					href: "/provider/dr-john-smith",
					description: "Experienced in family medicine and preventive care.",
					image: "provider" as keyof typeof IMAGES,
					providertype: "Hospital",
					website: "Hallelujah General Hospital",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
				{
					name: "Ethio-Istanbul General Hospital",
					specialty: "Pediatrician",
					href: "/provider/dr-jane-doe",
					description: "Specializes in child health and development.",
					image: "provider" as keyof typeof IMAGES,
					providertype: "Private Hospital",
					website: "www.Ethio-Istanbul General Hospital.com",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
				{
					name: "Yekatit 12 Hospital",
					specialty: "Dermatologist",
					href: "/provider/dr-emily-johnson",
					description: "Expert in skin conditions and cosmetic treatments.",
					image: "provider" as keyof typeof IMAGES,
					providertype: "Private Hospital",
					website: "www.Yekatit 12 Hospital.com",
					phone: "+1 (555) 123-4567",
					openingHours: "Mon-Fri: 9 AM - 5 PM",
					address: "123 Main St, City, Country",
				},
			]);
		}, 1000);
	});
};

export function useProviders() {
	const [providers, setProviders] = useState<Provider[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		fetchProviders()
			.then((data) => {
				setProviders(data);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	}, []);

	return { providers, isLoading, error };
}
