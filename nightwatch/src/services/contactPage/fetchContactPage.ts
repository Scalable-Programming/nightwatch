import { NetworkError } from "../../errors";
import { mapApiResponseToResponse } from "./mapping";
import { ContactPageApiResponse, ContactPageResponse } from "./types";

export const fetchContactPage = async (): Promise<ContactPageResponse> => {
  const backendUrl = "";
  try {
    const response = await fetch(backendUrl);

    if (!response.ok) {
      throw new Error();
    }

    const contactPageApiResponse = (await response.json()) as ContactPageApiResponse;

    return mapApiResponseToResponse(contactPageApiResponse);
  } catch (error) {
    throw new NetworkError();
  }
};
