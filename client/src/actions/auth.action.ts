"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { login, register } from "@/services/authService";
import { ILogin, IRegister } from "@/interfaces/auth.interface";

const loginAction = async (payload: ILogin) => {
  const response = await login(payload);
  const cookieStore = await cookies();
  cookieStore.set("accessToken", response.data.accessToken, { maxAge: 60 * 60 * 24 * 7  ,httpOnly:true});
  return response;
};

const registerAction = async (payload: IRegister) => {
  const respose = await register(payload);
  return respose;
};

const getCurrentUser = async () => {
  const accessToken = (await cookies()).get('accessToken')?.value
  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      userId: decodedToken.userId,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email,
      role: decodedToken.role,
      token: accessToken,
    };
  }

  return decodedToken;
};

const logoutAction = async () => {
  (await cookies()).delete('accessToken')
}
export { loginAction, getCurrentUser, registerAction ,logoutAction};