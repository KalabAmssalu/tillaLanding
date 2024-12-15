import {
	Ambulance,
	Award,
	Badge,
	Binoculars,
	BookOpen,
	Bot,
	Calendar,
	Car,
	ClipboardCheck,
	ClipboardList,
	DoorOpen,
	Eye,
	FileStack,
	Heart,
	HelpCircle,
	Laptop,
	MessageSquare,
	Network,
	Phone,
	PillIcon,
	Plane,
	RefreshCcw,
	ShieldCheck,
	Star,
	Target,
	UserCog,
	Users,
	Video,
} from "lucide-react";

import { BlogPostProps } from "@/components/shared/BlogPost/BlogPost";
import { IMAGES } from "@/constants/files";

export const blogPosts: Record<string, BlogPostProps> = {
	"member-portal": {
		title: "Take Control of Your Health with the Tilla Health Member Portal",
		headerImage: "sampleImage5" as keyof typeof IMAGES,
		introduction:
			"Your one-stop destination to manage your care, track services, access tools, and schedule appointments—all at your fingertips.",
		keyfeaturetitle: "Key Features",
		features: [
			{
				icon: <UserCog className="h-12 w-12 text-primary mb-4" />,
				title: "Manage Your Care Like a Pro",
				features: [
					"View and update your personal information securely.",
					"Access your health plan details, including coverage limits, exclusions, and out-of-pocket costs.",
					"Download your insurance card for immediate use.",
					"Stay informed about wellness programs and benefits exclusive to your plan.",
				],
			},
			{
				icon: <ClipboardList className="h-12 w-12 text-primary mb-4" />,
				title: "Track Your Services and Benefits",
				features: [
					"Check your service history, including completed appointments, lab results, and prescriptions.",
					"Monitor claims and reimbursement statuses in real-time.",
					"Access detailed breakdowns of services covered by your plan.",
					"Receive reminders for health screenings, preventive checkups, and medication refills.",
				],
			},
			{
				icon: <Calendar className="h-12 w-12 text-primary mb-4" />,
				title: "Schedule and Manage Appointments with Ease",
				features: [
					"Find and connect with in-network doctors, specialists, and healthcare facilities.",
					"Schedule, cancel, or reschedule appointments instantly.",
					"Add appointment notes, such as symptoms or specific requests, to make your visits more efficient.",
					"Receive reminders for upcoming appointments to ensure you never miss an important date.",
				],
			},
			{
				icon: <Video className="h-12 w-12 text-primary mb-4" />,
				title: "Access Telehealth and Virtual Care",
				features: [
					"Schedule telehealth consultations with licensed providers.",
					"Access follow-up care recommendations and electronic prescriptions.",
					"Review past telehealth appointments and notes directly from your portal.",
				],
			},
			{
				icon: <Car className="h-12 w-12 text-primary mb-4" />,
				title: "Transportation Scheduling",
				features: [
					"Request transportation to medical appointments through a simple form.",
					"Track your ride status and estimated arrival times.",
					"Access your ride history for future reference.",
				],
			},
			{
				icon: <Heart className="h-12 w-12 text-primary mb-4" />,
				title: "Health and Wellness Tools",
				features: [
					"Set personal health goals, such as weight management, exercise, or chronic disease management.",
					"Access educational resources, including articles, videos, and tips tailored to your health needs.",
					"Participate in virtual workshops on nutrition, mental health, and wellness.",
				],
			},
			{
				icon: <MessageSquare className="h-12 w-12 text-primary mb-4" />,
				title: "Secure Communication with Providers",
				features: [
					"Send secure messages to your doctor's office for quick follow-ups.",
					"Request referrals or additional medical records directly through the portal.",
					"Receive notifications when test results or important documents are available.",
				],
			},
			{
				icon: <PillIcon className="h-12 w-12 text-primary mb-4" />,
				title: "Pharmacy and Medication Management",
				features: [
					"View your current prescriptions and refill schedules.",
					"Find in-network pharmacies near your location.",
					"Receive reminders for refills and updates on medication coverage.",
				],
			},
			{
				icon: <Users className="h-12 w-12 text-primary mb-4" />,
				title: "Family Member Management",
				features: [
					"Add dependents, such as children or elderly parents, to your profile.",
					"Schedule appointments, track services, and monitor claims for all family members.",
					"View individual coverage and service histories to stay organized.",
				],
			},
		],
		whyChooseTitle: "Why Use the Member Portal?",
		whyChoosePoints: [
			"24/7 Access: Manage your care anytime, anywhere.",
			"Save Time: Skip phone calls and paperwork by handling tasks online.",
			"Stay Organized: Keep all your healthcare details in one secure place.",
			"Improve Health Outcomes: Stay on top of screenings, appointments, and medications with reminders and easy tracking.",
			"Peace of Mind: Know that your information is secure, and help is always a few clicks away.",
		],
		howToGetStarted: {
			title: "How to Get Started with the Member Portal",
			steps: [
				"Log in to Your Member Portal: Access the portal via our website or mobile app using your Member ID and password.",
				"Explore the Dashboard: The user-friendly dashboard gives you a snapshot of your health plan, appointments, and personalized tools.",
				"Use the Features You Need: Navigate to specific sections like Claims, Appointments, or Virtual Care for seamless management of your healthcare.",
			],
		},
		promiseSection: {
			title: "Your Health Journey Matters",
			content:
				"With the Tilla Health Member Portal, you'll have everything you need to stay informed, prepared, and empowered.",
		},
		callToAction: {
			title: "Take Charge of Your Health Today!",
			content:
				"Log in today and experience the convenience of managing your healthcare in one place.",
			buttonText: "Access Your Member Portal Now",
			buttonLink: "/member/portal",
		},
	},
	"transport-assistance": {
		title:
			"Take Control of Your Health with Tilla Health's Transportation Assistance Program",
		headerImage: "transportToClinic",
		introduction:
			"At Tilla Health, we know that transportation is a critical factor in accessing timely and quality healthcare. That's why we've designed a Transportation Assistance Program that goes beyond just getting you to your local appointments. Whether you need a ride to your clinic, emergency air ambulance services, or even assistance traveling abroad for specialized care, Tilla Health is here to make sure you're covered every step of the way.",
		keyfeaturetitle: "Transportation Assistance Programs",
		features: [
			{
				icon: <Car className="h-12 w-12 text-primary mb-4" />,
				title: "Local Transportation Assistance",
				features: [
					"Free or discounted rides to medical facilities",
					"Accessible vehicles for mobility challenges",
					"Real-time ride tracking and scheduling",
				],
			},
			{
				icon: <Ambulance className="h-12 w-12 text-primary mb-4" />,
				title: "Emergency Air Ambulance Services",
				features: [
					"Immediate access to air transportation",
					"Expert medical personnel onboard",
					"Seamless coordination with hospitals",
				],
			},
			{
				icon: <Plane className="h-12 w-12 text-primary mb-4" />,
				title: "Abroad Medical Coverage",
				features: [
					"Global Healthcare Access",
					"Travel Coordination",
					"Medical Escort Services",
					"Seamless Continuity of Care",
				],
			},
		],
		whyChooseTitle:
			"Why Choose Tilla Health's Transportation Assistance Program?",
		whyChoosePoints: [
			"Convenience at Every Level: From local rides to international travel",
			"Safety First: Trained personnel and advanced medical transport services",
			"Comprehensive Coverage: National and international care",
			"Peace of Mind: We handle the logistics, you focus on recovery",
		],
		howToGetStarted: {
			title: "How to Get Started",
			steps: [
				"Opt into the Transportation Assistance Program during registration via your Member Portal.",
				"Access features like ride scheduling, air ambulance requests, and global healthcare support directly from the portal.",
				"For international medical care, contact our Member Support Team to begin coordinating your treatment and travel.",
			],
		},
		promiseSection: {
			title: "A Promise of Accessible Care",
			content:
				"At Tilla Health, we are committed to breaking barriers in healthcare access. Whether your journey to better health involves a short ride to the clinic or a trip across the globe, our Transportation Assistance Program ensures you receive the care you deserve—without compromise.",
		},
		callToAction: {
			title: "Take the First Step Today!",
			content:
				"Join Tilla Health and discover how our Transportation Assistance Program can help you or your loved ones access timely and quality care.",
			buttonText: "Sign Up and Learn More",
			buttonLink: "/sign-up",
		},
	},
	"update-info": {
		title: "Keep Your Tilla Health Account Up to Date",
		headerImage: "member6",
		introduction:
			"Keep your Tilla Health account up to date whenever there are changes in your life—such as pregnancy, a change of address, or a change in job status. This helps us ensure that you receive the appropriate benefits and services.",
		keyfeaturetitle: "Why It's Important",
		features: [
			{
				icon: <Target className="h-12 w-12 text-primary mb-4" />, // Adjust if an icon becomes available
				title: "Personalization",
				features: [
					"Ensures you get the right benefits tailored to your needs.",
				],
			},
			{
				icon: <Eye className="h-12 w-12 text-primary mb-4" />, // Adjust if an icon becomes available
				title: "Clarity",
				features: [
					"Helps maintain accurate communication regarding your health.",
				],
			},
			{
				icon: <RefreshCcw className="h-12 w-12 text-primary mb-4" />, // Adjust if an icon becomes available
				title: "Continuity",
				features: ["Supports the quality and continuity of your care."],
			},
		],
		whyChooseTitle: "Why Keep Your Information Updated?",
		whyChoosePoints: [
			"Stay eligible for benefits and services.",
			"Receive timely communications regarding your health.",
			"Ensure continuity in your care.",
		],
		howToGetStarted: {
			title: "How to Update Your Information",
			steps: [
				"Log in to your Tilla Health account via the Member Portal.",
				"Navigate to the 'Profile' section to make changes.",
				"Save your updates to ensure your information is current.",
			],
		},
		promiseSection: {
			title: "Your Health Journey Matters",
			content:
				"With Tilla Health, keeping your information updated is essential for receiving the best care and benefits available to you.",
		},
		callToAction: {
			title: "Take Action Now!",
			content:
				"Log in to your Member Portal today and ensure your information is up to date.",
			buttonText: "Go to Member Portal",
			buttonLink: "/member/portal",
		},
	},
	"member-enrollment": {
		title: "Becoming a Member",
		headerImage: "family2" as keyof typeof IMAGES,
		introduction:
			"It’s time to make a choice about your benefits. If you are eligible to enroll, there are several ways to join Tilla Health:",
		keyfeaturetitle: "How to Enroll",
		features: [
			{
				icon: <Laptop className="h-12 w-12 text-primary mb-4" />, // No specific icon provided; adjust as necessary
				title: "Enroll Online",
				features: [
					"Visit TillaHealth.com or download Tilla Health’s free mobile app to enroll online.",
				],
			},
			{
				icon: <Phone className="h-12 w-12 text-primary mb-4" />, // No specific icon provided; adjust as necessary
				title: "Enroll by Phone",
				features: [
					"Call the Tilla Health Enrollment Line at 0901010101 to enroll by phone or get additional assistance.",
				],
			},
		],
		whyChooseTitle: "Why Choose Tilla Health?",
		whyChoosePoints: [
			"Tilla Health provides healthcare benefits to eligible recipients through our comprehensive health program.",
			"Enrollment is open year-round, so you can sign up anytime.",
			"Access to a network of trusted providers and healthcare services near you.",
			"Select Tilla Health as your Managed Care Organization (MCO) to start receiving benefits.",
		],
		howToGetStarted: {
			title: "How to Get Started",
			steps: [
				"Visit our website or download the mobile app to begin your enrollment.",
				"Call our Enrollment Line if you need assistance during the process.",
				"Choose Tilla Health as your MCO after signing up.",
			],
		},
		promiseSection: {
			title: "Our Commitment to You",
			content:
				"Tilla Health’s program is designed to meet your healthcare needs and support you and your family in accessing quality care.",
		},
		callToAction: {
			title: "Ready to Join Us?",
			content: "Visit TillaHealth.com today to start your enrollment process.",
			buttonText: "Enroll Now",
			buttonLink: "https://www.tillahealth.com",
		},
	},
	"member-benefits": {
		title: "Member Benefits",
		headerImage: "sampleImage2" as keyof typeof IMAGES,
		introduction:
			"Tilla Health is committed to providing accessible healthcare without co-pays for services within our network. However, a registration fee, known as the 'Ye Card,' is required at each visit. This fee supports the quality and sustainability of our services, ensuring that members have ongoing access to our full range of benefits. Any updates to this policy will be communicated in advance to keep you informed.",
		keyfeaturetitle: "Important Notes",
		features: [
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Registration Fees",
				features: ["Registration fees help maintain our service quality."],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Policy Updates",
				features: ["Members will be notified of any policy updates."],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Your Health Matters",
				features: ["Your health and satisfaction are our top priorities."],
			},
		],
		whyChooseTitle: "Why Choose Tilla Health?",
		whyChoosePoints: [
			"Access to a wide range of healthcare services without co-pays.",
			"Quality care supported by a sustainable fee structure.",
			"Regular updates to keep you informed about your benefits.",
		],
		howToGetStarted: {
			title: "How to Access Your Benefits",
			steps: [
				"Visit our website or mobile app to learn more about your benefits.",
				"Ensure your registration is up-to-date to enjoy seamless access.",
				"Contact member support for any questions regarding your benefits.",
			],
		},
		promiseSection: {
			title: "Our Commitment to You",
			content:
				"At Tilla Health, your health and satisfaction are our top priorities. We strive to provide you with the best possible care and keep you informed every step of the way.",
		},
		callToAction: {
			title: "Explore Your Benefits Today!",
			content:
				"Visit TillaHealth.com or reach out to member support to learn more about your benefits.",
			buttonText: "Learn More",
			buttonLink: "https://www.tillahealth.com",
		},
	},
	"trusted-providers": {
		title: "Why Tilla Providers Are Trusted",
		headerImage: "consulting" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"At Tilla Health, your care is our top priority. That’s why every provider in our network is carefully vetted to ensure they meet the highest standards of professionalism and expertise. When you choose Tilla Health, you are accessing a network of providers who are committed to delivering safe, effective, and compassionate care.",
		keyfeaturetitle: "Reasons to Trust Tilla Providers",
		features: [
			{
				icon: <Award className="h-12 w-12 text-primary mb-4" />, // No specific icon provided; adjust as necessary
				title: "Licensed and Insured:",
				features: [
					"Every Tilla Health provider holds valid insurance to practice and is registered with the appropriate regulatory bodies.",
				],
			},
			{
				icon: <ClipboardCheck className="h-12 w-12 text-primary mb-4" />, // No specific icon provided; adjust as necessary
				title: "Active Practice:",
				features: [
					"All providers in our network are actively practicing, bringing you the most current and effective care.",
				],
			},
			{
				icon: <FileStack className="h-12 w-12 text-primary mb-4" />, // No specific icon provided; adjust as necessary
				title: "Thorough Credentialing Process:",
				features: [
					"Our rigorous credentialing process ensures only qualified, trusted professionals care for you.",
				],
			},
			{
				icon: <Star className="h-12 w-12 text-primary mb-4" />, // No specific icon provided; adjust as necessary
				title: "Commitment to Excellence:",
				features: [
					"Tilla Health providers are held to ongoing quality assurance standards.",
				],
			},
			{
				icon: <DoorOpen className="h-12 w-12 text-primary mb-4" />, // No specific icon provided; adjust as necessary
				title: "Accessibility:",
				features: [
					"With providers available across various specialties, Tilla Health ensures you can find care that meets your unique health needs.",
				],
			},
		],
		whyChooseTitle: "", // No specific title provided
		whyChoosePoints: [], // No specific points provided
		howToGetStarted: {
			title: "", // No specific title provided
			steps: [], // No specific steps provided
		},
		promiseSection: {
			title: "Our Promise to You",
			content:
				"Your health deserves the best. With Tilla Health, you can have peace of mind knowing you’re in good hands. From routine check-ups to specialized treatments, our providers are here to ensure you receive comprehensive and personalized care every step of the way.",
		},
		callToAction: {
			title: "Learn More About Our Providers",
			content: "Explore our network and find the right provider for you.",
			buttonText: "Find a Provider",
			buttonLink: "/find-a-provider", // Adjust the link as necessary
		},
	},
	"credentialed-provider": {
		title: "Become a Credentialed Provider in Ethiopia",
		headerImage: "provider3" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"Tilla Health is committed to building a robust and high-quality provider network to serve our members effectively. If you are a healthcare provider interested in joining our network, please review the following guidelines and instructions.",
		keyfeaturetitle: "", // No specific title provided
		features: [
			// This section is commented out in the original request
			// {
			//     icon: null, // No specific icon provided; adjust as necessary
			//     title: "How to Join the Tilla Health Provider Network",
			//     features: [
			//         "Step 1: Apply for a Provider ID - Providers without a registered ID for health services in Ethiopia should apply through the appropriate authority. For U.S.-based providers, ensure you have a valid National Provider Identifier (NPI).",
			//         "Step 2: Complete the Tilla Health Provider Interest Form - Access the New Provider/Group Interest Form on our website or contact our Provider Relations team for assistance.",
			//         "Step 3: Specialized Providers - Contact the relevant departments for Dental, Optometry, and Behavioral Health services to learn more about joining.",
			//         "Step 4: Credentialing Requirements - Authorize Tilla Health as a CAQH member to access your credentialing information.",
			//         "Step 5: Privilege Requirements - Ensure you have active privileges at Tilla Health’s participating facilities.",
			//     ],
			// },
		],
		whyChooseTitle: "Why Partner with Tilla Health?",
		whyChoosePoints: [
			"Access to a comprehensive network of healthcare services.",
			"Support for credentialing and application processes.",
			"Regular updates and communication regarding provider status.",
		],
		howToGetStarted: {
			title: "How to Join the Tilla Health Provider Network",
			steps: [
				"Apply for a Provider ID - Providers without a registered ID for health services in Ethiopia should apply through the appropriate authority. For U.S.-based providers, ensure you have a valid National Provider Identifier (NPI).",
				"Complete the Tilla Health Provider Interest Form - Access the New Provider/Group Interest Form on our website or contact our Provider Relations team for assistance.",
				"Specialized Providers - Contact the relevant departments for Dental, Optometry, and Behavioral Health services to learn more about joining.",
				"Credentialing Requirements - Authorize Tilla Health as a CAQH member to access your credentialing information.",
				"Privilege Requirements - Ensure you have active privileges at Tilla Health’s participating facilities.",
			],
		},
		promiseSection: {
			title: "Our Commitment to Providers",
			content:
				"Tilla Health values our providers and is dedicated to ensuring a smooth credentialing process. We are here to support you every step of the way.",
		},
		callToAction: {
			title: "Ready to Join Us?",
			content:
				"For assistance with provider registration, credentialing, or any inquiries, contact us today.",
			buttonText: "Contact Provider Relations",
			buttonLink: "mailto:tillahealth2024@gmail.com",
		},
	},
	"quality-commitment": {
		title: "Commitment to Excellence in Quality",
		headerImage: "consulting" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"Tilla Health is dedicated to maintaining the highest standards of service and clinical quality to ensure optimal care for our members.",
		keyfeaturetitle: "Tilla Health's Ongoing Quality Initiatives",
		features: [
			{
				icon: <ShieldCheck className="h-12 w-12 text-primary mb-4" />,
				title: "Consumer Protection",
				features: [
					"Ensuring members receive high-quality care through a robust network of providers.",
				],
			},
			{
				icon: <Badge className="h-12 w-12 text-primary mb-4" />,
				title: "Quality Improvement",
				features: [
					"Continuously monitoring and enhancing clinical and service outcomes to exceed member expectations.",
				],
			},
			{
				icon: <Binoculars className="h-12 w-12 text-primary mb-4" />,
				title: "Transparency",
				features: [
					"Providing accessible, accurate information to help members make better health care decisions.",
				],
			},
		],
		whyChooseTitle: "Ethiopian Health Quality Assurance",
		whyChoosePoints: [
			"Tilla Health adheres to national health quality assurance standards set forth by Ethiopian regulatory bodies.",
			"Our commitment to quality assurance ensures that we deliver safe, effective, and reliable healthcare services across our network.",
		],
		promiseSection: {
			title: "For More Information",
			content:
				"For more information about Tilla Health’s quality assurance programs and ongoing monitoring initiatives, please contact us:",
		},
		howToGetStarted: {
			title: "", // No specific title provided
			steps: [], // No specific steps provided
		},
		callToAction: {
			title: "Ready to Join Us?",
			content:
				"For more information about Tilla Health’s quality assurance programs and ongoing monitoring initiatives, please contact us.",
			buttonText: "Contact Provider Relations",
			buttonLink: "mailto:tillahealth2024@gmail.com",
		},
	},
	"patient-referral": {
		title: "How to Refer a Patient to a Specialist",
		headerImage: "provider2" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"Tilla Health in-network providers can now refer members directly to in-network specialists without requiring a written referral from a primary care physician (PCP). This change is designed to improve access to care and simplify the experience for both members and providers.",
		keyfeaturetitle: "", // No specific title provided
		features: [
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "In-Network Specialist Referrals",
				features: [
					"Members can access in-network specialists with referrals from any Tilla Health in-network provider, without the need for additional PCP approval.",
					"Providers should ensure that all documentation for claims submitted for in-network specialist services is accurate and complete to facilitate efficient claims processing.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Out-of-Network Specialist Referrals",
				features: [
					"A written referral and prior authorization are still required for members seeking care from out-of-network specialists.",
					"Providers must utilize the Tilla Health Quick Prior Authorization Guide to determine services requiring prior authorization and ensure timely approval for specialized care.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Claims Submission",
				features: [
					"Claims for services provided by in-network specialists should be submitted as usual.",
					"Include all necessary documentation to ensure timely and efficient processing of claims.",
				],
			},
		],
		whyChooseTitle: "", // No specific title provided
		whyChoosePoints: [], // No specific points provided
		howToGetStarted: {
			title: "", // No specific title provided
			steps: [], // No specific steps provided
		},
		promiseSection: {
			title: "Access the Quick Prior Authorization Guide",
			content:
				"For the latest version of the Tilla Health Quick Prior Authorization Guide, visit the Provider News section of our website.",
		},
		callToAction: {
			title: "Need Assistance?",
			content:
				"If you have questions or need assistance regarding referrals or claims submissions, please contact Tilla Health Provider Relations:",
			buttonText: "Contact Provider Relations",
			buttonLink: "mailto:tillahealth2024@gmail.com",
		},
	},
	"join-network": {
		title: "How to Join the Tilla Health Network?",
		headerImage: "doctor" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"Tilla Health is proud to collaborate with dedicated healthcare professionals to deliver high-quality care to our members. Joining the Tilla Health network means becoming part of a community of providers committed to excellence, innovation, and compassionate care.",
		keyfeaturetitle: "Requirements to Register as a Tilla Health Provider",
		features: [
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Valid Insurance",
				features: [
					"Providers must carry professional liability insurance to protect patients and ensure accountability. This insurance safeguards both providers and patients, creating a foundation of trust.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Active Practice",
				features: [
					"Providers must currently be practicing and in good standing with their respective licensing boards. This ensures that members have access to care from experienced and actively engaged professionals.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Credentialing Process",
				features: [
					"All applicants undergo a thorough review to ensure compliance with Tilla Health standards. The credentialing process includes verifying educational and training background, licenses and certifications, and professional experience and references.",
				],
			},
		],
		whyChooseTitle: "Benefits of Joining Tilla Health",
		whyChoosePoints: [
			"Wide Patient Network: Gain access to a growing pool of members actively seeking quality healthcare services.",
			"Supportive Infrastructure: Tilla Health provides tools, resources, and dedicated support to help providers manage their practices efficiently.",
			"Collaborative Opportunities: Be part of a network that fosters collaboration and innovation among healthcare professionals.",
			"Ongoing Quality Assurance: Providers benefit from a system that ensures continuous improvement and professional growth.",
		],
		promiseSection: {
			title: "Access the Quick Prior Authorization Guide",
			content:
				"For the latest version of the Tilla Health Quick Prior Authorization Guide, visit the Provider News section of our website.",
		},
		howToGetStarted: {
			title: "Registration Steps",
			steps: [
				"Submit Your Application: Complete the Tilla Health Provider Registration Form available on our website.",
				"Credentialing Review: Tilla Health’s credentialing team will review your application and verify your qualifications.",
				"Contract Agreement: Upon approval, sign the provider agreement to become part of the Tilla Health network.",
				"Onboarding: Gain access to the provider portal and other tools to help you manage your practice efficiently within our network.",
			],
		},
		callToAction: {
			title: "Start Your Registration Today!",
			content:
				"Be part of a trusted network that values quality care and professionalism. Make a difference with Tilla Health.",
			buttonText: "Register Now",
			buttonLink: "/register", // Adjust the link as necessary
		},
	},
	"claims-appeals-grievances": {
		title: "Claims, Appeals, and Grievances",
		headerImage: "claimform2" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"Tilla Health in-network providers can now refer members directly to in-network specialists without requiring a written referral from a primary care physician (PCP). This change is designed to improve access to care and simplify the experience for both members and providers.",
		keyfeaturetitle: "Key Features",
		features: [
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Claims",
				features: [
					"A claim is a request from a patient or provider to Tilla Health for payment for services rendered. Our Claims department is available to assist you at 800-261-3371, Monday through Friday, 8:30 a.m. to 5 p.m. For information on claim status or to look up claims online, please click here.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Claims Payment Dispute",
				features: [
					"A claims payment dispute is a request from a healthcare provider for a post-service review of claims that have been denied or underpaid. This process requires completion of the Claims Payment Dispute Form.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Appeals",
				features: [
					"Tilla Health recognizes the right of a member or authorized representative to request an appeal of an adverse action. Tilla Health reviews all appeal requests promptly, ensuring the process is communicated appropriately.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Grievances",
				features: [
					"Tilla Health maintains a process for logging and managing grievances and appeals to ensure they are resolved in a manner consistent with our service standards. For more information, please contact Member Services at 888-404-3549.",
				],
			},
		],
		whyChooseTitle: "Why Manage Your Claims and Appeals?",
		whyChoosePoints: [
			"Streamlined Process: Easily submit and track claims online.",
			"Quick Resolutions: Get faster responses for appeals and grievances.",
			"Transparent Information: Access clear guidelines and support.",
			"Dedicated Support: Reach out to our Claims department for assistance.",
		],
		howToGetStarted: {
			title: "How to Submit a Claim or Appeal",
			steps: [
				"Gather necessary documentation related to your claim or appeal.",
				"Complete the Claims Payment Dispute Form, if applicable.",
				"Submit your claim or appeal via our online portal or by contacting our Claims department.",
			],
		},
		promiseSection: {
			title: "Your Health Matters",
			content:
				"At Tilla Health, we are committed to ensuring that your claims and appeals are handled with care and efficiency.",
		},
		callToAction: {
			title: "Need Assistance?",
			content:
				"If you have questions regarding referrals or claims submissions, please contact Tilla Health Provider Relations:",
			buttonText: "Contact Provider Relations",
			buttonLink: "mailto:tillahealth2024@gmail.com",
		},
	},
	"provider-information-updates": {
		title: "Provider Information Updates",
		headerImage: "doctor2" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"All general provider updates, including changes in office demographics, must be submitted to Tilla Health at least 30 days before the desired effective date.",
		keyfeaturetitle: "Key Features",
		features: [
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Tax ID Updates",
				features: [
					"For changes to Tax ID numbers, providers must provide a 45-day written notice. Tilla Health will confirm receipt of the Tax ID update in writing within 30 days of acceptance. This change may require a new provider contract.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Provider Web Portal",
				features: [
					"The Tilla Health Provider Web Portal serves as a quality control tool, allowing providers to view and manage their information within our system. Your provider details are shared with Tilla Health members and the provider community via our 'Find a Provider' page.",
					"Other systems within Tilla Health use this information to process authorizations, claims, and reimbursement checks.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Portal Services",
				features: [
					"New user registration",
					"Password reset",
					"Provider and group changes",
					"Review of change summaries",
					"Quarterly data validations",
					"Access to the Provider Web Portal user guide",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Registration Information",
				features: [
					"Visit the Tilla Health Provider Registration to register.",
					"Before registering, please have the following information: Group DBA (Doing Business As) Name, Group Tax ID, Group Type II NPI (Group NPI).",
				],
			},
		],
		whyChooseTitle: "Why Use the Provider Portal?",
		whyChoosePoints: [
			"Streamline updates: Easily submit and manage provider information.",
			"Access resources: Find guides and support tools tailored to your needs.",
			"Stay informed: Receive notifications about changes and updates.",
		],
		howToGetStarted: {
			title: "To Complete the Registration Process:",
			steps: [
				"Click on 'New User Request'.",
				"Enter your group administrator ID (email) currently on file with Tilla Health.",
				"You will receive an email with instructions to complete registration.",
			],
		},
		promiseSection: {
			title: "Need Assistance?",
			content:
				"For assistance with registration, please send a detailed email to providerrelations@tillahealth.com.",
		},
		callToAction: {
			title: "Contact Us",
			content:
				"If you have further questions, feel free to reach out to your provider relations associate.",
			buttonText: "Email Provider Relations",
			buttonLink: "mailto:providerrelations@tillahealth.com",
		},
	},
	"provider-resource": {
		title: "Provider Resources",
		headerImage: "provider5" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"Tilla Health provides a comprehensive suite of resources to support our providers. Stay informed about the latest updates, requirements, and tools available to enhance your practice.",
		keyfeaturetitle: "What’s New?",
		features: [
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Provider Registration in Tilla Health Portal",
				features: [
					"Learn how to register as a provider and access claims through our Tilla Health Provider Portal.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Enrollment for EFT and ERA",
				features: [
					"Find helpful tips for registering with Change Healthcare for Electronic Funds Transfer (EFT) and Electronic Remittance Advice (ERA) enrollment.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "ECHO Provider Payments Portal User Guide",
				features: [
					"Access the user guide for the ECHO Provider Payments Portal for seamless payment processing.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Provider Payments FAQ",
				features: [
					"Review frequently asked questions regarding provider payments and processes.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Town Hall and Education Materials",
				features: [
					"Access slide decks and information on updates for 2023, designed to keep you informed.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Provider COVID-19 Resources",
				features: [
					"Explore streamlined resources for COVID-19 information tailored for our provider network.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Access and Availability Requirements",
				features: [
					"Learn about requirements for member appointments, response timeframes, and after-hours coverage.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Provider Manual",
				features: [
					"The Tilla Health Provider Manual offers guidance on program requirements, MCO obligations, and information for providers participating with Tilla Health.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Provider News",
				features: [
					"Stay updated with provider alerts and newsletters, featuring essential information for all Tilla Health providers.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Provider Support",
				features: [
					"Discover the various departments—Provider Relations, Case Management, Outreach, and more—that work with and support Tilla Health providers.",
				],
			},
		],
		whyChooseTitle: "Why Use the Provider Portal?",
		whyChoosePoints: [
			"Streamline updates: Easily submit and manage provider information.",
			"Access resources: Find guides and support tools tailored to your needs.",
			"Stay informed: Receive notifications about changes and updates.",
		],
		howToGetStarted: {
			title: "To Complete the Registration Process:",
			steps: [
				"Click on 'New User Request'.",
				"Enter your group administrator ID (email) currently on file with Tilla Health.",
				"You will receive an email with instructions to complete registration.",
			],
		},
		promiseSection: {
			title: "Need Assistance?",
			content:
				"For assistance with registration, please send a detailed email to providerrelations@tillahealth.com.",
		},
		callToAction: {
			title: "Contact Us",
			content:
				"If you have further questions, feel free to reach out to your provider relations associate.",
			buttonText: "Email Provider Relations",
			buttonLink: "mailto:providerrelations@tillahealth.com",
		},
	},
	"broker-portal": {
		title: "Features of the Broker Portal",
		headerImage: "broker4" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"Health plans looking to increase their enrollment and retention rates must lean on the support of distribution partners, especially brokers. Provide brokers with the tools and platform needed to scale with increasing membership rates and interact with enrollees for a customized user experience.",
		keyfeaturetitle: "Key Features",
		features: [
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Dashboard Overview",
				features: [
					"View your portfolio at a glance, including active clients, pending enrollments, and commissions.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Client Management",
				features: [
					"Access detailed information about your clients, including policy details, enrollment status, and contact information.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Real-Time Updates",
				features: [
					"Stay informed with updates on new plans, changes to policies, and important announcements.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Commission Tracking",
				features: [
					"Monitor your earnings with transparent commission reports and payment schedules.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Support Resources",
				features: [
					"Access training materials, marketing collateral, and support documentation to help you better serve your clients.",
				],
			},
		],
		whyChooseTitle: "Why Use the Broker Portal?",
		whyChoosePoints: [
			"Enhance client engagement: Utilize tools designed for better client interaction.",
			"Streamline operations: Manage your clients efficiently and effectively.",
			"Stay updated: Receive timely notifications about policy changes and new offerings.",
		],
		howToGetStarted: {
			title: "Get Started with the Broker Portal",
			steps: [
				"Visit the Broker Portal to register and create your account.",
				"Familiarize yourself with the dashboard and available resources.",
				"Start managing your clients and tracking your commissions.",
			],
		},
		promiseSection: {
			title: "Our Commitment to Brokers",
			content:
				"Tilla Health is dedicated to providing brokers with the tools and support needed for success in managing their clients.",
		},
		callToAction: {
			title: "Need More Information?",
			content: "For further assistance or inquiries, please reach out to us.",
			buttonText: "Contact Provider Relations",
			buttonLink: "mailto:tillahealth2024@gmail.com",
		},
	},
	"why-partner-with-tilla": {
		title: "Why Partner with Tilla Health?",
		headerImage: "broker3" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"Partnering with Tilla Health brings numerous benefits to enhance your offerings. By collaborating with us, you'll gain access to a comprehensive suite of health insurance plans, dedicated support from our experienced team, and innovative tools designed to streamline your operations. Together, we can provide exceptional value to your clients and ensure they receive the best possible care.",
		keyfeaturetitle: "Key Features",
		features: [
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Comprehensive Plans",
				features: [
					"Offer your clients a range of plans tailored to their needs, from individual and family plans to NGO and Diaspora Health Connect options.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Dedicated Support",
				features: [
					"Our team is here to assist you at every step, ensuring your success as a valued partner.",
				],
			},
			{
				icon: null, // No specific icon provided; adjust as necessary
				title: "Innovative Tools",
				features: [
					"Leverage cutting-edge technology to provide your clients with the best service possible.",
				],
			},
		],
		whyChooseTitle: "Why Choose Tilla Health?",
		whyChoosePoints: [
			"Access to a diverse range of health insurance plans tailored for individuals, families, and organizations.",
			"Comprehensive training and ongoing support to help you succeed in your role as a broker.",
			"Streamlined processes and tools that simplify client management and enrollment.",
			"Regular updates on policy changes and new offerings to keep you informed and competitive.",
			"A strong commitment to ethical practices and customer satisfaction, ensuring trust and reliability.",
		],
		howToGetStarted: {
			title: "Getting Started as a Health Insurance Broker with Tilla Health",
			steps: [
				"Register on the Tilla Health to create your broker account and access the Broker Portal.",
				"Complete the required onboarding training to familiarize yourself with our health plans and services.",
				"Access our marketing materials and resources to effectively promote your offerings.",
				"Start connecting clients with personalized health insurance solutions that meet their needs.",
			],
		},
		promiseSection: {
			title: "Our Commitment to Partners",
			content:
				"Tilla Health is dedicated to supporting our partners with the resources and assistance needed for success.",
		},
		callToAction: {
			title: "Join Us Today!",
			content:
				"For more information on partnership opportunities, please reach out to us.",
			buttonText: "Contact Provider Relations",
			buttonLink: "mailto:tillahealth2024@gmail.com",
		},
	},
	"become-a-broker": {
		title: "Become a Broker",
		headerImage: "broker1" as keyof typeof IMAGES, // Adjust image as necessary
		introduction:
			"At Tilla Health, we value our partnerships with brokers who connect individuals, families, and organizations to the health coverage they need. This portal is designed to streamline your experience, giving you all the tools and resources to manage your accounts effectively.",
		keyfeaturetitle: "Key Features",
		features: [
			{
				icon: <BookOpen className="h-12 w-12 text-primary mb-4" />,
				title: "Comprehensive Resources",
				features: [
					"Access a wide range of training materials and documentation to enhance your knowledge.",
					"Utilize marketing tools and resources to effectively promote our health plans.",
				],
			},
			{
				icon: <HelpCircle className="h-12 w-12 text-primary mb-4" />,
				title: "Dedicated Support",
				features: [
					"Our experienced support team is here to assist you with any questions or issues.",
					"Receive timely responses and guidance to ensure your success as a broker.",
				],
			},
			{
				icon: <Network className="h-12 w-12 text-primary mb-4" />,
				title: "Networking Opportunities",
				features: [
					"Join a community of brokers to share insights and best practices.",
					"Participate in events and forums to enhance your connections and knowledge.",
				],
			},
			{
				icon: <Bot className="h-12 w-12 text-primary mb-4" />,
				title: "Innovative Technology",
				features: [
					"Leverage cutting-edge tools to streamline client management and enrollment processes.",
					"Access an intuitive portal for real-time updates and resources.",
				],
			},
		],
		whyChooseTitle: "Why Partner with Tilla Health?",
		whyChoosePoints: [
			"Access to a comprehensive network of healthcare services.",
			"Support for credentialing and application processes.",
			"Regular updates and communication regarding provider status.",
		],
		howToGetStarted: {
			title: "How to Get Started as a Broker",
			steps: [
				"Register on the Tilla Health Broker Portal.",
				"Complete the necessary forms to establish your broker account.",
				"Attend an orientation session to learn about our services and resources.",
				"Start connecting clients with the health coverage they need.",
			],
		},
		promiseSection: {
			title: "Our Commitment to Brokers",
			content:
				"Tilla Health is dedicated to supporting our brokers and ensuring a smooth partnership. We are here to assist you at every step.",
		},
		callToAction: {
			title: "Ready to Join Us?",
			content:
				"For assistance with broker registration, credentialing, or any inquiries, contact us today.",
			buttonText: "Contact Provider Relations",
			buttonLink: "mailto:tillahealth2024@gmail.com",
		},
	},
};
