import { create } from "zustand";
import axiosInstance from "../Lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

// Utility function for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";
const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  Socket:null,


  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res?.data?.user || null });
      get().connectSocket();
    } catch (error) {
      console.error("Auth Error:", error?.response?.data || error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data, navigate) => {
    set({ isSigningUp: true });
    try {
      await delay(3000);
      const res = await axiosInstance.post("/auth/signup", data);

      if (res?.data?.success) {
        console.log(res);
        toast.success("Successfully Signed Up");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to signup, try again";
      console.error("Signup error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      await delay(3000);
      const res = await axiosInstance.post("/auth/login", data);

      if (res?.data?.success) {
      toast.success("Successfully Login");
      set({ authUser: res?.data.user || null });
      get().connectSocket();
      
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to signup, try again";
      console.error("Signup error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout:async()=>{
    try {
      const res=await axiosInstance.post("/auth/logout");
      if(res?.data?.success)
      {
        toast.success("Logged Out Successfull")
        set({authUser:null})
        get().disconnectSocket();
      }
    } catch (error) {
      console.log(error.res.data)
      toast.error("Failed to logout")
    }
  }
  ,
  
  updateProfile:async(uploadImage)=>{
      set({isUpdatingProfile:true})
      try {
        const res= await axiosInstance.put("auth/updateProfile",uploadImage)
        if(res?.data?.success)
        {
          toast.success("Profile Iamge updated successfully")
          set({authUser:res.data.updatedUser})
        }
      } catch (error) {
        console.error(error.res.data);
        toast.error("Failed to Upload Iamge")
       
      } finally{
        set({isUpdatingProfile:false})
      }
    },
    connectSocket: () => {
      const { authUser } = get();
      if (!authUser || get().socket?.connected) return;
  
      const socket = io(BASE_URL, {
        query: {
          userId: authUser._id,
        },
      });
      socket.connect();
  
      set({ socket: socket });
  
      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });
    },
    disconnectSocket: () => {
      if (get().socket?.connected) get().socket.disconnect();
    },
  
}));

export default useAuthStore;
