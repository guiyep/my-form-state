import { useDispatch, useSelector } from 'react-redux';

export const useThunks = () => {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);
  const getState = () => currentState;

  const dispatchThunk = (action) => {
    if (typeof action === 'function') {
      return action(dispatchThunk, getState);
    }
    return dispatch(action);
  };

  return dispatchThunk;
};
