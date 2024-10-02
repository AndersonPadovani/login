import axios from "axios";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

type loginType = {
  email: string;
  passw: string;
};

export type dataType = {
  response: {
    data: {
      message: string;
    };
    status: number;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Login = async ({ email, passw }: loginType) => {
  const loginSchema = z.object({
    email: z.string().email(),
    passw: z.string().min(4),
  });

  const validation = loginSchema.safeParse({ email, passw });

  if (!validation.success) {
    console.log("Erro de validação:", validation.error);
    throw new Error(validation.data);
  }

  const response = await axios({
    method: "post",
    url: `${process.env.API_URL}/login/email`,
    data: {
      email: email,
      password: passw,
    },
  });

  return response;
};

export default Login;
