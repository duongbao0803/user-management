import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

const useAuth = create((set) => ({
  infoUser: {},

  isAuthenticated: !!Cookies.get("__token"),
  user: {},
  login: () => {
    set({ isAuthenticated: true });
    // window.location.href = "/user";
  },
  fetchUserInfo: async () => {
    var decoded = jwtDecode(Cookies.get("__token"));
    set({ user: decoded });
  },
  logout: () => {
    window.location.href = "/";
    Cookies.remove("__token");
    sessionStorage.clear();
    set({ isAuthenticated: false });
  },
}));

export default useAuth;
