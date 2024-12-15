"use server";

import { type memeberType } from "@/types/memeber/memeber";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

export async function setMemeberIndividual(data: Partial<memeberType>) {
	try {
		const response = await axiosInstance.post("members/individual", data);
		console.log("response", response.data);
		return {
			ok: true,
			message: "አዲስ ተጠቃሚ በተሳካ ሁኔታ ፈጥረዋል!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
