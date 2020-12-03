import React, { useState, useEffect } from 'react'

export const AuthContext = React.createContext({})

export default function AuthProvider({ children }) {

	const [token, setToken] = useState('')

	return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
};