import { type PricingTier } from "@/types/pricing/PricingType";

export const pricingTiers: PricingTier[] = [
	{
		title: "Basic Plan",
		price: { monthly: 50, yearly: 540 },
		features: [
			{
				name: "Routine check-ups, vaccinations, preventive care",
				covered: true,
			},
			{ name: "Limited access to specialists", covered: true },
			{ name: "Emergency visits only", covered: true },
			{ name: "Partial coverage for hospital stays", covered: true },
			{ name: "Chronic Disease Management", covered: false },
			{ name: "Maternity/Newborn Care", covered: false },
			{ name: "Mental Health Services", covered: false },
			{ name: "Telehealth Services", covered: false },
			{ name: "Additional Coverage", covered: false },
		],
	},
	{
		title: "Standard Plan",
		price: { monthly: 90, yearly: 972 },
		features: [
			{
				name: "All Basic services + access to general practitioners",
				covered: true,
			},
			{ name: "Access to specialists for common conditions", covered: true },
			{ name: "Emergency and urgent care visits", covered: true },
			{ name: "Full coverage for planned hospitalizations", covered: true },
			{ name: "Basic coverage for common chronic conditions", covered: true },
			{
				name: "Partial coverage for prenatal care and delivery",
				covered: true,
			},
			{ name: "Basic counseling services", covered: true },
			{
				name: "Telemedicine consultations for general health issues",
				covered: true,
			},
			{ name: "Care coordination for managing treatments", covered: true },
		],
	},
	{
		title: "Comprehensive Plan",
		price: { monthly: 150, yearly: 1620 },
		features: [
			{
				name: "All Standard services + comprehensive diagnostics",
				covered: true,
			},
			{ name: "Full access to a wide range of specialists", covered: true },
			{
				name: "Full coverage for emergency, urgent care, and ambulance services",
				covered: true,
			},
			{
				name: "Full coverage for planned and emergency hospitalizations",
				covered: true,
			},
			{
				name: "Comprehensive management for chronic conditions",
				covered: true,
			},
			{
				name: "Full coverage for prenatal, delivery, and postnatal care",
				covered: true,
			},
			{
				name: "Comprehensive mental health services, including psychiatric care",
				covered: true,
			},
			{
				name: "Full telemedicine access for both general and specialty consultations",
				covered: true,
			},
			{
				name: "Second opinion services, international care options",
				covered: true,
			},
		],
	},
	{
		title: "Family Plan",
		price: { monthly: 150, yearly: 1620 },
		features: [
			{
				name: "All Standard services + comprehensive diagnostics",
				covered: true,
			},
			{ name: "Full access to a wide range of specialists", covered: true },
			{
				name: "Full coverage for emergency, urgent care, and ambulance services",
				covered: true,
			},
			{
				name: "Full coverage for planned and emergency hospitalizations",
				covered: true,
			},
			{
				name: "Comprehensive management for chronic conditions",
				covered: true,
			},
			{
				name: "Full coverage for prenatal, delivery, and postnatal care",
				covered: true,
			},
			{
				name: "Comprehensive mental health services, including psychiatric care",
				covered: true,
			},
			{
				name: "Full telemedicine access for both general and specialty consultations",
				covered: true,
			},
			{
				name: "Second opinion services, international care options",
				covered: true,
			},
		],
	},
];
