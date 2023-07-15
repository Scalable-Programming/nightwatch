import { ContactPageApiResponse, ContactPageResponse } from "./types";

export const mapApiResponseToResponse = (
  apiResponse: ContactPageApiResponse
): ContactPageResponse => ({
  email: apiResponse.email,
  contactPage: apiResponse.contact_page,
});
