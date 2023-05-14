/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { UserType } from "@/util/types";
// import axios from "axios";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
export interface IUserContext {
  currentUser: UserType | null | undefined;

  setCurrentUser: React.Dispatch<
    React.SetStateAction<UserType | null | undefined>
  >;
  handleLogout: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitHandler: (e: any) => void;
  token: string | undefined;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

interface UserProviderType {
  children: ReactNode;
}
interface LoginType {
  email: string;
  password: string;
}

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: UserProviderType) => {
  const [currentUser, setCurrentUser] = useState<UserType | null | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
      setCurrentUser(jwtDecode(token));
      router.push("/");
    }
  }, [token]);

  function handleLogout() {
    setCurrentUser(null);
    setToken(undefined);
    Cookies.remove("token");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function submitHandler(event: any) {
    event.preventDefault();

    const target = event.currentTarget.elements;

    const userLogin: LoginType = {
      email: target.email.value,
      password: target.password.value,
    };
    console.log("user login", userLogin);
    const result = await axios.post(
      `http://localhost:8008/user/login`,
      userLogin
    );
    if (result.status === 201) {
      const token = Cookies.set("token", result.data.token);
      if (token) {
        setToken(token);
        setCurrentUser(jwtDecode(token));
        router.push("/");
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        submitHandler,
        handleLogout,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
