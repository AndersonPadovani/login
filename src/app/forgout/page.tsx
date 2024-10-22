"use client";
import Image from "next/image";
import ForgoutImage from "../../public/img/forgout.svg";
import InputForm from "@/components/input/inputForm";
import LoaderBook from "@/components/loader-book/loader";
import { useState } from "react";
import { ArrowLeftFromLine } from "lucide-react";
import Link from "next/link";
import forgoutEmail from "../api/auth/forgoutEmail";
import axios from "axios";
import ToolbarMessage, {
  ToolbarEnum,
} from "@/components/toolbarMessage/toolbarMessage";
import { useRouter } from "next/navigation";

export default function Forgout() {
  const rota = useRouter();
  const [isLoader, setIsLoader] = useState(false);
  const [email, setEmail] = useState("");

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

  const handlerForgout = async () => {
    await forgoutEmail({ email })
      .then(() => {
        ShowToolBarMessage(
          `Enviamos para ${email}, informações para recuperação de senha!`,
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
      .finally(() => setIsLoader((e) => !e));
  };

  return (
    <main className="flex flex-col justify-center items-center w-full h-full bg-background">
      <section className="flex flex-col justify-center items-center gap-8 w-[90%] backdrop-blur-sm px-4 py-10 border-orange-400 border-[0.1rem] rounded-lg lg:w-1/3">
        <aside className="flex w-2/3">
          <Image src={ForgoutImage} alt="Imagen de recuperação de senha" />
        </aside>
        <form
          action={handlerForgout}
          method="post"
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="flex flex-col gap-3 text-slate-200 items-center">
            <InputForm
              valueName="Email"
              required
              onChangeCapture={(e) => setEmail(e.currentTarget.value)}
            />
            <Link href={"/"} className="flex gap-3 outline-none">
              Voltar para login
              <ArrowLeftFromLine
                id="goToLogin"
                onClick={() => <Link href={"/"} />}
              />
            </Link>
          </div>

          <button
            className={`flex items-center ${
              isLoader ? "bg-transparent outline-none" : "bg-slate-400/20"
            } justify-center mt-8 w-2/3 h-max py-2 rounded-lg hover:bg-slate-400/40`}
            onClick={() => setIsLoader((e) => !e)}
          >
            {isLoader ? (
              <LoaderBook />
            ) : (
              <strong className="uppercase">Recuperar</strong>
            )}
          </button>
        </form>
      </section>

      {!toolbarIsVisible || (
        <ToolbarMessage message={toolbarMsg} type={toolbarType} />
      )}
    </main>
  );
}
