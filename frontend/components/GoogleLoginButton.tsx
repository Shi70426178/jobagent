"use client";

import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const [buttonWidth, setButtonWidth] = useState(270);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        // Mobile
        setButtonWidth(300);
      } else if (window.innerWidth < 1024) {
        // Tablet
        setButtonWidth(300);
      } else {
        // Desktop
        setButtonWidth(270);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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
      width={buttonWidth}
    />
  );
}