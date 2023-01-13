import {createReducer} from 'typesafe-actions';

import { Actions } from '../../../store/epics';
import { disconnectWallet, setWalletAddress} from './actions';
import { AppState } from '../../../types';



const initialState: AppState = {
   
}

export default createReducer<AppState, Actions>(initialState)
.handleAction(setWalletAddress,  (state, {payload}) => {
    return {
        walletAddress: payload,
    };
}).handleAction(disconnectWallet, state => {
    return {

    };
});