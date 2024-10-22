"use client";

import ToolbarMessage, {
  ToolbarEnum,
} from "@/components/toolbarMessage/toolbarMessage";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import ChangePass from "../api/auth/changePass";
import LoaderBook from "@/components/loader-book/loader";
import InputForm from "@/components/input/inputForm";
import ChangePassSvg from "../../public/img/change_pass.svg";
import Image from "next/image";
import axios from "axios";

export default function ChangePassPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-full h-full">
        <ForgoutToken />
      </main>
    </Suspense>
  );
}

function ForgoutToken() {
  const urlParms = useSearchParams();
  const forgoutToken = urlParms.get("forgoutToken");

  const [uPass, setUPass] = useState("");
  const [uRePass, setURePass] = useState("");

  const [toolbarIsVisible, setToolbarIsVisible] = useState(false);
  const [toolbarMsg, setToolbarMsg] = useState("");
  const [toolbarType, setToolbarType] = useState(ToolbarEnum.alert);

  const rota = useRouter();
  const [isLoader, setIsLoader] = useState(false);

  const ShowToolBarMessage = (msg: string, type: ToolbarEnum, time = 5000) => {
    setToolbarMsg(msg);
    setToolbarType(type);
    setToolbarIsVisible(true);

    setTimeout(() => {
      setToolbarIsVisible(false);
    }, time);
  };

  useEffect(() => {
    if (!forgoutToken) {
      ShowToolBarMessage(
        "Nenhum token informado, você será redirecionado!",
        ToolbarEnum.error
      );
      setTimeout(() => {
        rota.push("/");
      }, 3500);
    }
  });

  const handlerChangePassword = async (event: FormEvent) => {
    event.preventDefault();

    await ChangePass({ forgoutToken, uPass, uRePass })
      .then(() => {
        ShowToolBarMessage(`Senha alterada com Sucesso`, ToolbarEnum.success);
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
    <main className="flex w-full min-h-full py-10 items-center justify-center backdrop-blur-sm text-slate-200">
      <form
        onSubmit={handlerChangePassword}
        method="post"
        className="flex flex-col justify-center items-center w-4/5 px-3 py-6 border-[0.1rem] rounded-lg border-orange-500 gap-8 
        lg:w-1/2 lg:flex-row"
      >
        <div className="w-1/2">
          <Image
            src={ChangePassSvg}
            alt="Imagen de troca de senha"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-8">
          <InputForm
            valueName="Password"
            onChangeCapture={(e) => setUPass(e.currentTarget.value)}
            type="password"
            required
            min={4}
          />
          <InputForm
            valueName="Re Password"
            onChangeCapture={(e) => setURePass(e.currentTarget.value)}
            type="password"
            required
            min={4}
          />

          <div className="flex w-full gap-3 text-slate-200 font-bold">
            <button
              className={`flex items-center ${
                isLoader ? "bg-transparent outline-none" : "bg-slate-400/70"
              } justify-center mt-8 w-2/3 h-max py-2 rounded-lg hover:bg-slate-400/40 hover:text-orange-500`}
              onClick={() => rota.push("/")}
            >
              SignIn
            </button>

            <button
              className={`flex items-center ${
                isLoader ? "bg-transparent outline-none" : "bg-slate-400/70"
              } justify-center mt-8 w-2/3 h-max py-2 rounded-lg hover:bg-slate-400/40 hover:text-orange-500`}
              onClick={() => setIsLoader((e) => !e)}
            >
              {isLoader ? <LoaderBook /> : "Recuperar"}
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
