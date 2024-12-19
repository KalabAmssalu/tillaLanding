// Assuming you have a setCheckout action in your actions directory
import { useRouter } from "next/navigation";

import { setCheckoutChapa, setCheckoutStrip } from "@/actions/pricing/action";
import useToastMutation from "@/hooks/useToastMutation";
import { type checkoutType } from "@/types/pricing/PricingType";

export const useCheckoutChapa = () => {
	// const dispatch = useAppDispatch();
	const router = useRouter();

	return useToastMutation<checkoutType>(
		"checkout",
		setCheckoutChapa,
		"Processing checkout...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the checkout data you passed in
				console.log("Checkout successful:", data.message);
				console.log("Checkout Data:", data);

				// Use a type guard to ensure 'checkout_url' exists
				if (data.data) {
					// const paymentLink = data.data.payment_link as string;
					const paymentLink = (data.data as { payment_link: string })
						.payment_link;
					window.open(paymentLink, "_blank"); // Open payment link in a new tab
					const type = "family"; // Replace with the actual type source
					router.push(
						`/success?type=${type}&title=Registration Successful&message=Congratulations! You're now part of our platform.&redirectPath=/home&buttonText=Go to Dashboard` as `/${string}`
					);
				} else {
					console.error("Invalid data structure:", data.data);
				}
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
	// const dispatch = useAppDispatch();
	const router = useRouter();
	return useToastMutation<checkoutType>(
		"checkout",
		setCheckoutStrip,
		"Processing checkout...",
		{
			onSuccess: (data, variables) => {
				// 'data' contains the response from the server
				// 'variables' contains the checkout data you passed in
				console.log("Checkout successful:", data.message);
				console.log("Checkout Data:", data);
				// Use a type guard to ensure 'checkout_url' exists
				if (data.ok && isCheckoutData(data.data)) {
					const paymentLink = data.data.checkout_url;
					window.open(paymentLink, "_blank"); // Open payment link in a new tab
				} else {
					console.error("Invalid data structure:", data.data);
				}

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
function isCheckoutchapa(data: any): data is { payment_link: string } {
	return typeof data?.checkout_url === "string";
}
