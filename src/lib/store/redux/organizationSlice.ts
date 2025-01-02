import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	organizationSlice: {
		id: 0,
		name: "",
		registration_number: "",
		industry_type: "",
		number_of_employees: "",
		company_website: "",
		plan_coverage_type: "",
		preferred_start_date: "",
		preferred_end_date: "",
		sector: "",
		country_of_origin: "",
		country: "",
		street_address: "",
		street_address_line2: "",
		city: "",
		region: "",
		kifle_ketema: "",
		zip_code: "",
		phone_number: "",
		email_address: "",
		contact_person_first_name: "",
		contact_person_middle_name: "",
		contact_person_last_name: "",
		contact_person_position: "",
		contact_person_phone_number: "",
		contact_person_email_address: "",
	},
};

const organizationSlice = createSlice({
	name: "organization",
	initialState,
	reducers: {
		SetorganizationSlice: (state, action) => {
			state.organizationSlice = action.payload;
		},
		ClearorganizationSlice: (state) => {
			state.organizationSlice = initialState.organizationSlice; // Resets to initial state
		},
	},
});

export const { SetorganizationSlice, ClearorganizationSlice } =
	organizationSlice.actions;
export default organizationSlice.reducer;
