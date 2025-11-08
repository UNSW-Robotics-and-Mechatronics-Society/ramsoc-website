// Site Metadata
export const SITE_URL = "https://ramsocunsw.org";
export const SITE_OG_IMAGE = "/og.svg";

// Social Media
export const LINKEDIN_URL =
  "https://linkedin.com/company/unsw-mechatronics-society/";
export const FACEBOOK_URL = "https://facebook.com/UNSWMTRNSOC";
export const INSTAGRAM_URL = "https://instagram.com/@ramsocunsw";
export const DISCORD_URL = "https://discord.gg/invite/4dWMWAjWm9";

// Membership & Events
export const JOIN_US_URL =
  "https://member.arc.unsw.edu.au/s/clubdetail?clubid=0016F0000371VybQAE";
export const SUMOBOTS_URL = "https://sumobots.ramsocunsw.org";
export const BUILDATHON_URL =
  "https://www.facebook.com/events/1154974769420620";

// Helper Functions
export const getFacebookEventUrl = (eventId: string | number) =>
  `https://www.facebook.com/events/${eventId}`;

export const getNotionPageUrl = (pageId: string) =>
  `https://notion.so/${pageId.replace(/-/g, "")}`;
