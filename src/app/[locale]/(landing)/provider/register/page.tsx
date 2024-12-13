import ProviderRegForm from "@/components/module/registeration/provider/ProviderRegForm";
import ProviderRegistration from "@/components/module/registeration/provider/ProviderRegistration";

export default function ProviderRegistrationPage() {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6 text-center text-primary">
				Provider Registration
			</h1>
			<ProviderRegForm />
		</div>
	);
}
