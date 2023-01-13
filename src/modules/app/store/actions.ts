import {createAction} from 'typesafe-actions';


export const setWalletAddress = createAction('APP/SET_WALLET')<string>();

export const disconnectWallet = createAction('APP/DISCONNECT_WALLET')<void>();
