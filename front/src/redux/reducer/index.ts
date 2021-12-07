import { GET_FLIGHT, GET_SEATS, SET_LOADING, GET_FLIGHT_URL, RESET } from "../actionTypes";

const initialState: any = {
  allFlight: undefined,
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
      case GET_FLIGHT_URL:
      return {
        ...state,
        allFlight: action.payload,
      };
      case RESET:
      return {
        initialState,
      };
    default:
      return state;
  }
}
