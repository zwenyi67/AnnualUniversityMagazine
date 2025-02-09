import Cookies from "js-cookie"
import { useState } from "react"

export default function useAuth() {
	const token = Cookies.get("user")
	const role = Cookies.get("role")

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)

	const userLogin = (token: string, role: string) => {
		Cookies.set("user", token)
		Cookies.set("role", role)
		setIsAuthenticated(true)
	}

	const userLogout = () => {
		Cookies.remove("user")
		Cookies.remove("role")
		setIsAuthenticated(false)
	}

	return { isAuthenticated, userLogin, userLogout, role }
}
