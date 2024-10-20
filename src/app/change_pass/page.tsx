"use client";
import InputForm from "@/components/input/inputForm";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import ChangePassSvg from "../../public/img/change_pass.svg";
import LoaderBook from "@/components/loader-book/loader";
import ToolbarMessage, {
  ToolbarEnum,
} from "@/components/toolbarMessage/toolbarMessage";
import axios from "axios";

export default function ChangePass() {
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
    if (forgoutToken === null) {
      ShowToolBarMessage(
        "Nenhum token foi informado! você sera redirecionado!",
        ToolbarEnum.error
      );

      setTimeout(() => {
        rota.push("/");
      }, 3500);
    }
  });

  const handlerChangePassword = async (event: FormEvent) => {
    event.preventDefault();

    if (uPass != uRePass) {
      return ShowToolBarMessage(
        "Senha informada não são iguais!",
        ToolbarEnum.error
      );
    }

    try {
      await axios({
        method: "post",
        baseURL: `${process.env.API_URL}/changePass`,
        data: {
          forgoutToken,
          password: uPass,
        },
      }).then(() => {
        setIsLoader(false);
        ShowToolBarMessage(`Senha alterada com Sucesso`, ToolbarEnum.success);
        setTimeout(() => {
          rota.push("/");
        }, 3500);
      });
    } catch (error) {
      setIsLoader(false);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return ShowToolBarMessage(
          `Seu token ${error.response.data.message}`,
          ToolbarEnum.alert
        );
      }

      return ShowToolBarMessage(`${error}`, ToolbarEnum.error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center backdrop-blur-sm">
      <form
        onSubmit={handlerChangePassword}
        method="post"
        className="flex flex-col justify-center items-center w-4/5 px-3 py-6 border-[0.1rem] rounded-lg border-orange-500 gap-8"
      >
        <Image
          src={ChangePassSvg}
          alt="Imagen de troca de senha"
          className="w-full"
        />
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
              isLoader ? "bg-transparent outline-none" : "bg-slate-400/20"
            } justify-center mt-8 w-2/3 h-max py-2 rounded-lg hover:bg-slate-400/40`}
            onClick={() => rota.push("/")}
          >
            SignIn
          </button>

          <button
            className={`flex items-center ${
              isLoader ? "bg-transparent outline-none" : "bg-slate-400/20"
            } justify-center mt-8 w-2/3 h-max py-2 rounded-lg hover:bg-slate-400/40`}
            onClick={() => setIsLoader((e) => !e)}
          >
            {isLoader ? <LoaderBook /> : <strong>Recuperar</strong>}
          </button>
        </div>
      </form>
      {!toolbarIsVisible || (
        <ToolbarMessage type={toolbarType} message={toolbarMsg} />
      )}
    </div>
  );
}
