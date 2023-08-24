import { login, register, checkPermission } from "../../API/auth";
import { createContext, useState, useEffect } from "react";
import * as jwt from "jsonwebtoken";
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

const defaultAuthContext = {
    isAuthenticated: false, 
    currentMember: null,    
    register: null,         
    login: null,            
    logout: null,           
  };

  const AuthContext = createContext(defaultAuthContext);

  export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [payload, setPayload] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                currentMember: payload && {
                    id: payload.sub,
                    name: payload.name,
                },
                register: async (data) => {
                    const { success, AuthToken } = await register 
                    ({
                        account: data.account,
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        checkPassword: data.checkPassword,
                    });
                    const tempPayload = jwt.decode(AuthToken);
                    if(tempPayload) {
                        setPayload(tempPayload);
                        setIsAuthenticated(true);
                        localStorage.setItem('authToken', AuthToken);
                    } else {
                        setPayload(null);
                        setIsAuthenticated(false);
                    }
                    return success;
                },
                login: async (data) => {
                    const  { success, AuthToken } = await login({
                        account: data.account,
                        password: data.password,
                    });
                    const tempPayload = jwt.decode(AuthToken);
                    if(tempPayload) {
                        setPayload(tempPayload);
                        setIsAuthenticated(true);
                        localStorage.setItem('authToken', AuthToken);
                    } else {
                        setPayload(null);
                        setIsAuthenticated(false);
                    }
                    return success;
                },
                logout: () => {
                    localStorage.removeItem('authToken');
                    setPayload(null);
                    isAuthenticated(false);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}