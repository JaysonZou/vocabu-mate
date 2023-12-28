import { useRouter } from "next/navigation";

const useUnauthorizedRedirect = () => {
  const router = useRouter();

  const handleUnauthorized = () => {
    router.replace("/login");
  };

  return handleUnauthorized;
};

export default useUnauthorizedRedirect;
