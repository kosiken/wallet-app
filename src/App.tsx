import React from 'react';
import './App.css';
import { Web3Provider } from './contexts/Web3Context';
import { Provider } from 'react-redux';
import { AppCom } from './modules/app';
import Header from './modules/app/components/Header';
import initializeStore from './store';

const store = initializeStore();

function App() {
  return (
    <Provider store={store}>
          <Web3Provider>
    <div className="App w-full lg:w-4/5 px-4 mx-auto my-0 pb-10">
      <Header />
        <AppCom/>
    </div>
    </Web3Provider>
    </Provider>
  );
}

export default App;
