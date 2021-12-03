import { GET_FLIGHT, GET_SEATS, SET_LOADING } from "../actionTypes";

const initialState: any = {
  allFlight: {},
  allSeats: {},
  loading: false,
};

type Action = {
  type: string;
  payload: object | null;
};

export default function rootReducer(state = initialState, action: Action) {
  switch (action.type) {
    case GET_FLIGHT:
      return {
        ...state,
        allFlight: action.payload,
      };
    case GET_SEATS:
      return {
        ...state,
        allSeats: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
