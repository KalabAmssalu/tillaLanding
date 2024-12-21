import ProviderRegForm from "@/components/module/registeration/provider/ProviderRegForm";
import BreadcrumbNav from "@/components/shared/Navigations/breadcrambNav";

export default function ProviderRegistrationPage() {
	return (
		<div className="p-4">
			<BreadcrumbNav
				items={[
					{ label: "Select", href: "/providerpow" },
					{ label: "Provider Registration" },
				]}
			/>
			<div className="container mx-auto py-10">
				<h1 className="text-3xl font-bold mb-6 text-center text-primary">
					Provider Registration
				</h1>
				<ProviderRegForm />
			</div>
		</div>
	);
}
