import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)