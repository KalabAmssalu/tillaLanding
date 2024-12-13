import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	brokerSlice: {
		first_name: "",
		last_name: "",
		middle_initial: "",
		first_name_amharic: "",
		last_name_amharic: "",
		middle_initial_amharic: "",
		gender: "male",
		date_of_birth: "",
		email_address: "",
		phone_number: "",
		company_name: "",
		business_type: "Private",
		business_license_number: "",
		tax_identification_number: "",
		business_address_line_1: "",
		business_address_line_2: "",
		business_city: "",
		business_state: "",
		business_kifle_ketema: "",
		business_zip_code: "",
		broker_type: "",
		license_state: "",
		license_issued_date: "",
		license_expired_date: "",
	},
};

const brokerSlice = createSlice({
	name: "broker",
	initialState,
	reducers: {
		SetBrokerSlice: (state, action) => {
			state.brokerSlice = action.payload;
		},
		ClearBrokerSlice: (state) => {
			state.brokerSlice = initialState.brokerSlice; // Resets to initial state
		},
	},
});

export const { SetBrokerSlice, ClearBrokerSlice } = brokerSlice.actions;
export default brokerSlice.reducer;
