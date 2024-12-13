import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	individualSlice: {
		first_name: "",
		middle_name: "",
		last_name: "",
		first_name_Am: "",
		middle_name_Am: "",
		last_name_Am: "",
		phone_number: "",
		email_address: "",
		tin_number: "",
		gender: undefined,
		benefit_plan: undefined,
		date_of_birth: "",
		marital_status: undefined,
		height: "",
		weight: "",
		mailing_address_line1: "",
		kifle_ketema: "",
		country: "",
		region: "",
		street_address: "",
		city: "",
		id: 0,
	},
};

const individualSlice = createSlice({
	name: "individual",
	initialState,
	reducers: {
		SetIndividualSlice: (state, action) => {
			state.individualSlice = action.payload;
		},
		ClearIndividualSlice: (state) => {
			state.individualSlice = initialState.individualSlice; // Resets to initial state
		},
	},
});

export const { SetIndividualSlice, ClearIndividualSlice } =
	individualSlice.actions;
export default individualSlice.reducer;
