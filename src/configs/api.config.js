const API_BASE_URL = "ieee-aavishkaar-be.vercel.app" || "https://super-zebra-jp7j7gvw4g925vx9-8000.app.github.dev";

export const API_ENDPOINTS = {
  EVENTS: `${API_BASE_URL}/aavishkaar/events`,
  EVENT_DETAIL: (id) => `${API_BASE_URL}/aavishkaar/event/${id}`,
  TEAMS: `${API_BASE_URL}/aavishkaar/teams`,
  REGISTER_TEAM: `${API_BASE_URL}/aavishkaar/teams/register`,
};