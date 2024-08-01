'use client';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '@redux/store'; // Adjust according to your path
import { setDummy } from '@mainSlice/index'; // Adjust according to your path

const MyComponent = () => {
  const dispatch = useDispatch();
  const dummy = useSelector((state: State) => state.main.dummy);

  const updateDummy = () => {
    dispatch(setDummy('new dummy value'));
  };

  return (
    <div>
      <p>Current Dummy Value: {dummy}</p>
      <button onClick={updateDummy}>Update Dummy</button>
    </div>
  );
};

export default MyComponent;
