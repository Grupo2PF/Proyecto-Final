// @ts-ignore
import {applyMiddleware, createStore} from "redux"
// @ts-ignore
import {composeWithDevTools} from "redux-devtools-extension"
// @ts-ignore
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)