"use client";
import Login from "@/app/api/auth/login";
import InputForm from "@/components/input/inputForm";
import LoaderBook from "@/components/loader-book/loader";
import axios from "axios";
import { FormEvent, useState } from "react";
import Join from "../public/img/join.svg";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isLoader, setIsLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");

  const handlerLogin = async (event: FormEvent) => {
    event.preventDefault();

    setIsLoader((e) => !e);

    try {
      await Login({ email, passw }).then((e) =>
        alert(`Logado com sucesso!\n${e?.data.JWT}`)
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert(error.response.data.message);
      } else {
        console.log("Outro erro ocorreu:", error);
      }

      setIsLoader((e) => !e);
    }
  };

  return (
    <main className="flex items-center justify-center w-full h-full bg-background text-slate-200">
      <section className="flex flex-col gap-8 justify-center items-center px-4 backdrop-blur-sm bg-slate-950/40 w-[90%] rounded-2xl py-10">
        <aside className="w-full flex justify-center">
          <Image
            src={Join}
            alt="Imagen ilustrativa de login"
            className="w-2/3 rounded-full border-orange-400 border-[0.1rem]"
          />
        </aside>

        <aside>
          <form
            onSubmit={(e) => handlerLogin(e)}
            method="post"
            className="flex flex-col gap-2 items-center"
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
                <a href="http://">SignUp</a>
              </span>
              <span className="hover:text-orange-400">
                <Link href={"/Forgout"}>Forgout?</Link>
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
    </main>
  );
}
