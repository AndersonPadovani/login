"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ChangePass() {
  const urlParms = useSearchParams();
  const forgoutToken = urlParms.get("forgoutToken");

  return (
    <Suspense>
      <main className="w-full h-full">change pass page {forgoutToken} </main>
    </Suspense>
  );
}
