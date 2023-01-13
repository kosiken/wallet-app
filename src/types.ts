import { Store } from "@reduxjs/toolkit";


export enum SCRIPTS_ENUM {
    web3js = 'web3js'
  };

export const SCRIPTS: Record<SCRIPTS_ENUM, {name: string; script: string}> = {
    [SCRIPTS_ENUM.web3js]: {name: SCRIPTS_ENUM.web3js, script: 'https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js'},
}

export interface AppState {
  walletAddress?: string;
}

export interface Services {
  
  getStore: () => Store<RootState>;
}


export interface RootState {
  app: AppState;
}
