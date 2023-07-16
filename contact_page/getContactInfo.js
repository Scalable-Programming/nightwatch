const puppeteer = require("puppeteer");

// 71 most common translations of "contact"
const commonContactTranslations = [
  "contact",
  "contacto",
  "lianxi",
  "ittisal",
  "sampark",
  "yogayoga",
  "kontakt",
  "kontakuto",
  "lianlo",
  "sampradincandi",
  "lienhe",
  "totarpu",
  "temas",
  "yeollak",
  "rabtah",
  "tiddtawdt",
  "bandhappetal",
  "seikswaya",
  "alaqe",
  "taanu",
  "qaba",
  "samparka",
  "aloqa",
  "kaantakat",
  "yaginnu",
  "igbesiaye",
  "ngwucha",
  "thintana",
  "laxiriir",
  "vohitra",
  "tektoun",
  "bwino",
  "sampŕadiṁcaṇḍi",
  "toṭarpu",
  "saṁparka",
  "seikswa ya",
  "kaanṭakṭ",
  "igbesi aye",
  "ngwụcha",
  "sambandha",
  "kysymys",
  "kontak",
  "kontakte",
  "kumunikasyon",
  "contactare",
  "kontakta",
  "kontaktu",
  "kontaktní",
  "kontaktoplysninger",
  "kontakti",
  "kontrakt",
  "kapcsolat",
  "atnaujinti",
  "kontaktas",
  "kontakto",
  "kontaktinis",
  "kontaktai",
  "kontaktni",
  "kontaktirati",
  "kontaktné",
  "kontaktujte",
  "kontaktom",
  "kontaktuppgifter",
  "kapcsolattartó",
  "samband",
  "kontaktowa",
  "kontaktul",
  "kontaktim",
  "kontaktini",
  "kontaktný",
  "kontratta",
  "contatto",
];

const loadingTimeToWait = 2000;

async function scrapeContactInfo(url) {
  let result = { contact_page: null, email: null };

  if (!isValidURL(url)) {
    return result;
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url);
  } catch (error) {
    return result;
  }

  await page.waitForTimeout(loadingTimeToWait);

  const contactURL = await findContactURL(page);

  if (contactURL) {
    try {
      await page.goto(contactURL);
    } catch (error) {
      return result;
    }

    await page.waitForTimeout(loadingTimeToWait);

    const contactHtmlContent = await page.content();
    const emails = extractEmail(contactHtmlContent);

    if (emails.length > 0) {
      result = {
        contact_page: contactURL,
        email: emails[0],
      };
    }
  }

  await browser.close();

  return result;
}

async function findContactURL(page) {
  const contactLink = await page.evaluate((translations) => {
    for (const contactTranslation of translations) {
      const contactLinkElement = document.querySelector(
        `a[href*="${contactTranslation}"]`
      );

      if (contactLinkElement) {
        return contactLinkElement.href;
      }
    }

    return null;
  }, commonContactTranslations);

  return contactLink;
}

function extractEmail(htmlContent) {
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = htmlContent.match(emailPattern) || [];
  return emails;
}

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = scrapeContactInfo;
