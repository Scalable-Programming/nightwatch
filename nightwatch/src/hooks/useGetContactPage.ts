import { ContactPageResponse } from "../services/contactPage/types";
import { fetchContactPage } from "../services/contactPage/fetchContactPage";
import { useFetchData } from "./useFetchData";
import { useCallback } from "react";

export const useGetContactPage = (url: string, sheetId: string) => {
  const fetchData = useCallback(
    (signal: AbortSignal) => fetchContactPage(url, sheetId, signal),
    [url, sheetId]
  );

  
  return useFetchData<ContactPageResponse>({
    fetchData,
  });
};
