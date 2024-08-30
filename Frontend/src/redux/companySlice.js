import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    allCompany: []
  },
  reducers: {
    setAllCompany: (state, action) => {
      state.allCompany = action.payload
    }
  }
})

export const { setAllCompany } = companySlice.actions
export default companySlice.reducer