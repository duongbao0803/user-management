/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "@/routes/sections";
import useAuth from "@/hooks/useAuth";

const queryClient = new QueryClient();

const App = () => {
  const { fetchUserInfo } = useAuth();

  useEffect(() => {
    fetchUserInfo();
  }, [Cookies.get("__token")]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
