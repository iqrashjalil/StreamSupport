import { LazyLoadImage } from "react-lazy-load-image-component";
import bgImage from "../../assets/bg.jpeg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/Users_Slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.users);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Logged In Successfully");
      navigate("/");
    }
  }, [dispatch, error, navigate, success]);
  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div className="flex justify-center h-screen p-10 lg:p-20 font-rajdhani">
      <section className="lg:w-[50%] w-full flex bg-gray-600 h-[40rem]">
        <div className="w-[50%] hidden lg:block">
          <LazyLoadImage src={bgImage} className="h-[40rem] w-full" />
        </div>
        <div className="flex flex-col justify-center p-10 w-full lg:w-[50%]">
          <div className="flex justify-center w-full">
            <h1 className="text-4xl font-extrabold text-neutral-50">Login</h1>
          </div>
          <div className="mt-10">
            <div className="mt-4 text-neutral-50">
              <Label>Email</Label>
              <Input
                className="border-gray-400"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4 text-neutral-50">
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                className="border-gray-400"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-4 text-neutral-50">
              <Button
                className="w-full"
                variant="secondary"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
