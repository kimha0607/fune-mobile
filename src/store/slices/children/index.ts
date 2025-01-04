import { createSlice } from '@reduxjs/toolkit';
import { ChildrenSlice } from './types';
import { getChildrenList, handleAddChild } from './thunk';

export const initialState: ChildrenSlice = {
  childrenList: [],
  loadingGetChildrenList: 'idle',
  loadingAddChildren: 'idle',
};

const childrenSlice = createSlice({
  name: 'children',
  initialState,
  reducers: {
    resetLoadingGetChildrenList: state => {
      state.loadingGetChildrenList = 'idle';
    },
    resetLoadingAddChildren: state => {
      state.loadingAddChildren = 'idle';
    },
  },
  extraReducers: builder => {
    // get children list
    builder.addCase(getChildrenList.pending, state => {
      state.loadingGetChildrenList = 'pending';
    });
    builder.addCase(getChildrenList.fulfilled, (state, action) => {
      state.childrenList = action.payload;
      state.loadingGetChildrenList = 'fulfilled';
    });
    builder.addCase(getChildrenList.rejected, state => {
      state.loadingGetChildrenList = 'rejected';
    });

    // add children
    builder.addCase(handleAddChild.pending, state => {
      state.loadingAddChildren = 'pending';
    });
    builder.addCase(handleAddChild.fulfilled, state => {
      state.loadingAddChildren = 'fulfilled';
    });
    builder.addCase(handleAddChild.rejected, state => {
      state.loadingAddChildren = 'rejected';
    });
  },
});

export const { resetLoadingGetChildrenList, resetLoadingAddChildren } =
  childrenSlice.actions;
export const childrenReducer = childrenSlice.reducer;
