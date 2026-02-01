import Dashboard from "../screens/Dashboard";
import { restoreData } from "../services/storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await restoreData('x-access-token');

      if (!token) {
        router.replace('/login');
      }
    }

    checkAuth();
  }, []);

  return (
    <Dashboard />
  );
}
