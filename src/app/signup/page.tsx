"use client";
import InputForm from "@/components/input/inputForm";
import SignUpSvg from "../../public/img/signup.svg";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import ValidateSignUp from "./validateSignUp";
import axios from "axios";
import ToolbarMessage, {
  ToolbarEnum,
} from "@/components/toolbarMessage/toolbarMessage";
import PhoneNumberFormat from "@/utils/phoneFormat";
import { useRouter } from "next/navigation";
import LoaderBook from "@/components/loader-book/loader";

export default function SignUp() {
  const rota = useRouter();
  const [isLoader, setIsLoader] = useState(false);

  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uPhone, setUPhone] = useState("");
  const [uPass, setUPass] = useState("");
  const [uRePass, setURePass] = useState("");
  const [isPassValid, setIsPassValid] = useState(true);

  const [toolbarIsVisible, setToolbarIsVisible] = useState(false);
  const [toolbarMsg, setToolbarMsg] = useState("");
  const [toolbarType, setToolbarType] = useState(ToolbarEnum.alert);

  const ShowToolBarMessage = (msg: string, type: ToolbarEnum, time = 5000) => {
    setToolbarMsg(msg);
    setToolbarType(type);
    setToolbarIsVisible(true);

    setTimeout(() => {
      setToolbarIsVisible(false);
    }, time);
  };

  const handlerRegister = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const isUserValid = await ValidateSignUp({
        name: uName,
        email: uEmail,
        phone: uPhone,
        passw: uPass,
        repassw: uRePass,
      });

      if (!isUserValid.success) {
        isUserValid.error.errors.map((e) => {
          throw new Error(`${e.path} informado é invalido`);
        });
      }

      if (!isPassValid) {
        throw new Error("As senhas informadas não são iguais");
      }

      await axios({
        method: "post",
        baseURL: `${process.env.API_URL}/user`,
        data: {
          name: uName,
          email: uEmail,
          phone: uPhone,
          password: uPass,
        },
      }).then(() => {
        setIsLoader(false);
        ShowToolBarMessage(
          `Usuario ${uEmail} Cadastrado com sucesso!`,
          ToolbarEnum.success
        );
        setTimeout(() => {
          rota.push("/");
        }, 3500);
      });
    } catch (error) {
      setIsLoader(false);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        return ShowToolBarMessage(
          error.response.data.message,
          ToolbarEnum.alert
        );
      }

      return ShowToolBarMessage(`${error}`, ToolbarEnum.error);
    }
  };

  useEffect(() => {
    if (uPass != uRePass) {
      return setIsPassValid(false);
    }
    return setIsPassValid(true);
  }, [uPass, uRePass]);

  return (
    <main className="flex w-full h-full items-center justify-center">
      <form
        onSubmit={handlerRegister}
        method="post"
        className="flex flex-col gap-12 items-center w-4/5 text-slate-200 backdrop-blur-sm border-[0.1rem] border-orange-400 px-3 py-6 rounded-lg"
      >
        <Image src={SignUpSvg} alt="Imagen de SignUp" className="w-2/3 " />
        <div className="flex flex-col items-center gap-6">
          <InputForm
            valueName="Name"
            onChangeCapture={(e) => setUName(e.currentTarget.value)}
            required
          />
          <InputForm
            valueName="Email"
            onChangeCapture={(e) => setUEmail(e.currentTarget.value)}
            required
          />
          <InputForm
            valueName="Phone"
            valueInput={uPhone}
            onChangeCapture={(e) =>
              setUPhone(PhoneNumberFormat(e.currentTarget.value))
            }
            required
          />
          <InputForm
            id="Pass"
            valueName="Password"
            type="password"
            onChangeCapture={(e) => setUPass(e.currentTarget.value)}
            required
          />
          <InputForm
            id="rePass"
            valueName="Re Password"
            type="password"
            onChangeCapture={(e) => setURePass(e.currentTarget.value)}
            required
          />
          <div className=" flex gap-4 w-full text-slate-950 font-bold">
            <button
              className={`flex items-center ${
                isLoader ? "bg-transparent outline-none" : "bg-slate-400/70"
              } justify-center mt-8 w-2/3 h-max py-2 rounded-lg hover:bg-slate-400/40`}
              onClick={() => rota.push("/")}
            >
              SignIn
            </button>

            <button
              className={`flex items-center ${
                isLoader ? "bg-transparent outline-none" : "bg-slate-400/70"
              } justify-center mt-8 w-2/3 h-max py-2 rounded-lg hover:bg-slate-400/40`}
              onClick={() => setIsLoader((e) => !e)}
            >
              {isLoader ? <LoaderBook /> : <strong className="">SignUp</strong>}
            </button>
          </div>
        </div>
      </form>
      {!toolbarIsVisible || (
        <ToolbarMessage type={toolbarType} message={toolbarMsg} />
      )}
    </main>
  );
}
