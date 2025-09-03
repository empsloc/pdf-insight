import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function WorkspaceHeader({ fileName }: any) {
  return (
    <div className="p-4 flex justify-between shadow-md items-center">
      {/* ✅ Logo now links to "/" */}
      <Link href="/" className="cursor-pointer">
        <Image src="/logo.svg" width={140} height={100} alt="logo" />
      </Link>

      <h2 className="font-bold">{fileName}</h2>

      <div className="flex gap-2 items-center">
        <UserButton />
      </div>
    </div>
  );
}

export default WorkspaceHeader;
