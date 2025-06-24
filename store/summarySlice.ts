import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SummaryState {
  value: string;
}

const initialState: SummaryState = {
  value: "",
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    setSummary(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { setSummary } = summarySlice.actions;
export default summarySlice.reducer;
