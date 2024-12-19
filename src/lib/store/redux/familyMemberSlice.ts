import {
	type PayloadAction,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { type FamilyInfoType } from "@/types/memeber/memeber";

import { RootState } from "../store";

// Define the state structure
interface FamilyState {
	familyMember: FamilyInfoType[];
}

// Define the initial state
const initialState: FamilyState = {
	familyMember: [
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
			street_address: "",
			mailing_address_line1: "",
			relationship_to_member: "",
			country: "",
			city: "",
			region: "",
			kifle_ketema: "",
			zip_code: "",
		},
	],
};

const familyMemberSlice = createSlice({
	name: "familyMember",
	initialState,
	reducers: {
		// Add a new family member
		addFamilyMember: (state, action: PayloadAction<FamilyInfoType>) => {
			const newFamilyMember = { ...action.payload, id: uuidv4() };
			state.familyMember.push(newFamilyMember);
		},

		// Update an existing family member by id
		updateFamilyMember: (
			state,
			action: PayloadAction<{ id: string; updatedMember: FamilyInfoType }>
		) => {
			const { id, updatedMember } = action.payload;
			const index = state.familyMember.findIndex((member) => member.id === id);
			if (index !== -1) {
				state.familyMember[index] = {
					...state.familyMember[index],
					...updatedMember,
				};
			}
		},
		// Remove a family member by id
		removeFamilyMember: (state, action: PayloadAction<string>) => {
			state.familyMember = state.familyMember.filter(
				(member) => member.id !== action.payload
			);
		},
		// Clear all family members
		clearFamilyMembers: (state) => {
			state.familyMember = [];
		},
		// Set the entire family array (replace existing)
		setFamilyMemberSlice: (state, action: PayloadAction<FamilyInfoType[]>) => {
			state.familyMember = action.payload;
		},
	},
});

export const {
	addFamilyMember,
	updateFamilyMember,
	removeFamilyMember,
	clearFamilyMembers,
	setFamilyMemberSlice,
} = familyMemberSlice.actions;

export const selectAllFamilyMembers = (state: RootState) =>
	state.familyMember.familyMember;

// Selector to get a specific family member by ID
export const selectFamilyMemberById = (id: string) =>
	createSelector([selectAllFamilyMembers], (familyMembers) =>
		familyMembers.find((member) => member.id === id)
	);

export default familyMemberSlice.reducer;
