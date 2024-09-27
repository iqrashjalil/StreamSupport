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
  const { success, error } = useSelector((state) => state.users);
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
                className="placeholder-black]"
                name="userName"
                type="text"
                placeholder="Enter Username"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 text-neutral-50">
              <Label>Email</Label>
              <Input
                className="placeholder-black]"
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
                className="placeholder-black]"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 text-neutral-50">
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                className="placeholder-black]"
                placeholder="Enter Password"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 text-neutral-50">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                className="placeholder-black]"
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
                className="w-full"
                variant="secondary"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
