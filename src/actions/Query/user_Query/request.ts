import { verify } from "crypto";
import { toast } from "sonner";

import { sendOTP, verifyOTP } from "@/actions/auth/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { SetUserSlice } from "@/lib/store/redux/userSlice";
import { type otpVerifyType } from "@/types/user";

export const useSendOTP = () => {
	return useToastMutation<string>("sendOTP", sendOTP, "Sending OTP...", {
		onSuccess: async (data, variables) => {
			// 'data' contains the response from the server
			// 'variables' contains the memeber data you passed in
			console.log("Otp sent successfully:", data.message);
			console.log("Recieved data:", data);

			// queryClient.invalidateQueries({ queryKey: ["memebers"] });
			// Example: Display a message with the memeber name
		},
		onError: (error) => {
			console.error("Error creating memeber:", error);
		},
	});
};
export const useVerifyOTP = () => {
	const dispatch = useAppDispatch();
	return useToastMutation<otpVerifyType>(
		"verifyOTP",
		verifyOTP,
		"Verifying OTP...",
		{
			onSuccess: async (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the memeber data you passed in
				console.log("Otp Verified successfully:", data.message);
				console.log("Recieved data:", data);
				dispatch(SetUserSlice({ email: variables.email, verify: true }));
				// queryClient.invalidateQueries({ queryKey: ["memebers"] });
				// Example: Display a message with the memeber name
			},
			onError: (error) => {
				console.error("Error verifying a userr:", error);
			},
		}
	);
};
