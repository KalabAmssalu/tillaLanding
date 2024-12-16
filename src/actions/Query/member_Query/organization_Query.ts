import { useAddorganization } from "@/actions/organization/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { SetmemberSlice } from "@/lib/store/redux/memberSlice";
import { type organizationType } from "@/types/organization/organization";

export const useAddOrganization = () => {
	const dispatch = useAppDispatch();
	return useToastMutation<Partial<organizationType>>(
		"addOrganization",
		useAddorganization,
		"Organization creating...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the memeber data you passed in
				console.log("Organization created successfully:", data.message);
				console.log("New Organization Data:", data);

				dispatch(SetmemberSlice(data.data));
				// queryClient.invalidateQueries({ queryKey: ["Organizations"] });
				// Example: Display a message with the Organization name
			},
			onError: (error) => {
				console.error("Error creating Organization:", error);
			},
		}
	);
};
