import React from "react";

export interface User {
    id: string,
    email: string
}

export interface UserContextType {
    user: User,
    saveUser: (user: User) => void;
}

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = React.useState<User>({
        id:'',
        email:''
    });

    const saveUser = (user: User) => {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{user, saveUser}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;