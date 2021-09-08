import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (

        <div className="auth_main">
            <div className="auth_box-container">
            <Switch>
                <Route path="/auth/login" 
                       component={LoginScreen} 
                >
                </Route>
                <Route path="/auth/register"
                    component={RegisterScreen}
                >
                </Route>
                <Redirect to="/auth/login" />
            </Switch>
            </div>
        </div>
    )
}
