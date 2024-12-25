import { setFamilyMember } from "@/actions/member/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { clearFamilyMembers } from "@/lib/store/redux/familyMemberSlice";
import { clearFamily, setFamily } from "@/lib/store/redux/familySlice";
import { ClearmemberSlice } from "@/lib/store/redux/memberSlice";
import { ClearUserSlice } from "@/lib/store/redux/userSlice";
import { type familyType } from "@/types/memeber/memeber";

export const useAddFamily = () => {
	const dispatch = useAppDispatch();
	return useToastMutation<Partial<familyType[]>>(
		"addfamily",
		setFamilyMember,
		"Family Member creating...",
		{
			onSuccess: async (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the memeber data you passed in
				console.log("Family memeber created successfully:", data.message);
				console.log("New memeber Data:", data);
				await dispatch(clearFamily());
				await dispatch(ClearmemberSlice());
				await dispatch(clearFamilyMembers());
				console.log("data", data.data);
				dispatch(setFamily(data.data as familyType[]));
				dispatch(ClearUserSlice());
				// queryClient.invalidateQueries({ queryKey: ["memebers"] });
				// Example: Display a message with the memeber name
			},
			onError: (error) => {
				console.error("Error creating memeber:", error);
			},
		}
	);
};
