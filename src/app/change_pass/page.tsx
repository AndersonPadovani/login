"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ChangePass() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-full h-full">
        change pass page
        <ForgoutToken />
      </main>
    </Suspense>
  );
}

function ForgoutToken() {
  const urlParms = useSearchParams();
  const forgoutToken = urlParms.get("forgoutToken");

  return <>{forgoutToken}</>;
}
