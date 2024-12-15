import { IMAGES } from "@/constants/files";

import { HeroInfo } from "../HeroInfo";
import { Info } from "../Info";

const MemberPortals = [
	{
		title:
			"Learn about how to become a member of Tilla Health and how to enroll",
		description:
			"Tilla Health has a variety of forms and information related to the claims, appeals and grievances process",
		image: "family2" as keyof typeof IMAGES,
		href: "/member/becoming_a_member",
		slug: "member-enrollment",
		linkText: "Learn about how to become a member →",
	},
	{
		title: " Tilla Health is committed to providing accessible healthcare.",
		description:
			"Tilla Health has a variety of forms and information related to the claims, appeals and grievances process",
		image: "member1" as keyof typeof IMAGES,
		href: "/member/member_benefits",
		slug: "member-benefits",
		linkText: " Understand Your Benefits →",
	},
	{
		title: "Why Tilla Providers Are Trusted.",

		description:
			"At Tilla Health, your care is our top priority. That’s why every provider in our network is carefully vetted to ensure they meet the highest standards of professionalism and expertise. When you choose Tilla Health, you are accessing a network of providers who are committed to delivering safe, effective, and compassionate care.",
		image: "member2" as keyof typeof IMAGES,
		href: "/member/tilla_providers",
		slug: "trusted-providers",
		linkText: "Learn about Tilla Providers →",
	},
];

export default function MemberHero() {
	return (
		<HeroInfo
			title="Experience the best of your membership"
			portals={MemberPortals}
		/>
	);
}
