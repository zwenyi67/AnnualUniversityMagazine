import api from "@/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must contain at least 6 characters.",
  }),
});

const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { toast } = useToast();
  const { userLogin } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser } = api.auth.loginMutation.useMutation({
    onMutate: () => {
      setIsLoading(true);
      dispatch(openLoader());
    },
    onSuccess: (data) => {
      userLogin(data.token, data.role, data.user);

      navigate("/", { replace: true });

      toast({
        description: "Login Success",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error during login:", error);

      toast({
        title: "Failed",
        description: "Login Failed",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
      dispatch(hideLoader());
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    loginUser(data);
    navigate("/", { replace: true });
  }

  // async function onSubmit() {
  //   // loginUser(data);
  //   // Role -> admin, manager, coordinator, student, guest
  //   // please insert the role in second param
  //   userLogin("data.token", "admin");
  //   navigate("/", { replace: true });
  // }

  return (
    <div className="">
      <div className="absolute top-0 left-0 z-10 flex items-center justify-center flex-col w-full h-screen bg-transparent p-2">
        <div className="w-[90vw] p-6 md:p-10 md:px-12 gap-1 flex flex-col items-center justify-center max-w-[480px] my-auto">
          <div className="w-[200px] h-[80px] mb-4"></div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-right">
                <NavLink to={"/"} className={"text-xs text-destructive"}>
                  Forget Password?
                </NavLink>
              </div>
              <Button
                type="submit"
                className="bg-black hover:bg-black active:bg-black w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
        {/* <p className="py-1 text-xs text-center">
          Don't have an account?
          <span className="hover:underline active:underline text-destructive font-medium cursor-pointer">
            {" "}
            Create New Account
          </span>
        </p> */}
      </div>

      {/* <ul className="login-boxes z-0">
				{blocks.map((b, i) => {
					return <li key={i} style={b}></li>
				})}
			</ul> */}
    </div>
  );
};

export default LoginView;
