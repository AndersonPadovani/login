import axios from "axios";
import { z } from "zod";

type ForgoutType = {
  email: string;
};

const forgoutEmail = async ({ email }: ForgoutType) => {
  const schemaValidEmail = z.object({
    email: z.string().email(),
  });

  const isEmailValid = schemaValidEmail.safeParse({ email });

  if (!isEmailValid) {
    throw new Error("Email informado é invalido!");
  }

  const apiResp = await axios({
    method: "post",
    url: `${process.env.API_URL}/forgout`,
    data: {
      email,
    },
  });

  return apiResp;
};

export default forgoutEmail;
