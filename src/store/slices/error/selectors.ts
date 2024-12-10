import { RootState } from '../../store';

export const selectErrorList = (state: RootState) =>
  state.errorReducer.errorList;
