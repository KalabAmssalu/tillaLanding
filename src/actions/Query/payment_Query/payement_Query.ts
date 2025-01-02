// Assuming you have a setCheckout action in your actions directory
import { useRouter } from "next/navigation";

import { setCheckoutChapa, setCheckoutStrip } from "@/actions/pricing/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { ClearUserSlice } from "@/lib/store/redux/userSlice";
import { type checkoutType } from "@/types/pricing/PricingType";

export const useCheckoutChapa = () => {
	const dispatch = useAppDispatch();

	return useToastMutation<checkoutType>(
		"checkout",
		setCheckoutChapa,
		"Processing checkout...",
		{
			onSuccess: async (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the checkout data you passed in
				console.log("Checkout successful:", data.message);
				console.log("Checkout Data:", data);

				// Use a type guard to ensure 'checkout_url' exists
				if (data.ok && isCheckoutData(data.data)) {
					const paymentLink = data.data.checkout_url;
					// window.open(paymentLink, "_blank"); // Open payment link in a new tab
					window.location.href = paymentLink;
				} else {
					console.error("Invalid data structure:", data.data);
				}
				await dispatch(ClearUserSlice());
				// Optionally, update the Redux state with checkout data
				// dispatch(SetCheckoutSlice(data.data));

				// You can invalidate queries or trigger other actions if needed
				// queryClient.invalidateQueries({ queryKey: ["checkout"] });
			},
			onError: (error) => {
				console.error("Error during checkout:", error);
			},
		}
	);
};

export const useCheckoutStrip = () => {
	const dispatch = useAppDispatch();
	return useToastMutation<checkoutType>(
		"checkout",
		setCheckoutStrip,
		"Processing checkout...",
		{
			onSuccess: async (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the checkout data you passed in
				console.log("Checkout successful:", data.message);
				console.log("Checkout Data:", data);
				// Use a type guard to ensure 'checkout_url' exists
				if (data.ok && isCheckoutData(data.data)) {
					const paymentLink = data.data.checkout_url;
					// window.open(paymentLink, "_blank"); // Open payment link in a new tab
					window.location.href = paymentLink;
				} else {
					console.error("Invalid data structure:", data.data);
				}
				await dispatch(ClearUserSlice());
				// Optionally, update the Redux state with checkout data
				// dispatch(SetCheckoutSlice(data.data));

				// You can invalidate queries or trigger other actions if needed
				// queryClient.invalidateQueries({ queryKey: ["checkout"] });
			},
			onError: (error) => {
				console.error("Error during checkout:", error);
			},
		}
	);
};

// Type guard function to check for 'checkout_url'
function isCheckoutData(data: any): data is { checkout_url: string } {
	return typeof data?.checkout_url === "string";
}
