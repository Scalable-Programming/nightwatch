const apiUrl = import.meta.env.API_URL as string | undefined;

export const config = {
  apiUrl: apiUrl || "http://localhost:3000",
};
