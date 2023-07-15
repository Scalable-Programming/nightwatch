import { ContactPageResponse } from "../services/contactPage/types";
import { fetchContactPage } from "../services/contactPage/fetchContactPage";
import { useFetchData } from "./useFetchData";

export const useGetContactPage = (url: string) => {
  return useFetchData<ContactPageResponse>({
    enabled: !!url,
    fetchData: fetchContactPage,
  });
};
