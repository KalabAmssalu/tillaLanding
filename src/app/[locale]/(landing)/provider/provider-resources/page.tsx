import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { IMAGES } from "@/constants/files";

export default function info_update() {
	return (
		<article className="container max-w-6xl flex items-center justify-center flex-col mx-auto px-4 mb-20 py-8">
			<Image
				src={IMAGES.provider}
				alt="Claims, Appeals, and Grievances"
				width={1000}
				className="rounded-lg h-[300px] bg-cover shadow-md mb-8"
			/>
			<h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
				Provider Resource
			</h1>
			<Separator className="bg-primary h-1 mb-12" />

			<section className="space-y-8">
				<div>
					<p className=" text-lg leading-relaxed mb-6">
						All general provider updates, including changes in office
						demographics, must be submitted to Tilla Health at least 30 days
						before the desired effective date.
					</p>
					<p className=" text-lg leading-relaxed mb-6">
						For changes to Tax ID numbers, providers must provide a 45-day
						written notice. Tilla Health will confirm receipt of the Tax ID
						update in writing within 30 days of acceptance. This change may
						require a new provider contract. For questions, please contact your
						provider relations associate.
					</p>
					<p className=" text-lg leading-relaxed mb-6">
						The Tilla Health Provider Web Portal serves as a quality control
						tool, allowing providers to view and manage their information within
						our system. Your provider details are shared with Tilla Health
						members and the provider community via our “Find a Provider”
						website. Other systems within Tilla Health use this information to
						process authorizations, claims, and reimbursement checks.
					</p>
					<h3 className="text-2xl font-semibold  mb-4">
						Provider web portal services include:
					</h3>
					<ul className="list-disc list-inside  mb-6">
						<li>New user registration</li>
						<li>Password reset</li>
						<li>Provider and group changes</li>
						<li>Review of change summaries</li>
						<li>Quarterly data validations</li>
						<li>Access to the Provider Web Portal user guide</li>
					</ul>
					<p className=" text-lg leading-relaxed mb-6">
						Visit the Tilla Health Provider Web Portal at{" "}
						<a href="http://portal.link" className="text-blue-500 underline">
							portal link
						</a>{" "}
						to register.
					</p>
					<h3 className="text-2xl font-semibold  mb-4">
						Before registering, please have the following information:
					</h3>
					<ul className="list-disc list-inside  mb-6">
						<li>Group DBA (Doing Business As) Name</li>
						<li>Group Tax ID</li>
						<li>Group Type II NPI (Group NPI)</li>
					</ul>
					<h3 className="text-2xl font-semibold  mb-4">
						To complete the registration process:
					</h3>
					<ol className="list-decimal list-inside  mb-6">
						<li>Click on &quot;New User Request&quot;</li>
						<li>
							Enter your group administrator ID (email) currently on file with
							Tilla Health
						</li>
						<li>
							You will receive an email with instructions to complete
							registration
						</li>
					</ol>
					<p className=" text-lg leading-relaxed mb-6">
						For assistance with registration, please send a detailed email to{" "}
						<a
							href="mailto:providerrelations@tillahealth.com"
							className="text-blue-500 underline"
						>
							providerrelations@tillahealth.com
						</a>
						.
					</p>
				</div>
			</section>
		</article>
	);
}
