"use client";
import { useSearchParams } from "next/navigation";

export default function ChangePass() {
  const urlParms = useSearchParams();
  const forgoutToken = urlParms.get("forgoutToken");

  return (
    <main className="w-full h-full">change pass page {forgoutToken} </main>
  );
}
