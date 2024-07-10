import React, { createContext, useEffect, useState } from 'react'

const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [user,setUser] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('app_user')) || null);
    },[])

    const logoutUser = () => {
        localStorage.removeItem('app_user');
        setUser(null)
    }

  return (
    <DataContext.Provider
        value={{user,logoutUser,setUser}}
    >
        {children}
    </DataContext.Provider>
  )
}

export default DataContext