"use server";

import { type checkoutType } from "@/types/pricing/PricingType";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function setCheckoutChapa(data: checkoutType) {
	try {
		const response = await axiosInstance.post("payments/chapa-checkout", data);
		console.log("response", response.data);

		return {
			ok: true,
			message: "ወደ ክፍያ መክፈያው ሄደው ይሙሉ!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function setCheckoutStrip(data: checkoutType) {
	try {
		const response = await axiosInstance.post("payments/stripe-checkout", data);
		console.log("response", response.data);

		return {
			ok: true,
			message: "ወደ ክፍያ መክፈያው ሄደው ይሙሉ!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}