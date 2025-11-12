import type { MetaGraphAPIEventResponse } from "@/server/api/routers/events/types";
import { http, HttpResponse } from "msw";

// Mock event data
const mockEvents: MetaGraphAPIEventResponse["data"] = [
  {
    id: 1,
    name: "Workshop: Introduction to Mechatronics",
    description:
      "Join us for an introductory workshop covering the basics of mechatronics engineering. Learn about robotics, sensors, and control systems. Perfect for beginners!",
    start_time: "2025-12-15T18:00:00+1100",
    end_time: "2025-12-15T20:00:00+1100",
    cover: {
      offset_x: 0,
      offset_y: 0,
      source: "https://picsum.photos/seed/event1/800/600",
    },
    place: {
      name: "UNSW Electrical Engineering Building, Room G03",
    },
  },
  {
    id: 2,
    name: "Industry Night: Robotics & AI",
    description:
      "Network with leading companies in robotics and AI. Hear from industry professionals about career opportunities and latest trends in mechatronics. Food and drinks provided!",
    start_time: "2025-12-20T17:30:00+1100",
    end_time: "2025-12-20T20:30:00+1100",
    cover: {
      offset_x: 0,
      offset_y: 0,
      source: "https://picsum.photos/seed/event2/800/600",
    },
    place: {
      name: "UNSW Roundhouse",
    },
  },
  {
    id: 3,
    name: "Sumobots Competition 2026",
    description:
      "Annual sumo robot competition! Design and build autonomous robots to push opponents out of the ring. Prizes for top 3 teams. Registration required.",
    start_time: "2026-02-10T10:00:00+1100",
    end_time: "2026-02-10T16:00:00+1100",
    cover: {
      offset_x: 0,
      offset_y: 0,
      source: "https://picsum.photos/seed/event3/800/600",
    },
    place: {
      name: "UNSW Quadrangle Lawn",
    },
  },
  {
    id: 4,
    name: "PCB Design Workshop",
    description:
      "Learn the fundamentals of PCB design using industry-standard software. Design your own circuit board from schematic to layout. Limited spots available!",
    start_time: "2026-01-05T14:00:00+1100",
    end_time: "2026-01-05T17:00:00+1100",
    cover: {
      offset_x: 0,
      offset_y: 0,
      source: "https://picsum.photos/seed/event4/800/600",
    },
    place: {
      name: "UNSW Tyree Energy Technologies Building",
    },
  },
];

// Mock past events
const mockPastEvents: MetaGraphAPIEventResponse["data"] = [
  {
    id: 101,
    name: "Buildathon 2024",
    description:
      "24-hour hackathon where teams built innovative solutions to real-world problems. Amazing projects and great teamwork!",
    start_time: "2024-11-01T10:00:00+1100",
    end_time: "2024-11-02T10:00:00+1100",
    cover: {
      offset_x: 0,
      offset_y: 0,
      source: "https://picsum.photos/seed/past1/800/600",
    },
    place: {
      name: "UNSW Scientia Building",
    },
  },
  {
    id: 102,
    name: "3D Printing Workshop",
    description:
      "Hands-on workshop teaching 3D modeling and printing techniques. Participants created their own custom parts.",
    start_time: "2024-10-15T13:00:00+1100",
    end_time: "2024-10-15T16:00:00+1100",
    cover: {
      offset_x: 0,
      offset_y: 0,
      source: "https://picsum.photos/seed/past2/800/600",
    },
    place: {
      name: "UNSW Makerspace",
    },
  },
];

export const handlers = [
  // Mock Facebook Graph API events endpoint
  http.get("https://graph.facebook.com/v21.0/me/events", ({ request }) => {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("after");

    // Simulate pagination
    if (cursor === "page2") {
      // Return empty page to simulate end of pagination
      return HttpResponse.json<MetaGraphAPIEventResponse>({
        data: [],
        paging: {
          cursors: {
            before: "page1",
            after: "page2",
          },
        },
      });
    }

    // First page - return all events
    const allEvents = [...mockEvents, ...mockPastEvents];

    return HttpResponse.json<MetaGraphAPIEventResponse>({
      data: allEvents,
      paging: {
        cursors: {
          before: "start",
          after: "page2",
        },
      },
    });
  }),

  // You can add more handlers for other API endpoints here
];
