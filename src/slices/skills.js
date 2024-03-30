import { createSlice } from "@reduxjs/toolkit";

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    search: ""
  },
  reducers: {
    searchSkillsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    searchSkillsSuccess: (state, action) => {
      if (!state.isLoading) {
        state.items = [];
        return;
      }
      state.isLoading = false;
      state.items = action.payload;
    },
    searchSkillsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    changeSearchField: (state, action) => {
      state.search = action.payload.search;
    },
    clearList: (state) => {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
  changeSearchField,
  clearList,
} = skillsSlice.actions;

export default skillsSlice.reducer;
