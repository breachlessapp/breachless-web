export const curatedDomains = [
  {
    domain: "craigslist.org",
    category: "general",
    label: "Craigslist",
    notes: "Almost always missing CSP, HSTS, Permissions Policy — usually scores F.",
  },
  {
    domain: "espn.com",
    category: "media",
    label: "ESPN",
    notes: "Legacy infrastructure; missing several modern security headers.",
  },
  {
    domain: "foxnews.com",
    category: "media",
    label: "Fox News",
    notes: "Missing CSP and Permissions Policy, predictable F score.",
  },
  {
    domain: "harvard.edu",
    category: "education",
    label: "Harvard University",
    notes: "Weak security headers despite strong brand — great for SEO and outreach.",
  },
  {
    domain: "nba.com",
    category: "sports",
    label: "NBA",
    notes: "Typically missing 4–5 security headers.",
  },
  {
    domain: "bbc.com",
    category: "media",
    label: "BBC",
    notes: "Weak header posture; CSP missing.",
  },
  {
    domain: "marketwatch.com",
    category: "finance",
    label: "MarketWatch",
    notes: "Fails several header checks — reliable F.",
  },
  {
    domain: "weather.com",
    category: "weather",
    label: "Weather.com",
    notes: "Often D or F due to missing essential headers.",
  },
  {
    domain: "msn.com",
    category: "portal",
    label: "MSN",
    notes: "Missing multiple headers; common F.",
  },
  {
    domain: "imdb.com",
    category: "entertainment",
    label: "IMDb",
    notes: "Missing CSP and HSTS — frequently fails.",
  },
];
