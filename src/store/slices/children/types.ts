import { IBaseChildren } from '../../../types/children';
import { Loading } from '../../../types/loading';

export interface ChildrenSlice {
  childrenList: IBaseChildren[];
  loadingGetChildrenList: Loading;
  loadingAddChildren: Loading;
}
