import { Input } from "@/components/ui/input";
import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  resetMessage,
  updateAlertSettings,
  uploadAlertImage,
  uploadAlertSound,
} from "../../store/slices/AlertSettings_Slice";
import { FaImage, FaMusic } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { serverUrl } from "../../serverUrl";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Alert_Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { message, error } = useSelector((state) => state.alertSettings);
  // const [showTooltip, setShowTooltip] = useState(false);
  // const [showDurationTooltip, setShowDurationTooltip] = useState(false);
  const [alertAnimation, setAlertAnimation] = useState(
    user?.alertSettings?.alertAnimation
  );
  const [textAnimation, setTextAnimation] = useState(
    user?.alertSettings?.textAnimation
  );
  const [fontStyle, setFontStyle] = useState(user?.alertSettings?.fontStyle);
  const [alertSettings, setAlertSettings] = useState({
    minMoneyForAlert: 0,
    minMoneyForMessage: 0,
  });
  const [isTextToSpeechAlert, setIsTextToSpeechAlert] = useState(false);

  // Handle Switch Change

  const handleCopy = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success("Copied To Clipboard");
    }
  };

  // const [alertDuration, setAlertDuration] = useState([0]);
  // const [volume, setVolume] = useState([0]);

  // Set initial values from user.alertSettings on component mount
  useEffect(() => {
    if (user?.alertSettings) {
      setAlertAnimation(user.alertSettings.alertAnimation || "fade in");
      setTextAnimation(user.alertSettings.textAnimation || "bouncy");
      setFontStyle(user.alertSettings.fontStyle || "Poppins");
      setAlertSettings({
        minMoneyForAlert: user.alertSettings.minMoneyForAlert || 30,
        minMoneyForMessage: user.alertSettings.minMoneyForMessage || 50,
      });
      if (user?.alertSettings) {
        // Check if the textToSpeechAlert is explicitly a string "true"
        setIsTextToSpeechAlert(user?.alertSettings?.textToSpeechALert);
      }
    }
  }, [user]);
  const handleSwitchChange = (checked) => {
    setIsTextToSpeechAlert(checked);

    // Dispatch action with the appropriate value
    dispatch(
      updateAlertSettings({
        textToSpeechALert: checked ? "true" : "false",
      })
    );
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      dispatch(uploadAlertImage({ alertImage: file })); // Dispatch the file to the store
    }
  };

  const handleSoundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(uploadAlertSound({ alertSound: file }));
    }
  };

  // const handleSliderChange = (type, value) => {
  //   if (type === "alertDuration") {
  //     setAlertDuration(value);
  //   }
  //   if (type === "speechVolume") {
  //     setVolume(value);
  //   }
  //   // Dispatch the updated values to Redux
  //   dispatch(updateAlertSettings({ [type]: value }));
  // };
  // Handle Dropdown Changes
  const handleDropdownChange = (type, value) => {
    if (type === "alertAnimation") setAlertAnimation(value);
    if (type === "textAnimation") setTextAnimation(value);
    if (type === "fontStyle") setFontStyle(value);

    // Dispatch Redux action
    dispatch(updateAlertSettings({ [type]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlertSettings({
      ...alertSettings,
      [name]: value,
    });
  };

  // Handle save changes
  const handleSaveChanges = () => {
    dispatch(updateAlertSettings(alertSettings));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetMessage());
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error, message]);
  return (
    <div className="flex w-full">
      <section className="lg:w-[15%]">
        <Sidebar />
      </section>
      <section className="p-5 lg:w-[85%] flex flex-col md:flex-row md:gap-[1%] gap-5 w-full font-rajdhani">
        <div className="md:w-[30%] w-full bg-gray-600 rounded">
          <div className="flex justify-center w-full px-5 py-3 border-b border-gray-500">
            <h1 className="text-lg font-extrabold text-neutral-50">
              Customize Alert
            </h1>
          </div>
          <div className="flex items-center justify-between gap-[5%] p-5 border-b border-gray-500">
            <h1 className="text-neutral-50">Alert Image</h1>{" "}
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center hover:bg-transparent border-2 border-transparent hover:border-redMain duration-200 transition-all justify-center w-[60%] lg:w-[50%] gap-5 p-2 font-semibold bg-gray-500 rounded cursor-pointer text-neutral-50">
                  Edit Image
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Uplaod Image</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <LazyLoadImage
                  src={`${serverUrl}/${user?.alertSettings?.alertImage}`}
                  className="rounded-xl"
                />
                <DialogFooter>
                  {" "}
                  <label
                    htmlFor="alertImage"
                    className="flex items-center justify-center w-full gap-5 p-2 font-semibold bg-gray-400 rounded cursor-pointer text-neutral-50"
                  >
                    Uplaod Image <FaImage className="text-xl text-redMain" />
                  </label>
                  <input
                    id="alertImage"
                    onChange={handleImageChange}
                    className="hidden"
                    type="file"
                  />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center justify-between gap-5 p-5 border-b border-gray-500">
            <h1 className="text-neutral-50">Alert Animation</h1>{" "}
            <select
              className="w-[50%] cursor-pointer duration-200 transition-all p-2 focus:outline-none focus:border-redMain border-2 border-transparent text-neutral-50 rounded bg-gray-500"
              name="alertAnimation"
              value={alertAnimation}
              id="alertAnimation"
              onChange={(e) =>
                handleDropdownChange("alertAnimation", e.target.value)
              }
            >
              <option value="fade in">fade in</option>
              <option value="fade in slow">fade in slow</option>
              <option value="fade out">fade out</option>
              <option value="fade out slow">fade out slow</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-5 p-5 border-b border-gray-500">
            <h1 className="text-neutral-50">Text Animation</h1>{" "}
            <select
              className="w-[50%] duration-200 transition-all p-2 focus:outline-none focus:border-redMain border-2 border-transparent text-neutral-50 rounded bg-gray-500"
              name="textAnimation"
              value={textAnimation}
              id="textAnimation"
              onChange={(e) =>
                handleDropdownChange("textAnimation", e.target.value)
              }
            >
              <option value="bouncy">bouncy</option>
              <option value="10">10s</option>
              <option value="15">15s</option>
              <option value="20">20s</option>
              <option value="25">25s</option>
              <option value="30">30s</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-5 p-5 border-b border-gray-500">
            <h1 className="text-neutral-50">Font Style</h1>{" "}
            <select
              className="w-[50%] duration-200 transition-all p-2 focus:outline-none focus:border-redMain border-2 border-transparent text-neutral-50 rounded bg-gray-500"
              name="fontStyle"
              value={fontStyle}
              id="fontStyle"
              onChange={(e) =>
                handleDropdownChange("fontStyle", e.target.value)
              }
            >
              <option value="Poppins">Poppins</option>
              <option value="10">10s</option>
              <option value="15">15s</option>
              <option value="20">20s</option>
              <option value="25">25s</option>
              <option value="30">30s</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-5 p-5">
            <h1 className="text-neutral-50">Alert Duration</h1>{" "}
            {/* <div className="relative w-[50%]">
              <Slider
                value={[alertDuration]}
                max={100}
                step={1}
                onChange={(e) =>
                  handleSliderChange("alertDuration", e.target.value)
                }
                onMouseEnter={() => setShowDurationTooltip(true)}
                onMouseLeave={() => setShowDurationTooltip(false)}
                onMouseDown={() => setShowDurationTooltip(true)}
                onMouseUp={() => setShowDurationTooltip(false)}
                className="relative cursor-pointer"
              />

              {showDurationTooltip && (
                <div
                  className="absolute p-2 text-sm text-white transform -translate-x-1/2 bg-black rounded-md shadow-md -top-[50px]"
                  style={{ left: `${alertDuration}%` }}
                >
                  {alertDuration}

                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-[6px] w-3 h-3 bg-black rotate-45"></div>
                </div>
              )}
            </div> */}
          </div>
        </div>
        <div className="md:w-[69%] w-full flex flex-col md:flex-row flex-wrap gap-5 md:gap-[2%]">
          <div className="bg-gray-600 md:w-[48%] w-full rounded p-5">
            <h1 className="text-lg font-extrabold text-neutral-50">
              Overlay Link
            </h1>
            <p className="text-sm text-gray-400">
              Insert this URL into the Browser Source of your OBS/Streamlabs.
            </p>
            <div className="flex items-center gap-5">
              <Input
                value={user?.alertSettings?.overlayLink || ""}
                className="border-gray-400"
                readOnly
              />
              <div
                onClick={() => handleCopy(user?.alertSettings?.overlayLink)}
                className="p-[10px] cursor-pointer group bg-gray-400 rounded"
              >
                <FaCopy className="text-xl text-gray-600 transition-all duration-200 group-hover:text-redMain" />
              </div>
            </div>
          </div>
          <div className="bg-gray-600 w-full md:w-[48%] rounded p-5">
            <h1 className="text-lg font-extrabold text-neutral-50">
              Superchat Link
            </h1>
            <p className="text-sm text-gray-400">
              Place this link on YouTube/Facebook to allow viewers to send Super
              Chats.
            </p>
            <div className="flex items-center gap-5">
              <Input
                value={user?.alertSettings?.superchatLink || ""}
                className="border-gray-400"
                readOnly
              />
              <div
                onClick={() => handleCopy(user?.alertSettings?.superchatLink)}
                className="p-[10px] cursor-pointer group bg-gray-400 rounded"
              >
                <FaCopy className="text-xl text-gray-600 transition-all duration-200 group-hover:text-redMain" />
              </div>
            </div>
          </div>
          <div className="bg-gray-600  w-full md:w-[48%] rounded">
            <div className="flex justify-center p-3 border-b border-gray-500">
              <h1 className="text-lg font-extrabold text-neutral-50">
                {" "}
                Superchat Management
              </h1>
            </div>
            <div className="flex flex-col gap-5">
              <div className="p-5 border-b border-gray-500">
                <p className="text-sm text-neutral-50">
                  Min Amount To Show Alert (Cannot Be Less Than 30 PKR)
                </p>
                <Input
                  name="minMoneyForAlert"
                  value={alertSettings.minMoneyForAlert}
                  onChange={handleInputChange}
                  className="border-gray-500"
                />
              </div>
              <div className="px-5 ">
                <p className="text-sm text-neutral-50">
                  Min Amount To Show Alert With Message (Cannot Be Less Than 50
                  PKR)
                </p>
                <Input
                  name="minMoneyForMessage"
                  value={alertSettings.minMoneyForMessage}
                  onChange={handleInputChange}
                  className="border-gray-500"
                />
              </div>
              <div className="px-5 pb-5">
                <Button
                  onClick={handleSaveChanges}
                  className="w-full rounded-none"
                  variant="secondary"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-gray-600  w-full md:w-[48%] rounded">
            <div className="flex justify-center p-3 border-b border-gray-500">
              <h1 className="text-lg font-extrabold text-neutral-50">
                Alert Sound
              </h1>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between p-5 border-b border-gray-500">
                <h1 className="text-neutral-50"> Alert Sound</h1>
                <label
                  htmlFor="alertSound"
                  className="flex  font-semibold items-center gap-5 cursor-pointer justify-center w-[60%] lg:w-[50%]  p-2 bg-gray-500 rounded text-neutral-50"
                >
                  Upload Alert Sound{" "}
                  <FaMusic
                    className="text-xl "
                    style={{ color: "#EE82EE", fontSize: "1.25rem" }}
                  />
                </label>
                <input
                  onChange={handleSoundChange}
                  id="alertSound"
                  className="hidden"
                  type="file"
                />
              </div>
              <div className="flex items-center justify-between gap-5 px-5">
                <h1 className="text-neutral-50">Enable Text To Speech</h1>{" "}
                <div>
                  <Switch
                    checked={isTextToSpeechAlert} // Controlled component
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-5 p-5 border-t border-gray-500">
                <h1 className="text-neutral-50">Volume</h1>{" "}
                {/* <div className="relative w-[50%]">
                 
                  <Slider
                
                    max={100}
                    step={1}
                    onChange={(e) =>
                      handleSliderChange("speechVolume", e.target.value)
                    }
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onMouseDown={() => setShowTooltip(true)}
                    onMouseUp={() => setShowTooltip(false)}
                    className="relative cursor-pointer"
                  />

                  {showTooltip && (
                    <div
                      className="absolute p-2 text-sm text-white transform -translate-x-1/2 bg-black rounded-md shadow-md -top-[50px]"
                      style={{
                        left: `${volume[0]}%`,
                      }}
                    >
                      {volume}

                      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-[6px] w-3 h-3 bg-black rotate-45"></div>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Alert_Settings;
