import { config } from "../../config";
import { AbortError, NetworkError } from "../../errors";
import { mapApiResponseToResponse } from "./mapping";
import { ContactPageApiResponse, ContactPageResponse } from "./types";

export const fetchContactPage = async (
  url: string,
  sheetId: string,
  signal: AbortSignal
): Promise<ContactPageResponse> => {
  const searchParams = new URLSearchParams({ url, google_sheet_id: sheetId });

  try {
    const response = await fetch(
      `${config.apiUrl}/find_contact_page?${searchParams.toString()}`,
      { signal }
    );

    if (!response.ok) {
      throw new Error();
    }

    const contactPageApiResponse =
      (await response.json()) as ContactPageApiResponse;

    return mapApiResponseToResponse(contactPageApiResponse);
  } catch (error) {
    if ((error as Error)?.name === AbortError.name) {
      throw new AbortError();
    }

    throw new NetworkError();
  }
};
