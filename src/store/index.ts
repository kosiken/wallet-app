import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import thunk from 'redux-thunk';
import { RootState, Services } from '../types';
import { Actions, configureEpic } from './epics';
import { logger } from './middleware';
import appReducer from '../modules/app/store/appReducer';


let s:  ToolkitStore<RootState, Actions, any[]>;



const initialzeStore = () => {

  const rootReducer = combineReducers<RootState, Actions>({
    app: appReducer,

  });

  const services: Services = {
    getStore: () => s,
  };
  const { rootEpic, epicMiddleware } = configureEpic(services);

  const baseMiddleWare = [thunk, logger, epicMiddleware];

  let store = configureStore<RootState, Actions, any[]>({
    reducer: rootReducer,
    middleware: baseMiddleWare,
    devTools: process.env.NODE_ENV !== 'production',

  });
  epicMiddleware.run(rootEpic);
  s = store;
  return store;
};



export default initialzeStore
