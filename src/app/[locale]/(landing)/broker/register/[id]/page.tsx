"use client";

import { useParams } from "next/navigation";

import BrokerFromScreen from "@/components/screen/brokerScreen/BrokerFromScreen";

const Page = () => {
	const { id } = useParams();

	// Handle id as string or string[]
	const numericId = Array.isArray(id)
		? parseInt(id[0], 10)
		: id
			? parseInt(id, 10)
			: 0;

	if (isNaN(numericId)) {
		// Handle invalid or missing ID gracefully
		return <div>Error: Invalid ID</div>;
	}

	return (
		<div>
			<BrokerFromScreen type={numericId} />
		</div>
	);
};

export default Page;
