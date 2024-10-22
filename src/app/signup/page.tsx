"use client";
import InputForm from "@/components/input/inputForm";
import SignUpSvg from "../../public/img/signup.svg";
import Image from "next/image";
import { FormEvent, useState } from "react";
import ToolbarMessage, {
  ToolbarEnum,
} from "@/components/toolbarMessage/toolbarMessage";
import PhoneNumberFormat from "@/utils/phoneFormat";
import { useRouter } from "next/navigation";
import LoaderBook from "@/components/loader-book/loader";
import SignUp from "../api/auth/signUp";
import axios from "axios";

export default function SignUpPage() {
  const rota = useRouter();
  const [isLoader, setIsLoader] = useState(false);

  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uPhone, setUPhone] = useState("");
  const [uPass, setUPass] = useState("");
  const [uRePass, setURePass] = useState("");

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

    await SignUp({ uName, uEmail, uPhone, uPass, uRePass })
      .then(() => {
        ShowToolBarMessage(
          `Usuario ${uEmail} Cadastrado com sucesso!`,
          ToolbarEnum.success
        );
        setTimeout(() => {
          rota.push("/");
        }, 3500);
      })
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response) {
          return ShowToolBarMessage(e.response.data.message, ToolbarEnum.error);
        }

        return ShowToolBarMessage(e.message, ToolbarEnum.error);
      })
      .finally(() => setIsLoader(false));
  };

  return (
    <main className="flex w-full min-h-full py-10 items-center justify-center">
      <form
        onSubmit={handlerRegister}
        method="post"
        className="flex flex-col gap-12 items-center w-4/5 
        text-slate-200 backdrop-blur-sm border-[0.1rem] border-orange-400 
        px-3 py-6 rounded-lg lg:w-1/3"
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
