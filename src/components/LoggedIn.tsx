import { useSession } from "@/lib/auth-client";

export default function LoggedIn({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? children : null}
    </>
  );
}