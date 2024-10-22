import ValidateSignUp from "@/app/signup/validateSignUp";
import axios from "axios";

type SignUpType = {
  uName: string;
  uEmail: string;
  uPhone: string;
  uPass: string;
  uRePass: string;
};

const SignUp = async ({
  uName,
  uEmail,
  uPhone,
  uPass,
  uRePass,
}: SignUpType) => {
  const isUserValid = await ValidateSignUp({
    name: uName,
    email: uEmail,
    phone: uPhone,
    passw: uPass,
    repassw: uRePass,
  });

  if (!isUserValid.success) {
    isUserValid.error.issues.map((e) => {
      throw new Error(e.message);
    });
  }

  if (uPass !== uRePass) {
    throw new Error("As senhas informadas não são iguais!");
  }

  const resp = await axios({
    method: "post",
    baseURL: `${process.env.API_URL}/user`,
    data: {
      name: uName,
      email: uEmail,
      phone: uPhone,
      password: uPass,
    },
  });

  return resp;
};

export default SignUp;
