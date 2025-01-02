import { IMAGES } from "../files";

export const planData = [
	{
		id: "diaspora",
		title: "Diaspora",
		description:
			"Designed for Diaspora families and loved ones living in Ethiopia.",
		image: IMAGES.diaspora, // Image path from the public/images folder
		link: "/membership/diaspora", // The link for the Diaspora plan
	},
	{
		id: "individual-or-family",
		title: "Individual or Family",
		description:
			"Personalized health insurance solutions for individuals and families residing in Ethiopia. ",
		image: IMAGES.family, // Image path from the public/images folder
		link: "/membership/select", // The link for the Individual or Family plan
	},
	{
		id: "international",
		title: "International",
		description:
			"Tailored for international members traveling to Ethiopia for work or leisure..",
		image: IMAGES.internationalGlob, // Image path from the public/images folder
		link: "/membership/international", // The link for the Federal Employee Program plan
	},
	{
		id: "private-sector",
		title: "Private Sector",
		description:
			"Comprehensive and reliable coverage specifically designed for employees working in Ethiopia's private sector.",
		image: IMAGES.privateSector, // Image path from the public/images folder
		link: "/organization/register?type=private", // The link for the Private Sector plan
	},
	{
		id: "ngo",
		title: "NGO",
		description:
			"Specialized insurance solutions for NGO workers and their families living in Ethiopia.",
		image: IMAGES.ngo, // Image path from the public/images folder
		link: "/organization/register?type=ngo", // The link for the Individual or Family plan
	},
	{
		id: "federal-employee",
		title: "Federal Employee Program",
		description:
			"Exclusive health insurance coverage tailored for federal employees in Ethiopia.",
		image: IMAGES.federal, // Image path from the public/images folder
		link: "/organization/register?type=federal", // The link for the Federal Employee Program plan
	},
];

// old
// const plans = [
// 	{
// 		title: "Medicare plans",
// 		description:
// 			"Learn about medical benefits, drug coverage and extra benefits beyond Original Medicare.",
// 		icon: "/placeholder.svg?height=64&width=64",
// 		href: "/medicare",
// 	},
// 	{
// 		title: "Plans through work",
// 		description:
// 			"If your employer offers Tilla as a choice for your health plan, start here to see your options.",
// 		icon: "/placeholder.svg?height=64&width=64",
// 		href: "/work-plans",
// 	},
// 	{
// 		title: "Individual & family plans",
// 		description:
// 			"See the value of Tilla CVS Health® Affordable Care Act (ACA) individual & family plans.",
// 		icon: "/placeholder.svg?height=64&width=64",
// 		href: "/family-plans",
// 	},
// 	{
// 		title: "Medicaid plans",
// 		description:
// 			"Get the basics of this federally and state-funded health insurance program and see if you qualify.",
// 		icon: "/placeholder.svg?height=64&width=64",
// 		href: "/medicaid",
// 	},
// 	{
// 		title: "Dental plans",
// 		description:
// 			"Protect your smile with our individual and family dental insurance plans or discount card.",
// 		icon: "/placeholder.svg?height=64&width=64",
// 		href: "/dental",
// 	},
// 	{
// 		title: "Vision plans",
// 		description:
// 			"Get the eyewear you want, where you want, with vision coverage to keep your eyes healthy.",
// 		icon: "/placeholder.svg?height=64&width=64",
// 		href: "/vision",
// 	},
// 	{
// 		title: "Student health plans",
// 		description:
// 			"Take care of your health with quality coverage while you're in college or studying abroad.",
// 		icon: "/placeholder.svg?height=64&width=64",
// 		href: "/student",
// 	},
// 	{
// 		title: "Diaspora ",
// 		description: "International insurance plan for Diaspora members.",
// 		icon: "/placeholder.svg?height=64&width=64",
// 		href: "/international",
// 	},
// ];
