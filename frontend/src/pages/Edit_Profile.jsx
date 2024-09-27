import Sidebar from "../components/Sidebar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector, useDispatch } from "react-redux";
import { serverUrl } from "../serverUrl";
import { useEffect, useState } from "react";
import {
  getUser,
  resetSuccess,
  updateProfile,
} from "../store/slices/Users_Slice";
import { toast } from "react-toastify";

const Edit_Profile = () => {
  const { user, success, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    password: "",
    profilePic: null,
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setFormData({ ...formData, profilePic: e.target.files[0] });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (success === true) {
      toast.success("Profile updated successfully");
      dispatch(resetSuccess());
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error, success]);
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);
  return (
    <div className="flex w-full">
      <section className="w-[15%]">
        <Sidebar />
      </section>
      <section className="p-5 w-[85%] font-rajdhani">
        <h1 className="flex justify-center mt-10 text-4xl font-extrabold text-redMain">
          Edit Profile
        </h1>
        <form
          className="flex justify-center w-full gap-10"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-10 w-[45%]">
            <div>
              <Label className="text-neutral-50">Username</Label>
              <Input
                value={formData.userName}
                name="userName"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-neutral-50">Email</Label>
              <Input
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className="text-neutral-50">Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-neutral-50">Profile Photo</Label>
              <Input
                type="file"
                onChange={handleImageChange}
                name="profilePic"
              />
            </div>
            <Button
              className="border-2 border-red-800 rounded-none"
              variant="secondary"
              type="submit"
            >
              Update Profile
            </Button>
          </div>
          <div className="w-[45%] flex justify-center items-center gap-5">
            <div className="flex items-center justify-center p-1 border-2 border-redMain w-96 h-96">
              <LazyLoadImage
                className="w-full h-full "
                src={selectedImage || `${serverUrl}/${user?.profilePic}`}
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Edit_Profile;
