import { useEffect, useState } from "react";
import socket from "../socket"; // Import the socket connection
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAlertSettings } from "../store/slices/AlertSettings_Slice";
import { serverUrl } from "../serverUrl";

const Show_Donation = () => {
  const dispatch = useDispatch();
  const [donations, setDonations] = useState([]);
  const { userAlertSettings } = useSelector((state) => state.alertSettings);
  const { id } = useParams();

  // Dispatch to get alert settings (e.g., duration)
  useEffect(() => {
    dispatch(getAlertSettings(id));
  }, [dispatch, id]);

  const alertDuration = userAlertSettings?.alertDuration * 1000 || 2000; // Default to 2000ms if undefined

  useEffect(() => {
    const silentAudio = new Audio(
      `${serverUrl}/uploads/alertSound/alertSound.mpeg`
    );
    silentAudio.volume = 0;
    silentAudio.play().catch((error) => {
      console.log("Error playing silent audio:", error);
    });

    socket.on("newDonation", (donationData) => {
      console.log("New donation received:", donationData);

      setDonations((prevDonations) => [donationData, ...prevDonations]);

      playAlertSound(donationData);

      setTimeout(() => {
        setDonations((prevDonations) => prevDonations.slice(0, -1));
      }, alertDuration);
    });

    return () => {
      socket.off("newDonation");
    };
  }, [alertDuration]);

  const playAlertSound = (donationData) => {
    const audio = new Audio(`${serverUrl}/${userAlertSettings?.alertSound}`);
    audio.volume = userAlertSettings?.alertVolume || 1;

    audio
      .play()
      .then(() => {
        console.log("Alert sound played successfully");

        audio.addEventListener("ended", () => {
          console.log("Alert sound finished, starting TTS");
          playTextToSpeech(donationData);
        });
      })
      .catch((error) => {
        console.log("Error playing alert sound:", error);
      });
  };

  const playTextToSpeech = (donationData) => {
    const message = `${donationData.donatorName} donated $${
      donationData.amount
    }. ${donationData.message || ""}`;
    console.log("Preparing to speak:", message);

    const speak = () => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.volume = userAlertSettings?.ttsVolume || 0.5;
        utterance.rate = userAlertSettings?.ttsRate || 0.9;
        utterance.pitch = userAlertSettings?.ttsPitch || 1;

        // Add error handling for utterance
        utterance.addEventListener("error", (error) => {
          console.log("TTS Error:", error);
        });

        utterance.addEventListener("start", () => {
          console.log("TTS started speaking.");
        });

        utterance.addEventListener("end", () => {
          console.log("TTS finished speaking.");
        });

        // Force stop any previous utterances and then speak
        window.speechSynthesis.cancel(); // Clear the queue
        window.speechSynthesis.speak(utterance);
        console.log("Speaking:", message);
      } else {
        console.log("SpeechSynthesis API is not supported in this browser.");
      }
    };

    // Wait for voices to be ready
    if (window.speechSynthesis.getVoices().length > 0) {
      speak();
    } else {
      window.speechSynthesis.addEventListener("voiceschanged", speak);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-neutral-50">
      {donations.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <ul>
          {donations.map((donation, index) => (
            <>
              <li key={index}>
                <strong className="text-redMain">{donation.donatorName}</strong>{" "}
                donated Rs:{" "}
                <span className="text-lg text-lime-400">{donation.amount}</span>
              </li>
              <li>{donation.message}</li>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Show_Donation;