import ContactScreen from "@/components/screen/contactScreen/ContactScreen";
import BreadcrumbNav from "@/components/shared/Navigations/breadcrambNav";

type Props = {};

const page = (props: Props) => {
	return (
		<div className="p-4">
			<BreadcrumbNav items={[{ label: "Contact Us" }]} />
			<div className="container mx-auto py-10">
				<ContactScreen />
			</div>
		</div>
	);
};

export default page;
