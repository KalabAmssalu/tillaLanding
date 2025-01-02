import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { type familyType } from "@/types/memeber/memeber";

// Define the state structure
interface FamilyState {
	familyMembers: familyType[];
}

// Define the initial state
const initialState: FamilyState = {
	familyMembers: [
		{
			id: "",
			date_of_birth: "",
			first_name: "",
			last_name: "",
			middle_name: "",
			gender: "",
			phone_number: "",
			email_address: "",
			marital_status: "",
			height: 0,
			weight: 0,
			tin_number: "",
			insurance_type: "",
			member_organization_type: "",
			benefit_plan: "",
			member_type: "",
			member_status: "",
			is_representative: false,
			street_address: "",
			mailing_address_line1: "",
			relationship_to_member: "",
			country: "",
			city: "",
			region: "",
			kifle_ketema: "",
			zip_code: "",
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
			representative_zip_code: "",
			representative_phone_number: "",
			representative_email_address: "",
		},
	],
};

const familySlice = createSlice({
	name: "family",
	initialState,
	reducers: {
		// Add a new family member
		addFamily: (state, action: PayloadAction<familyType>) => {
			const newFamilyMember = { ...action.payload, id: uuidv4() };
			state.familyMembers.push(newFamilyMember);
		},

		// Update an existing family member by id
		updateFamily: (
			state,
			action: PayloadAction<{ id: string; updatedMember: familyType }>
		) => {
			const { id, updatedMember } = action.payload;
			const index = state.familyMembers.findIndex((member) => member.id === id);
			if (index !== -1) {
				state.familyMembers[index] = {
					...state.familyMembers[index],
					...updatedMember,
				};
			}
		},
		// Remove a family member by id
		removeFamily: (state, action: PayloadAction<string>) => {
			state.familyMembers = state.familyMembers.filter(
				(member) => member.id !== action.payload
			);
		},
		// Clear all family members
		clearFamily: (state) => {
			state.familyMembers = [];
		},
		// Set the entire family array (replace existing)
		setFamily: (state, action: PayloadAction<familyType[]>) => {
			state.familyMembers = action.payload;
		},
	},
});

export const { addFamily, updateFamily, removeFamily, clearFamily, setFamily } =
	familySlice.actions;

export default familySlice.reducer;
