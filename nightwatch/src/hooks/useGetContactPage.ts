import { ContactPageResponse } from "../services/contactPage/types";
import { fetchContactPage } from "../services/contactPage/fetchContactPage";
import { useFetchData } from "./useFetchData";
import { useCallback } from "react";

export const useGetContactPage = (url: string) => {
  const fetchData = useCallback(() => fetchContactPage(url), [url]);

  return useFetchData<ContactPageResponse>({
    enabled: !!url,
    fetchData,
  });
};
