import { config } from "../../config";
import { NetworkError } from "../../errors";
import { mapApiResponseToResponse } from "./mapping";
import { ContactPageApiResponse, ContactPageResponse } from "./types";

export const fetchContactPage = async (
  url: string
): Promise<ContactPageResponse> => {
  const searchParams = new URLSearchParams({ url });

  try {
    const response = await fetch(
      `${config.windmillApiUrl}?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error();
    }

    const contactPageApiResponse =
      (await response.json()) as ContactPageApiResponse;

    return mapApiResponseToResponse(contactPageApiResponse);
  } catch (error) {
    throw new NetworkError();
  }
};
