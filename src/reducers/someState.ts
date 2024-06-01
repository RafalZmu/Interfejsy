import { AnyAction } from 'redux';

interface SomeState {
  value: string;
}

const initialState: SomeState = {
  value: ''
};

const someStateReducer = (state = initialState, action: AnyAction): SomeState => {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        value: action.payload
      };
    default:
      return state;
  }
};

export default someStateReducer;
