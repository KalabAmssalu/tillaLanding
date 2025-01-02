"use server";

import { type BrokerType } from "@/types/broker/BrokerType";

import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";

// const API_POST = `${process.env.REACT_APP_BASE_URL}/members/individual`;

export async function setBroker(data: BrokerType) {
	try {
		const response = await axiosInstance.post("brokers/", data);
		console.log("response", response.data);
		return {
			ok: true,
			message: "New Broker is Added",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
