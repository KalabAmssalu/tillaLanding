import BrokerRegForm from "@/components/module/registeration/broker/BrokerRegForm";

const BrokerFromScreen = ({ type }: { type: number }) => {
	if (type === 1) {
		return (
			<main className="container mx-auto p-4">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Broker Registration Form
				</h1>
				<BrokerRegForm brokerType={"broker"} />
			</main>
		);
	}
	return (
		<main className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6 text-center">
				Agent Registration Form
			</h1>
			<BrokerRegForm brokerType={"agent"} />
		</main>
	);
};

export default BrokerFromScreen;
