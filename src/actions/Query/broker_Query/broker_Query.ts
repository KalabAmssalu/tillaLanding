import { setBroker } from "@/actions/broker/action";
import useToastMutation from "@/hooks/useToastMutation";
import { type BrokerType } from "@/types/broker/BrokerType";

export const useAddbroker = () => {
	return useToastMutation<BrokerType>(
		"addbroker",
		setBroker,
		"Member creating...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the broker data you passed in
				console.log("broker created successfully:", data.message);
				console.log("New broker Data:", variables);

				// queryClient.invalidateQueries({ queryKey: ["brokers"] });
				// Example: Display a message with the broker name
			},
			onError: (error) => {
				console.error("Error creating broker:", error.response.data);
			},
		}
	);
};
