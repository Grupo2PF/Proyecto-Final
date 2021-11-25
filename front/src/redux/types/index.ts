import { 
    GET_FLIGHT
} from '../actionTypes';

export interface flightState {
    results : object | null;
}

export type flightActions = 
    | { type: typeof GET_FLIGHT, payload: flightState }