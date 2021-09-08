import React from 'react';
import { Provider } from "react-redux";//llamamos la función que nos permite recorrer los reducers
import { store } from './components/store/Store';//llamamos el store que es el corazón del recuer a mostrar
import { AppRouter } from './routers/AppRouter';

export const JournalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
