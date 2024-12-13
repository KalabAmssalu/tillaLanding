import { setProvider } from "@/actions/provider/action";
import useToastMutation from "@/hooks/useToastMutation";
import { ProviderType } from "@/types/provider/ProviderType";

export const useAddproviderMutation = () => {
	return useToastMutation<ProviderType>(
		"addprovider",
		setProvider,
		"Member creating...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the broker data you passed in
				console.log("provider created successfully:", data.message);
				console.log("New provider Data:", variables);

				// queryClient.invalidateQueries({ queryKey: ["providers"] });
				// Example: Display a message with the provider name
			},
			onError: (error) => {
				console.error("Error creating provider:", error.response.data);
			},
		}
	);
};
