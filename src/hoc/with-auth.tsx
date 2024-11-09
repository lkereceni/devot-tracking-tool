import { auth } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";

type WithAuthProps = object;

function withAuth<T extends WithAuthProps>(WrappedComponent: ComponentType<T>) {
  const WithAuth = (props: T) => {
    const router = useRouter();
    const [isUserValid, setIsUserValid] = useState(false);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setIsUserValid(true);
        } else {
          router.push("/login");
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (!isUserValid) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
}

export default withAuth;
