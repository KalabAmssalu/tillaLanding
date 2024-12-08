import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { IMAGES } from "@/constants/files";

export default function claim_appeal() {
	return (
		<article className="container max-w-6xl flex items-center justify-center flex-col mx-auto px-4 mb-20 py-8">
			<Image
				src={IMAGES.sampleImage5}
				alt="Claims, Appeals, and Grievances"
				width={1000}
				className="rounded-lg h-[300px] bg-cover shadow-md mb-8"
			/>
			<h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
				Claims, Appeals, and Grievances
			</h1>
			<Separator className="bg-primary h-1 mb-12" />

			<section className="space-y-8">
				<div>
					<h2 className="text-2xl font-semibold mb-4">Claims</h2>
					<p className=" leading-relaxed">
						A claim is a request from a patient or provider to Tilla Health for
						payment for services rendered. Our Claims department is available to
						assist you at{" "}
						<a href="tel:8002613371" className="text-blue-600 hover:underline">
							800-261-3371
						</a>
						, Monday through Friday, 8:30 a.m. to 5 p.m. For information on
						claim status or to look up claims online, please{" "}
						<a href="#" className="text-blue-600 hover:underline">
							click here
						</a>
						.
					</p>
				</div>

				<div>
					<h2 className="text-2xl font-semibold mb-4">
						Claims Payment Dispute
					</h2>
					<p className=" leading-relaxed">
						A claims payment dispute is a request from a healthcare provider for
						a post-service review of claims that have been denied or underpaid.
						This process is not a pre-service appeal or an administrative
						appeal. Tilla Health has created a Claims Payment Dispute Form,
						which providers must complete in full, including all necessary
						documentation.
					</p>
					<a href="#" className="text-blue-600 hover:underline block mt-2">
						Click here for more information regarding claims payment disputes.
					</a>
				</div>

				<div>
					<h2 className="text-2xl font-semibold mb-4">Appeals</h2>
					<p className=" leading-relaxed">
						Tilla Health recognizes the right of a member (enrollee), their
						authorized representative, or providers (such as clinicians or
						facilities) to request an appeal of an adverse action (denial) that
						may result in financial liability for the member or a denied
						service. Tilla Health reviews all appeal requests promptly and
						appropriately, ensuring the appeals process is communicated in a
						culturally and linguistically appropriate manner. Information about
						this process is provided in our newsletters, member handbook, and
						provider manual.
					</p>
					<a href="#" className="text-blue-600 hover:underline block mt-2">
						Click here for more information and resources regarding appeals.
					</a>
				</div>

				<div>
					<h2 className="text-2xl font-semibold mb-4">Grievances</h2>
					<p className=" leading-relaxed">
						Tilla Health maintains a process for logging and managing grievances
						and appeals of grievance resolutions to ensure they are resolved in
						a manner consistent with our service standards, responsive to the
						needs of members and providers, and compliant with state and
						regulatory standards. This process also enables tracking and
						reporting. For more information, please contact Member Services at{" "}
						<a href="tel:8884043549" className="text-blue-600 hover:underline">
							888-404-3549
						</a>
						.
					</p>
				</div>
			</section>
		</article>
	);
}
