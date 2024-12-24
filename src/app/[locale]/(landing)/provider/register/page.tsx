"use client";

import { useRouter, useSearchParams } from "next/navigation";

import ProviderRegForm from "@/components/module/registeration/provider/ProviderRegForm";
import BreadcrumbNav from "@/components/shared/Navigations/breadcrambNav";
import { Button } from "@/components/ui/button";

export default function ProviderRegistrationPage() {
	const searchParams = useSearchParams();
	const type = searchParams.get("workplace") || undefined;
	const router = useRouter();

	return (
		<div className="p-4">
			<BreadcrumbNav
				items={[
					{ label: "Select", href: "/providerpow/select" },
					{ label: `${type} Registration` },
				]}
			/>
			<div className="container mx-auto py-10">
				{type ? (
					<>
						<h1 className="text-3xl font-bold mb-6 text-center text-primary">
							Provider Registration
						</h1>
						<ProviderRegForm type={type} />
					</>
				) : (
					<div className="container mx-auto text-center py-10 h-screen">
						<h1 className="text-3xl font-bold mb-6 text-center text-primary">
							Please reselect the place of work you are registering for.
						</h1>
						Tilla Health Insurance offers a wide range of benefits to Providers.
						Choose your workplace to get start your registration.
						<div className="flex md:flex-row flex-col items-center justify-center gap-4 mt-10">
							<Button
								className="w-52"
								onClick={() =>
									router.push(
										"/provider/register?workplace=local" as `/${string}`
									)
								}
							>
								Based in Ethiopia
							</Button>
							<Button
								className="w-52"
								onClick={() =>
									router.push(
										"/provider/register?workplace=international" as `/${string}`
									)
								}
							>
								Based outside of Ethiopia
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
