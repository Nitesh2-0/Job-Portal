import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    allCompany: [],
    singleCompany: null
  },
  reducers: {
    setAllCompany: (state, action) => {
      state.allCompany = action.payload
    },
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload
    }
  }
})

export const { setAllCompany, setSingleCompany } = companySlice.actions
export default companySlice.reducer