import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '../store'; // Adjust according to your path
import { CartDrawer } from '../slices/drawer/types';

export const useDrawer = () => {
  const dispatch = useDispatch<Dispatch>();
  const isDrawerOpen = useSelector((state: State) => state.drawer);

  const toggleDrawerState = () => dispatch(toggleDrawer());
  const setDrawerState = (isOpen: CartDrawer) => dispatch(setDrawer(isOpen));

  return {
    isDrawerOpen,
    toggleDrawerState,
    setDrawerState,
  };
};
