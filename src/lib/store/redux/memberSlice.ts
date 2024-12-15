import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	memberSlice: {
		id: 0,
		member_id: "",
		family_id: "",
		date_of_birth: "",
		first_name: "",
		last_name: "",
		middle_name: "",
		amharic_first_name: "",
		amharic_last_name: "",
		amharic_middle_name: "",
		gender: "",
		insurance_type: "",
		has_transport_subscription: false,
		marital_status: "",
		member_organization_type: "",
		benefit_plan: "",
		member_payment_duty: 0,
		member_type: "",
		member_status: "",
		phone_number: "",
		email_address: "",
		mailing_address_line1: "",
		country: "",
		street_address: "",
		city: "",
		region: "",
		kifle_ketema: "",
		representative_first_name: "",
		representative_last_name: "",
		representative_middle_name: "",
		representative_gender: "",
		representative_date_of_birth: "",
		representative_marital_status: "",
		representative_mailing_address_line1: "",
		representative_country: "",
		representative_street_address: "",
		representative_city: "",
		representative_region: "",
		representative_kifle_ketema: "",
		representative_phone_number: "",
		representative_email_address: "",
		relationship_to_member: "",
		is_representative: false,
		height: 0,
		weight: 0,
		tin_number: "",
		max_out_of_pocket: 0,
		max_out_of_pocket_etb: 0,
		total_medical_expense: 0,
		deductible_type: "",
		deductible: 0,
		payment_date: "",
		benefit_begin_date: "",
		dependent_of: 0,
	},
};

const memberSlice = createSlice({
	name: "member",
	initialState,
	reducers: {
		SetmemberSlice: (state, action) => {
			state.memberSlice = action.payload;
		},
		ClearmemberSlice: (state) => {
			state.memberSlice = initialState.memberSlice; // Resets to initial state
		},
	},
});

export const { SetmemberSlice, ClearmemberSlice } = memberSlice.actions;
export default memberSlice.reducer;
