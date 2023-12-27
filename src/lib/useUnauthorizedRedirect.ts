import { useRouter } from "next/router";

const useUnauthorizedRedirect = () => {
  const router = useRouter();

  const handleUnauthorized = () => {
    router.replace("/login");
  };

  return handleUnauthorized;
};

export default useUnauthorizedRedirect;
