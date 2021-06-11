import React, { createContext, useState, useContext, ReactNode } from "react";
import { Alert } from "react-native";
import { api } from "../services/api";

interface User {
	id: string;
	email: string;
	name: string;
	driver_license: string;
	avatar: string;
}

interface AuthState {
	token: string;
	user: User;
}

interface SignInCredentials {
	email: string;
	password: string;
}

interface AuthContextData {
	user: User;
	signIn(credentials: SignInCredentials): Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [data, setData] = useState<AuthState>({} as AuthState);

	async function signIn(data: SignInCredentials) {
		try {
			console.log("helooooo");
			const res = await api.post("/sessions", data);
			const { token, user } = res.data;

			console.log(res);
			api.defaults.headers.authorization = `Bearer ${token}`;

			setData({ token, user });
		} catch (error) {
			Alert.alert("Não foi possível autenticar");
			console.error(error);
		}
	}

	return (
		<AuthContext.Provider value={{ user: data.user, signIn }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth(): AuthContextData {
	const context = useContext(AuthContext);
	return context;
}

export { AuthProvider, useAuth };
