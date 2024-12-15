"use client";

import DiscoverPlans from "@/components/module/landing/DiscoverPlan";
import BreadcrumbNav from "@/components/shared/Navigations/breadcrambNav";

const MemeberScreen = () => {
	return (
		<div className="min-h-screen bg-muted">
			<BreadcrumbNav items={[{ label: "Member" }]} />
			<div className="flex items-center justify-center  min-h-[calc(100vh-40px)]">
				<div className="pt-14">
					<h1 className="text-4xl text-center font-bold mb-4">
						Welcome to Our Membership Registeration
					</h1>
					<p className="mb-8 text-center">
						Start your membership journey by selecting a plan that suits you.
					</p>
					<DiscoverPlans chooseplan={false} />
				</div>
			</div>
		</div>
	);
};

export default MemeberScreen;
