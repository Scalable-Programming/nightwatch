# Contact page scraper

This is backend that scrapes for contact email and contact page information.

## Installation

```bash
npm install
```

## Prerequisite

In order for google sheets api to work, you need to generate `credentials.json` and paste it into root folder. [Google's guide](https://developers.google.com/sheets/api/quickstart/nodejs#configure_the_oauth_consent_screen)

## Usage

```bash
node index.js
```

### GET /find_contact_page

|              Name | Required |  Type  | Description                                  |
| ----------------: | :------: | :----: | -------------------------------------------- |
|             `url` | required | string | Website url to scrape                        |
| `google_sheet_id` | optional | string | Google sheet id for appending contact result |

**Example request**

`http://localhost:3000/find_contact_page?url=https%3A%2F%2Fnightwatch.io%2Fpricing&google_sheet_id=1in-3szskZe9YcewFrB-c_cvainO8E1tcXPFd_7BQnaw`

**Example response**

```
{
  email: "info@nightwatch.io",
  contact_page: "https://nightwatch.io/contact"
}
```
