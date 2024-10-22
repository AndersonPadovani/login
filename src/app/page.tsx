"use client";
import Login from "@/app/api/auth/login";
import InputForm from "@/components/input/inputForm";
import LoaderBook from "@/components/loader-book/loader";
import axios from "axios";
import { FormEvent, useState } from "react";
import LoginImg from "../public/img/login.svg";
import Image from "next/image";
import Link from "next/link";
import ToolbarMessage, {
  ToolbarEnum,
} from "@/components/toolbarMessage/toolbarMessage";

export default function Home() {
  const [isLoader, setIsLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");

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

  const handlerLogin = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoader((e) => !e);

    await Login({ email, passw })
      .then(() =>
        ShowToolBarMessage(
          `Usuario logado com seuceso!, \nObrigado por testar nosso app. ARP Dev Solutions AGRADECE!`,
          ToolbarEnum.success
        )
      )
      .catch((e) => {
        if (axios.isAxiosError(e) && e.response) {
          return ShowToolBarMessage(e.response.data.message, ToolbarEnum.error);
        }

        return ShowToolBarMessage(e.message, ToolbarEnum.error);
      })
      .finally(() => setIsLoader((e) => !e));
  };

  return (
    <main className="flex items-center justify-center w-full h-full bg-background text-slate-200">
      <section className="flex flex-col gap-8 justify-center items-center px-4 backdrop-blur-sm border-[0.1rem] border-orange-300 bg-slate-950/40 w-[90%] rounded-2xl py-10 lg:flex-row lg:w-2/3">
        <aside className="w-full flex justify-center lg:w-1/2">
          <Image
            src={LoginImg}
            alt="Imagen ilustrativa de login"
            className="w-2/3 lg:h-full"
          />
        </aside>

        <aside className="lg:w-1/2 ">
          <form
            onSubmit={(e) => handlerLogin(e)}
            method="post"
            className="flex flex-col gap-2 items-center lg:w-3/4"
          >
            <div className="flex flex-col gap-7">
              <InputForm
                valueName="Email"
                type="email"
                required
                onChangeCapture={(e) => setEmail(e.currentTarget.value)}
              />
              <InputForm
                valueName="Senha"
                type="password"
                required
                onChangeCapture={(e) => setPassw(e.currentTarget.value)}
              />
            </div>

            <div className="flex w-full justify-around">
              <span className="hover:text-orange-400">
                <a href="/signup">SignUp</a>
              </span>
              <span className="hover:text-orange-400">
                <Link href={"/forgout"}>Forgout?</Link>
              </span>
            </div>

            <button
              className={`flex items-center ${
                isLoader ? "bg-transparent outline-none" : "bg-slate-400/20"
              } justify-center mt-8 w-2/3 h-max py-2 rounded-lg hover:bg-slate-400/40`}
            >
              {isLoader ? (
                <LoaderBook />
              ) : (
                <strong className="uppercase">login</strong>
              )}
            </button>
          </form>
        </aside>
      </section>
      {!toolbarIsVisible || (
        <ToolbarMessage message={toolbarMsg} type={toolbarType} />
      )}
    </main>
  );
}
