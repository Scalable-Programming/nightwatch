const express = require("express");
const app = express();
const server = require("http").Server(app);
const helmet = require("helmet");
const scrapeContactInfo = require("./getContactInfo");
const cors = require("cors");
const saveSheetData = require("./googleSheet");
const timeoutMiddleware = require("./middlewares");
const handleError = require("./errorHandler");
const wasResponseSent = require("./utils");

const port = 3000;

app.use(timeoutMiddleware);

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/find_contact_page", async (req, res, next) => {
  const { url, google_sheet_id } = req.query || {};

  if (!url) {
    return next(new Error("Url parameter missing"));
  }

  try {
    const data = await scrapeContactInfo(url);
    google_sheet_id &&
      !wasResponseSent(res) &&
      (await saveSheetData(google_sheet_id, data.contact_page, data.email));

    if (wasResponseSent(res)) {
      return;
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.use(handleError);

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log("Node Endpoints working :)");
});
