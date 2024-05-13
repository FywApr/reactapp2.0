import { createContext, useContext, useEffect, useState } from "react";
import { apiService } from "../app/services/api/ApiService";
import { tokenService } from "../app/services/storage/Factory";
import { Profile } from "./models/Profile";



export interface AuthContext {
    isAuthenticated: boolean;
    user?: Profile;
    token: string;
    setToken: (token: string) => void;
    setUser: (value: Profile) => void;
    resetToken: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode}) {
    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<Profile>()
    const isAuthenticated = !!token && !!user;

    useEffect(() => {
        if(!tokenService.hasValue()) return;

        const localStorageToken = tokenService.getValue();
        handleSaveToken(localStorageToken.token);
    }, []);

    

    const handleResetToken = () => {
        apiService.deleteBearerToken();
        tokenService.deleteValue();
        setToken("");
    };

    const handleSaveToken = (newToken: string) => {
        apiService.saveBearerToken(newToken);
        tokenService.setValue({
            token: newToken,
        });
        setToken(newToken);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, setToken: handleSaveToken,resetToken: handleResetToken, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);

    if(!context){
        throw Error("Приложение не обернуто в AuthProvider");
    }

    return context
}

