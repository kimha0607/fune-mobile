import { RootState } from '../../store';

export const selectChildrenList = (state: RootState) =>
  state.childrenReducer.childrenList;

export const selectLoadingGetChildrenList = (state: RootState) =>
  state.childrenReducer.loadingGetChildrenList;

export const selectLoadingAddChildren = (state: RootState) =>
  state.childrenReducer.loadingAddChildren;
