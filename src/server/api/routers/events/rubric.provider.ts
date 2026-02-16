import axios from "axios";
import type { RubricLandingPageResponse } from "./rubric.types";

const RUBRIC_API_URL = "https://api.hellorubric.com/";
const RUBRIC_SOCIETY_ID = "12676";

export async function fetchRubricLandingPage(): Promise<RubricLandingPageResponse> {
  const formData = new URLSearchParams();
  formData.append("endpoint", "getSocietyLandingPage");
  formData.append(
    "details",
    JSON.stringify({
      societyid: RUBRIC_SOCIETY_ID,
      domain: "campus.hellorubric.com",
      currentUrl: `https://campus.hellorubric.com/?s=${RUBRIC_SOCIETY_ID}`,
      device: "web_portal",
      version: 4,
    }),
  );

  const res = await axios.post<RubricLandingPageResponse>(
    RUBRIC_API_URL,
    formData.toString(),
    {
      timeout: 15000,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://campus.hellorubric.com",
      },
    },
  );

  return res.data;
}
