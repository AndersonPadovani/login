import { Phone } from "lucide-react";
import { z } from "zod";

type ValidateSignUpType = {
  name: string;
  email: string;
  phone: string;
  passw: string;
  repassw: string;
};

const ValidateSignUp = async (user: ValidateSignUpType) => {
  const userSchema = z.object({
    name: z.string().min(4),
    email: z.string().email(),
    phone: z.string().length(16),
    passw: z.string().min(4),
    repassw: z.string().min(4),
  });

  const uIsValid = await userSchema.safeParse(user);

  if (!isPhoneValid(user.phone)) {
    throw new Error(`Telefone ${Phone} formato invalido!`);
  }

  if (user.passw != user.repassw) {
    throw new Error("Senhas informadas não são iguais");
  }

  return uIsValid;
};

function isPhoneValid(phone: string): boolean {
  const regex = /^\(\d{2}\) 9 \d{4}-\d{4}$/;
  return regex.test(phone);
}

export default ValidateSignUp;
