"use client";

import { useRouter, useSearchParams } from "next/navigation";

import OrganizationRegForm from "@/components/module/registeration/organization/OrganizationRegForm";
import BreadcrumbNav from "@/components/shared/Navigations/breadcrambNav";
import { Button } from "@/components/ui/button";

export default function MemberRegistration() {
	const searchParams = useSearchParams();
	const type = searchParams.get("type") || undefined;

	const router = useRouter();
	return (
		<div className="p-4">
			<BreadcrumbNav
				items={[
					{ label: "Select Plan", href: "/member/" },
					{ label: `${type} Sector member Registration` },
				]}
			/>

			<div className="container mx-auto py-10">
				{type ? (
					<OrganizationRegForm info={{ type }} />
				) : (
					<div className="container mx-auto py-10 h-screen">
						<h1 className="text-3xl font-bold mb-6 text-center text-primary">
							Please reselect the type of membership you are registering for.
						</h1>
						Tilla Health Insurance offers a wide range of benefits to
						organizations. Choose the type of membership you are registering for
						to get started.
						<div className="flex md:flex-row flex-col items-center justify-center gap-4 mt-10">
							<Button
								className="w-40"
								onClick={() =>
									router.push("/organization/register?type=ngo" as `/${string}`)
								}
							>
								NGO
							</Button>
							<Button
								className="w-40"
								onClick={() =>
									router.push(
										"/organization/register?type=private" as `/${string}`
									)
								}
							>
								Private Sector
							</Button>
							<Button
								className="w-40"
								onClick={() =>
									router.push(
										"/organization/register?type=federal" as `/${string}`
									)
								}
							>
								Federal Employee
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
