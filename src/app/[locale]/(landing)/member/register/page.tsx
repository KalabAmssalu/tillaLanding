"use client";

import { useRouter, useSearchParams } from "next/navigation";

import MemberRegForm from "@/components/module/registeration/member/MemberRegForm";
import BreadcrumbNav from "@/components/shared/Navigations/breadcrambNav";
import { Button } from "@/components/ui/button";

export default function MemberRegistration() {
	const searchParams = useSearchParams();
	const type = searchParams.get("type") || undefined;
	const self = searchParams.get("self") || undefined;
	const router = useRouter();
	return (
		<div className="p-4">
			<BreadcrumbNav
				items={[
					{ label: "Select Plan", href: "/member/" },
					{ label: `${type} Registration` },
				]}
			/>

			<div className="container mx-auto py-10">
				{type ? (
					<MemberRegForm info={{ type, self }} />
				) : (
					<div className="container mx-auto py-10 h-screen">
						<h1 className="text-3xl font-bold mb-6 text-center text-primary">
							Please reselect the type of member you are registering for.
						</h1>
						Tilla Health Insurance offers a wide range of benefits to
						individuals and families. Choose the type of member you are
						registering for to get started.
						<div className="flex md:flex-row flex-col items-center justify-center gap-4 mt-10">
							<Button
								className="w-40"
								onClick={() =>
									router.push(
										"/member/register?type=individual&self=true" as `/${string}`
									)
								}
							>
								Individual
							</Button>
							<Button
								className="w-40"
								onClick={() =>
									router.push(
										"/member/register?type=family&self=true" as `/${string}`
									)
								}
							>
								Family
							</Button>
							<Button
								className="w-40"
								onClick={() =>
									router.push(
										"/member/register?type=diaspora&self=true" as `/${string}`
									)
								}
							>
								Diaspora
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
