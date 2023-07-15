/* eslint-disable */
const windmillApiUrl = import.meta.env.VITE_WINDMILL_API_URL;

if (!windmillApiUrl) {
  throw new Error("WindmillApiUrl missing");
}

export const config = {
  windmillApiUrl: windmillApiUrl as string,
};
