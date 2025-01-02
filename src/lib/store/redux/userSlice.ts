import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type UserPayload = {
	email: string;
	verify: boolean;
};
const initialState = {
	userSlice: {
		id: "",
		email: "",
		verify: false,
	},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		SetUserSlice: (state, action: PayloadAction<UserPayload>) => {
			const newUser = { ...action.payload, id: uuidv4() };
			state.userSlice = newUser;
		},
		ClearUserSlice: (state) => {
			state.userSlice = initialState.userSlice; // Resets to initial state
		},
	},
});

export const { SetUserSlice, ClearUserSlice } = userSlice.actions;
export default userSlice.reducer;
