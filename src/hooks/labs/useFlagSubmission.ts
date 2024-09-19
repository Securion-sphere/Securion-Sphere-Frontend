import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { Lab } from "@/interfaces/labs";

const useFlagSubmission = (
  selectedLab: Lab,
  markAsSolved: (lab: Lab) => void,
) => {
  const [flag, setFlag] = useState("");
  const [isFlagCorrect, setIsFlagCorrect] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const { mutate: submitFlag } = useMutation({
    mutationFn: async (userId: number) => {
      return await axiosInstance.post("/actived-lab/submit-flag", {
        userId,
        flag,
      });
    },
    onSuccess: (response) => {
      if (response.data.msg === "Flag is correct") {
        setIsFlagCorrect(true);
        markAsSolved(selectedLab);
      } else {
        setIsFlagCorrect(false);
      }
      setHasSubmitted(true);
    },
    onError: (error) => {
      console.error("Error submitting flag:", error);
    },
  });

  const handleSubmitFlag = async () => {
    setHasSubmitted(true);
    try {
      const userProfileResponse = await axiosInstance.get("/user/profile");
      const userProfile = userProfileResponse.data;
      submitFlag(userProfile.id);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return { flag, setFlag, handleSubmitFlag, isFlagCorrect, hasSubmitted };
};

export default useFlagSubmission;
