import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";
import { Alert } from "react-native";

import { User as ModelUser, usersTable } from "../database/model/User";
import { localDatabase } from "../database";
import { api } from "../services/api";

interface User {
	id: string;
	user_id: string;
	email: string;
	name: string;
	driver_license: string;
	avatar: string;
	token: string;
}

interface SignInCredentials {
	email: string;
	password: string;
}

interface AuthContextData {
	user: User;
	signIn(credentials: SignInCredentials): Promise<void>;
	signOut(): Promise<void>;
	updateUser(user: User): Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [data, setData] = useState<User>({} as User);

	async function signIn(data: SignInCredentials) {
		try {
			const res = await api.post("/sessions", data);
			const { token, user }: { token: string; user: User } = res.data;

			//console.log("Response:", res);
			api.defaults.headers.authorization = `Bearer ${token}`;

			const userCollection = localDatabase.get<ModelUser>(usersTable);
			await localDatabase.action(async () => {
				await userCollection.create((newUser) => {
					newUser.user_id = user.id;
					newUser.name = user.name;
					newUser.email = user.email;
					newUser.driver_license = user.driver_license;
					newUser.avatar = user.avatar;
					newUser.token = token;
				});
			});

			setData({ ...user, token });
		} catch (error) {
			Alert.alert("Não foi possível autenticar");
			throw new Error(error);
		}
	}

	async function signOut() {
		const userCollection = localDatabase.get<ModelUser>(usersTable);
		try {
			await localDatabase.action(async () => {
				const userSelected = await userCollection.find(data.id);
				await userSelected.destroyPermanently();
			});

			setData({} as User);
		} catch (error) {
			throw new Error(error);
		}
	}

	async function updateUser(user: User) {
		try {
			const userCollection = localDatabase.get<ModelUser>(usersTable);

			await localDatabase.action(async () => {
				const userSelected = await userCollection.find(user.id);
				console.log("User found:", userSelected);

				await userSelected.update((userData) => {
					userData.name = user.name;
					userData.driver_license = user.driver_license;
					userData.avatar = user.avatar;
				});
			});

			setData(user);
		} catch (error) {
			throw new Error(error);
		}
	}

	useEffect(() => {
		let isMounted = true;

		(async function loadUserData() {
			try {
				const userCollection = localDatabase.get<ModelUser>(usersTable);
				const response = await userCollection.query().fetch();
				//console.log("Load user data:", response[0]._raw);

				if (response.length > 0 && isMounted) {
					const userData = response[0]._raw as unknown as User;
					api.defaults.headers.authorization = `Bearer ${userData.token}`;
					setData(userData);
				}
			} catch (error) {
				console.error("Error loadUserData: ", error);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user: data, signIn, signOut, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth(): AuthContextData {
	const context = useContext(AuthContext);
	return context;
}

export { AuthProvider, useAuth };
