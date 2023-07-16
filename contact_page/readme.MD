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

# Approach

Fetching contact page assumes that page has navigation endpoint which has `contact` word in it.
Word `contact` is translated into 71 most popular languages and headless browser checks for any link, that might have translated `contact` in it.
If that link is found then it means that contact page was found. After that we also scrape emails and return found data.

Improved approach could be to only searh for emails, if contact page was not found. It would require to scrape all links from body (`body a` tag) and crawl for emails on each non already visited link.
