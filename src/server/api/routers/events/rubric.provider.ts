import type { Event } from "@/features/events/types/api.types";
import axios from "axios";
import type { RubricEvent, RubricLandingPageResponse } from "./rubric.types";

export async function fetchRubricLandingPage(): Promise<RubricLandingPageResponse> {

  const formData = new URLSearchParams();
  formData.append('endpoint', 'getSocietyLandingPage');
  formData.append('details', JSON.stringify({
    societyid: "12676",
    domain: "campus.hellorubric.com",
    currentUrl: "https://campus.hellorubric.com/?s=12676",
    device: "web_portal",
    version: 4,
  }));

  try {
    const res = await axios.post<RubricLandingPageResponse>(
      "https://api.hellorubric.com/",
      formData.toString(), // Convert to string
      {
        timeout: 300000,
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Origin": "https://campus.hellorubric.com"
        },
      }
    );
    return res.data;
  } catch (err: any) {
    if (err.response) {
      console.error("Rubric API error:", err.response.status, err.response.data);
    } else {
      console.error("Rubric API failed:", err.message);
    }
    throw err;
  }
}

export function mapRubricEventToEvent(e: RubricEvent): Event {
  return {
    id: Number(e.eventid),
    name: e.title,
    description: "",
    start_time: e.formatteddate || "",
    end_time: "",
    place: e.subtitle ? { name: e.subtitle } : undefined,
    cover: e.image ? {
      offset_x: 0,
      offset_y: 0,
      source: e.image
    } : undefined,
  }
}
