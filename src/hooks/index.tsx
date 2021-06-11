import React, { ReactNode } from "react";

import { AuthProvider } from "./auth";

interface AuthProviderProps {
	children: ReactNode;
}

export function AppProvider({ children }: AuthProviderProps) {
	return <AuthProvider>{children}</AuthProvider>;
}
