"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { IoLogOut, IoFolder, IoSettings, IoLogIn } from "react-icons/io5";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dropdown, DropdownButton, DropdownContent } from "./ui/dropdown";

export default function UserMenu() {
  const { data: session, isPending } = useSession();
  const t = useTranslations("userMenu");

  if (isPending) {
    return (
      <div className="w-8 h-8 rounded-full bg-base-300 animate-pulse" />
    );
  }

  if (!session?.user) {
    return (
      <Link href="/login">
        <Button variant="primary" size="sm">
          <IoLogIn className="size-4 mr-1" />
          {t("login")}
        </Button>
      </Link>
    );
  }

  const [firstName, lastName] = session.user.name.split(" ");

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Dropdown>
      <DropdownButton modifier={"square"} buttonStyle={"ghost"}>
        <Avatar size={"xs"} placeholder>
          <AvatarFallback size={"xs"} rounded={"full"}>
            {firstName.charAt(0).toUpperCase()}
            {lastName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownButton>
      <DropdownContent>
        <li>
          <div className="p-3 border-b border-base-300">
            <p className="font-medium truncate">{session.user.name}</p>
            <p className="text-sm text-base-content/60 truncate">{session.user.email}</p>
          </div>
        </li>
        <li>
          <Link href="/templates">
            <IoFolder className="size-4" />
            {t("templates")}
          </Link>
        </li>
        <li>
          <Link href="/account">
            <IoSettings className="size-4" />
            {t("account")}
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="text-error">
            <IoLogOut className="size-4" />
            {t("logout")}
          </button>
        </li>
      </DropdownContent>
    </Dropdown>
  );
}
