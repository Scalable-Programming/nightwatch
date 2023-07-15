import { MouseEvent, useState } from "react";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Input } from "./Input";
import { useGetContactPage } from "../hooks/useGetContactPage";

export const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [urlToFetch, setUrlToFetch] = useState("");

  const {
    data: scrapedData,
    isLoading,
    error,
  } = useGetContactPage(urlToFetch.trim());

  const onSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setUrlToFetch(url);
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
            width: 400,
          }}
        >
          <Input
            placeholder="Insert url to scrape"
            value={url}
            onChange={setUrl}
            disabled={isLoading}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            onClick={onSubmit}
            disabled={isLoading}
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
