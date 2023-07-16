import { MouseEvent, useState } from "react";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Input } from "./Input";
import { useGetContactPage } from "../hooks/useGetContactPage";

export const ContactPageScraper = () => {
  const [sheetId, setSheetId] = useState("");
  const [url, setUrl] = useState("");

  const {
    data: scrapedData,
    isLoading,
    error,
    resetData,
    loadData,
  } = useGetContactPage(url.trim(), sheetId.trim());

  const onSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    void loadData();
  };

  const onChange = (callback: (newValue: string) => void) => {
    return (newValue: string) => {
      resetData();
      callback(newValue);
    };
  };

  return (
    <Box>
      <Box
        display="flex"
        width={"100%"}
        alignContent={"center"}
        justifyContent={"center"}
        padding={2}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "60%",
          }}
        >
          <Input
            placeholder="Insert url to scrape"
            value={url}
            onChange={onChange(setUrl)}
            disabled={isLoading}
          />
          <Input
            placeholder="Insert google sheet id"
            value={sheetId}
            onChange={onChange(setSheetId)}
            disabled={isLoading}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            onClick={onSubmit}
            disabled={isLoading || !url.trim()}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box
        gap={2}
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        paddingX={3}
      >
        {isLoading && <CircularProgress />}
        {!!error && <Typography>Error retrieving data</Typography>}
        {!!scrapedData && (
          <Typography>Received data: {JSON.stringify(scrapedData)}</Typography>
        )}
      </Box>
    </Box>
  );
};
