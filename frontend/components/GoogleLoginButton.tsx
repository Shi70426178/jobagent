"use client";

import { GoogleLogin } from "@react-oauth/google";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();
  const { setToken } = useAuthStore();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          if (!credentialResponse.credential) {
            alert("Google login failed");
            return;
          }

          const response = await api.post("/auth/google", {
            credential: credentialResponse.credential,
          });

          setToken(response.data.access_token);

          router.push("/dashboard");
        } catch (error: any) {
          console.error(error);
          alert(
            error?.response?.data?.detail || "Google login failed"
          );
        }
      }}
      onError={() => {
        alert("Google Login Failed");
      }}
      theme="outline"
      shape="pill"
      text="continue_with"
      size="large"
      width="100%"
    />
  );
}