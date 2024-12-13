import { setMemeberIndividual } from "@/actions/member/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { SetIndividualSlice } from "@/lib/store/redux/individualSlice";
import { type memeberType } from "@/types/memeber/memeber";

// export const useFetchmemebers = () => {
// 	return useQuery<memeberListType[]>({
// 		queryKey: ["memebers"],
// 		queryFn: async () => {
// 			try {
// 				const data = await getmemeber();
// 				return data.data.memebers;
// 			} catch (error: any) {
// 				toast.error(error.message);
// 				throw error;
// 			}
// 		},
// 		enabled: true,
// 	});
// };
// export const useFetchOnememebers = (id: string, enabled: boolean = true) => {
// 	return useQuery<memeberTypeToUpdate>({
// 		queryKey: ["Onememebers"],
// 		queryFn: async () => {
// 			try {
// 				const data = await getOnememeber(id);
// 				return data.data.memeber;
// 			} catch (error: any) {
// 				toast.error(error.message);
// 				throw error;
// 			}
// 		},
// 		enabled: enabled,
// 	});
// };

export const useAddmemeber = () => {
	const dispatch = useAppDispatch();
	return useToastMutation<memeberType>(
		"addmemeber",
		setMemeberIndividual,
		"Member creating...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the memeber data you passed in
				console.log("memeber created successfully:", data.message);
				console.log("New memeber Data:", data);

				dispatch(SetIndividualSlice(data.data));
				// queryClient.invalidateQueries({ queryKey: ["memebers"] });
				// Example: Display a message with the memeber name
			},
			onError: (error) => {
				console.error("Error creating memeber:", error);
			},
		}
	);
};

// export const useUpdatememeber = () => {
// 	return useToastMutation<memeberTypeToUpdate>(
// 		"updatememeber",
// 		updatememeber,
// 		"የመምሪያው መገለጫ በማሻሻል...",
// 		{
// 			onSuccess: (data, variables) => {
// 				// 'data' contains the response from the server
// 				// 'variables' contains the memeber data you passed in
// 				console.log("memeber updated successfully:", data.message);
// 				console.log("New memeber Data:", variables);
// 			},
// 			onError: (error) => {
// 				console.error("Error creating memeber:", error);
// 			},
// 		}
// 	);
// };

// export const useDeletememeber = () => {
// 	return useToastMutation<string>(
// 		"updatememeber",
// 		deletememeber,
// 		"የመምሪያው መገለጫ በማሻሻል...",
// 		{
// 			onSuccess: (data, variables) => {
// 				// 'data' contains the response from the server
// 				// 'variables' contains the memeber data you passed in
// 				console.log("memeber deleted successfully:", data.message);
// 				console.log("New memeber Data:", variables);
// 			},
// 			onError: (error) => {
// 				console.error("Error creating memeber:", error);
// 			},
// 		}
// 	);
// };
