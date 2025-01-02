import { IMAGES } from "@/constants/files";

import { Cards } from "../Cards";

const MemberPortals = [
	{
		title: "Find a Provider",
		description:
			"Tilla Health has a variety of forms and information related to the claims, appeals and grievances process",
		image: "sampleImage2" as keyof typeof IMAGES,
		href: "/member/find_a_provider",
		linkText: "Find a Provider →",
	},
	{
		title: "Make an appointment",
		description:
			"Tilla Health has a variety of forms and information related to the claims, appeals and grievances process",
		image: "sampleImage5" as keyof typeof IMAGES,
		href: "/member/blogs/member_benefits",
		linkText: "Make an appointment →",
	},
	{
		title: "Wellness incentives",
		description:
			"Tilla Health has a variety of forms and information related to the claims, appeals and grievances process",
		image: "sampleImage3" as keyof typeof IMAGES,
		href: "/member/wellness_incentives",
		linkText: "Learn More →",
	},
];

export default function MemberCards() {
	return <Cards portals={MemberPortals} />;
}
