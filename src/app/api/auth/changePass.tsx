import axios from "axios";
import { z } from "zod";

type ChangePassType = {
  forgoutToken: string | null;
  uPass: string;
  uRePass: string;
};

const ChangePass = async ({ forgoutToken, uPass, uRePass }: ChangePassType) => {
  const passwordSchema = z.object({
    forgoutToken: z
      .string()
      .min(10, "Seu token é invalido, solicite um novo email de recuperação"),
    uPass: z.string().min(4),
    uRePass: z.string().min(4),
  });

  const isValidPass = passwordSchema.safeParse({
    forgoutToken,
    uPass,
    uRePass,
  });

  if (!isValidPass.success) {
    isValidPass.error.issues.map((e) => {
      throw new Error(e.message);
    });
  }

  if (uPass !== uRePass) {
    throw new Error("As senhas informadas não são iguais!");
  }

  if (forgoutToken === undefined) {
    throw new Error("Nenhum token foi informado!");
  }

  const resp = await axios({
    method: "post",
    baseURL: `${process.env.API_URL}/changePass`,
    data: {
      forgoutToken,
      password: uPass,
    },
  });

  return resp;
};

export default ChangePass;
