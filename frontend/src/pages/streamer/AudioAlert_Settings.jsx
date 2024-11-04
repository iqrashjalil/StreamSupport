import { FaMusic } from "react-icons/fa6";
import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  addAudioAlert,
  resetMessage,
  updateAudioAlert,
  updateAlertSettings,
  deleteAudioAlert,
} from "../../store/slices/AlertSettings_Slice";
import { toast } from "react-toastify";
import { Slider } from "@/components/ui/slider";
import { getUser } from "../../store/slices/Users_Slice";
import Loader from "../../components/Loader/Loader";

const AudioAlert_Settings = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.users);
  const { message, error } = useSelector((state) => state.alertSettings);

  const [alertTitle, setAlertTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedAlertId, setSelectedAlertId] = useState(""); // To store the selected alert ID
  const [showTooltip, setShowTooltip] = useState(false);
  const [volume, setVolume] = useState([0]);
  const fileInputRef = useRef(null);

  const handleDropdownChange = (e) => {
    const selectedAlert = user?.alertSettings?.audioAlerts.find(
      (alert) => alert._id === e.target.value
    );

    if (selectedAlert) {
      setAlertTitle(selectedAlert.title);
      setAmount(selectedAlert.money);
      setSelectedAlertId(selectedAlert._id); // Save the selected alert ID
    }
  };

  const handleSoundChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      dispatch(addAudioAlert({ soundFile: file }));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSaveChanges = () => {
    if (selectedAlertId) {
      dispatch(
        updateAudioAlert({
          alertId: selectedAlertId, // Send the selected alert ID
          title: alertTitle,
          money: amount,
        })
      );
    }
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteAudioAlert(id));
  };

  useEffect(() => {
    if (user?.alertSettings) {
      setVolume([user?.alertSettings?.audioAlertVolume]);
    }
  }, [user?.alertSettings]);

  const handleSliderChange = (audioAlertVolume, value) => {
    setVolume(value);
    dispatch(updateAlertSettings({ audioAlertVolume: `${value}` }));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetMessage());
      dispatch(getUser());
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-full">
          <section className="w-[15%] hidden lg:block">
            <Sidebar />
          </section>
          <section className="p-5 w-full lg:w-[85%] flex md:flex-row justify-center flex-col gap-10 lg:gap-[10%] font-rajdhani">
            <div className="lg:w-[45%] bg-gray-600 rounded">
              <div className="flex justify-center p-5 border-b border-gray-500">
                <h1 className="text-lg font-extrabold text-neutral-50">
                  Audio Alerts
                </h1>
              </div>

              <div className="flex items-center justify-between p-5 border-b border-gray-500">
                <h1 className="text-neutral-50">Upload New Alert</h1>{" "}
                <label
                  htmlFor="alertSound"
                  className="flex  font-semibold items-center gap-5 cursor-pointer justify-center w-[60%] lg:w-[50%]  p-2 bg-gray-500 rounded text-neutral-50"
                >
                  Upload Alert Sound
                  <FaMusic
                    className="text-xl "
                    style={{ color: "#EE82EE", fontSize: "1.25rem" }}
                  />
                </label>
                <input
                  ref={fileInputRef}
                  onChange={handleSoundChange}
                  id="alertSound"
                  className="hidden"
                  type="file"
                  accept="audio/*"
                />
              </div>

              <div className="flex items-center justify-between p-5 border-b border-gray-500">
                <h1 className="text-neutral-50">Audio Alert Volume</h1>{" "}
                <div className="relative w-[50%]">
                  {user && (
                    <Slider
                      max={100}
                      step={1}
                      defaultValue={[user?.alertSettings?.audioAlertVolume]}
                      onValueChange={(value) =>
                        handleSliderChange("audioAlertVolume", value[0])
                      }
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      onMouseDown={() => setShowTooltip(true)}
                      onMouseUp={() => setShowTooltip(false)}
                      className="relative cursor-pointer"
                    />
                  )}
                  {showTooltip && (
                    <div
                      className="absolute p-2 text-sm text-white transform -translate-x-1/2 bg-black rounded-md shadow-md -top-[50px]"
                      style={{
                        left: `${volume}%`,
                      }}
                    >
                      {volume}

                      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-[6px] w-3 h-3 bg-black rotate-45"></div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between w-full p-5">
                  <h1 className="text-neutral-50">Select Alert</h1>
                  <select
                    className="w-[50%] cursor-pointer duration-200 transition-all p-2 focus:outline-none focus:border-redMain border-2 border-transparent text-neutral-50 rounded bg-gray-500"
                    name="alertAnimation"
                    id="alertAnimation"
                    onChange={handleDropdownChange}
                  >
                    <option value="">Select Audio Alert</option>
                    {user &&
                      user?.alertSettings?.audioAlerts.map((audio, index) => (
                        <option key={index} value={audio._id}>
                          {audio.title}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="p-5">
                  <label className="text-neutral-50">Alert Name</label>
                  <Input
                    value={alertTitle}
                    onChange={(e) => setAlertTitle(e.target.value)}
                    className="border-gray-500"
                  />
                </div>
                <div className="p-5">
                  <label className="text-neutral-50">Amount</label>
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-gray-500 "
                  />
                </div>
                <div className="p-5">
                  <Button
                    className="w-full rounded-none"
                    variant="secondary"
                    onClick={handleSaveChanges} // Call the save function
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[45%] bg-gray-600 rounded">
              {" "}
              <div className="flex justify-center p-5 border-b border-gray-500">
                <h1 className="text-lg font-extrabold text-neutral-50">
                  Audio Alerts
                </h1>
              </div>
              <div className="p-2 overflow-auto h-[33rem]">
                {user &&
                  user?.alertSettings?.audioAlerts.map((alert, index) => {
                    return (
                      <div key={index} className="p-5 border-b border-gray-500">
                        <div className="flex items-center justify-between">
                          <h1 className="text-neutral-50">{alert.title}</h1>
                          <Button
                            onClick={() => handleDeleteClick(alert._id)}
                            variant="secondary"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default AudioAlert_Settings;
