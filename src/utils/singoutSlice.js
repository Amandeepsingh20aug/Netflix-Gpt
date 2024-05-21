import { createSlice } from "@reduxjs/toolkit";

const singoutSlice = createSlice({
  name : "SignOut",
  initialState : {
    signOutPopUp : false
  },
  reducers : {
    showSignOutPopUp : (state,action) =>{
      state.signOutPopUp = action.payload
    }
  }
})

export const {showSignOutPopUp} = singoutSlice.actions
export default singoutSlice.reducer