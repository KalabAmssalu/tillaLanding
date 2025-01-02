import { type PricingTier } from "@/types/pricing/PricingType";

export const pricingTiers: PricingTier[] = [
	{
		title: "Basic Plan",
		with_deductible: {
			deductible_amount: 4000,
			max_out_of_pocket: 12000,
			price: { monthly: 95, yearly: 500 },
			coInsurance: 35,
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
		non_deductible: {
			max_out_of_pocket: 10000,
			price: { monthly: 110, yearly: 650 },
			coInsurance: 35,
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
	},
	{
		title: "Standard Plan",
		with_deductible: {
			deductible_amount: 3500,
			max_out_of_pocket: 9500,
			price: { monthly: 125, yearly: 920 },
			coInsurance: 35,
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
		non_deductible: {
			max_out_of_pocket: 7500,
			price: { monthly: 140, yearly: 1080 },
			coInsurance: 30,
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
	},
	{
		title: "Comprehensive Plan",
		with_deductible: {
			deductible_amount: 3000,
			max_out_of_pocket: 6500,
			price: { monthly: 155, yearly: 1500 },
			coInsurance: 25,
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
		non_deductible: {
			max_out_of_pocket: 5500,
			price: { monthly: 180, yearly: 1720 },
			coInsurance: 25,
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
	},
	{
		title: "Family Plan",
		with_deductible: {
			deductible_amount: 2750,
			max_out_of_pocket: 5500,
			price: { monthly: 210, yearly: 1500 },
			coInsurance: 20,
			features: [
				{
					name: "All Comprehensive services + Family Plan diagnostics",
					covered: true,
				},
				{
					name: "Routine check-ups, vaccinations, and preventive screenings for all family members",
					covered: true,
				},
				{
					name: "Pediatric care, including growth monitoring and developmental assessments",
					covered: true,
				},
				{
					name: "Access to general practitioners and pediatricians",
					covered: true,
				},
				{
					name: "Coverage for specialists for family-related conditions",
					covered: true,
				},
				{
					name: "Full coverage for emergencies and urgent care visits for all family members",
					covered: true,
				},
				{
					name: "Comprehensive coverage for planned and emergency hospital stays",
					covered: true,
				},
				{
					name: "Maternity and newborn care, including prenatal, delivery, and postnatal services",
					covered: true,
				},
				{
					name: "Pediatric inpatient care for children",
					covered: true,
				},

				{
					name: "Family-centric chronic disease management (e.g., diabetes, asthma)",
					covered: true,
				},
				{
					name: "Care coordination for multiple family members",
					covered: true,
				},
				{
					name: "Family counseling services and individual therapy",
					covered: true,
				},
				{
					name: "Comprehensive mental health services, including psychiatric care",
					covered: true,
				},
				{
					name: "24/7 access to telemedicine for adults and children",
					covered: true,
				},
				{
					name: "Specialty telemedicine services for second opinions",
					covered: true,
				},
				{
					name: "Nutritional counseling for family wellness",
					covered: true,
				},
				{
					name: "Health and wellness programs (e.g., weight management, fitness)",
					covered: true,
				},
				{
					name: "Coverage for adolescent-specific care, such as counseling and vaccinations",
					covered: true,
				},
				{
					name: "Family deductible for streamlined coverage",
					covered: true,
				},
			],
		},
		non_deductible: {
			max_out_of_pocket: 4500,
			price: { monthly: 240, yearly: 1720 },
			coInsurance: 20,
			features: [
				{
					name: "All Comprehensive services + Family Plan diagnostics",
					covered: true,
				},
				{
					name: "Routine check-ups, vaccinations, and preventive screenings for all family members",
					covered: true,
				},
				{
					name: "Pediatric care, including growth monitoring and developmental assessments",
					covered: true,
				},
				{
					name: "Access to general practitioners and pediatricians",
					covered: true,
				},
				{
					name: "Coverage for specialists for family-related conditions",
					covered: true,
				},
				{
					name: "Full coverage for emergencies and urgent care visits for all family members",
					covered: true,
				},
				{
					name: "Comprehensive coverage for planned and emergency hospital stays",
					covered: true,
				},
				{
					name: "Maternity and newborn care, including prenatal, delivery, and postnatal services",
					covered: true,
				},
				{
					name: "Pediatric inpatient care for children",
					covered: true,
				},

				{
					name: "Family-centric chronic disease management (e.g., diabetes, asthma)",
					covered: true,
				},
				{
					name: "Care coordination for multiple family members",
					covered: true,
				},
				{
					name: "Family counseling services and individual therapy",
					covered: true,
				},
				{
					name: "Comprehensive mental health services, including psychiatric care",
					covered: true,
				},
				{
					name: "24/7 access to telemedicine for adults and children",
					covered: true,
				},
				{
					name: "Specialty telemedicine services for second opinions",
					covered: true,
				},
				{
					name: "Nutritional counseling for family wellness",
					covered: true,
				},
				{
					name: "Health and wellness programs (e.g., weight management, fitness)",
					covered: true,
				},
				{
					name: "Coverage for adolescent-specific care, such as counseling and vaccinations",
					covered: true,
				},
				{
					name: "Family deductible for streamlined coverage",
					covered: true,
				},
			],
		},
	},
];
