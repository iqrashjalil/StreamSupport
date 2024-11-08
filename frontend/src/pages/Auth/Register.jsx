import { LazyLoadImage } from "react-lazy-load-image-component";
import bgImage from "../../assets/bg.jpeg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { register, resetSuccess } from "../../store/slices/Users_Slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    profilePic: null,
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorColor, setPasswordErrorColor] = useState("");
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(register(formData));
    console.log(formData);
  };

  useEffect(() => {
    if (confirmPassword) {
      if (formData.password.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
        setPasswordErrorColor("Red");
      } else if (formData.password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        setPasswordErrorColor("Red");
      } else {
        setPasswordError("Password Matched");
        setPasswordErrorColor("Green");
      }
    } else {
      setPasswordError("");
    }
  }, [confirmPassword, formData.password]);

  useEffect(() => {
    if (success) {
      toast.success("Logged In Successfully!");
      navigate("/");
    }
    dispatch(resetSuccess());
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error, navigate, success]);
  return (
    <div className="flex justify-center h-screen p-10 lg:p-20 font-rajdhani">
      <section className="lg:w-[50%] flex bg-gray-600 h-[40rem]">
        <div className="w-[50%] hidden lg:block">
          <LazyLoadImage src={bgImage} className="h-[40rem] w-full" />
        </div>
        <div className="p-10 lg:w-[50%]">
          <div className="flex justify-center w-full">
            <h1 className="text-4xl font-extrabold text-neutral-50">
              Register
            </h1>
          </div>
          <div className="mt-10">
            <div className="mt-4 text-neutral-50">
              <Label>Username</Label>
              <Input
                className="border-gray-400"
                name="userName"
                type="text"
                placeholder="Enter Username"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 text-neutral-50">
              <Label>Email</Label>
              <Input
                className="border-gray-400"
                name="email"
                type="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 text-neutral-50">
              <Label>Profile Picture</Label>
              <Input
                type="file"
                name="profilePic"
                className="border-gray-400"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 text-neutral-50">
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                className="border-gray-400"
                placeholder="Enter Password"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 text-neutral-50">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                className="border-gray-400"
                placeholder="Confirm Password"
                onChange={handleConfirmPasswordChange}
              />
              <p
                className={`font-extrabold ${
                  passwordErrorColor === "Red"
                    ? "text-redMain"
                    : "text-[#AAFF00]"
                }`}
              >
                {passwordError}
              </p>
            </div>

            <div className="mt-4 text-neutral-50">
              <Button
                className="flex items-center justify-center w-full"
                variant="secondary"
                onClick={handleSubmit}
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
