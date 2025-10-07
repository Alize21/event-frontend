import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Iregister } from "@/types/Auth";
import authService from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Fullname is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords doesn't match")
    .required("Password confirmation is required"),
});

const useRegister = () => {
  const router = useRouter();

  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: Iregister) => {
    const result = await authService.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess() {
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: Iregister) => mutateRegister(data);

  return {
    handleVisiblePassword,
    visiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
