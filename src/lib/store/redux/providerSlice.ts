import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	providerSlice: {
		tin_number: "",
		institute_name: "",
		provider_npi_id: "",
		provider_last_name: "",
		provider_first_name: "",
		provider_middle_initial: "",
		provider_last_name_amharic: "",
		provider_first_name_amharic: "",
		provider_middle_initial_amharic: "",
		provider_title: "",
		provider_gender: "male",
		provider_date_of_birth: "",
		provider_contact_person: "",
		provider_contact_email: "",
		provider_contact_phone_number: "",
		provider_discount_agreement: 0,
		provider_health_sub_tier: "",
		provider_health_tier: "",
		provider_service_type: "institute",
		provider_address: "",
		provider_address_line2: "",
		provider_city: "",
		provider_country: "",
		provider_region: "",
		provider_kifle_ketema: "",
		provider_zip_code: "",
		provider_phone_number: "",
		provider_fax: "",
		provider_email: "",
		provider_type: "",
		provider_primary_specialty: "",
		provider_sub_specialty: "",
		provider_group_name: "",
		provider_group_contact_person: "",
		provider_group_phone_number: "",
		provider_group_contact_email: "",
		provider_group_address: "",
		provider_place_of_work: "",
	},
};

const providerSlice = createSlice({
	name: "provider",
	initialState,
	reducers: {
		SetProviderSlice: (state, action) => {
			state.providerSlice = action.payload;
		},
		ClearProviderSlice: (state) => {
			state.providerSlice = initialState.providerSlice; // Resets to initial state
		},
	},
});

export const { SetProviderSlice, ClearProviderSlice } = providerSlice.actions;
export default providerSlice.reducer;
