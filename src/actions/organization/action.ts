"use server";

import { type organizationType } from "@/types/organization/organization";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function useAddorganization(data: Partial<organizationType>) {
	try {
		const response = await axiosInstance.post("members/organization/", data);
		console.log("response", response.data);
		return {
			ok: true,
			message: "New Organization is created!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
