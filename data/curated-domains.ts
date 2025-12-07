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
  {
  domain: "midjourney.com",
  label: "Midjourney",
  category: "ai",
  notes: "Popular AI tool, often minimal headers."
},
{
  domain: "claude.ai",
  label: "Claude / Anthropic",
  category: "ai",
  notes: "Security headers vary by region."
},
{
  domain: "perplexity.ai",
  label: "Perplexity AI",
  category: "ai",
  notes: "Very high growth; good SEO target."
},
{
  domain: "runwayml.com",
  label: "Runway ML",
  category: "ai",
  notes: "Creative AI; header score typically C or D."
},
{
  domain: "character.ai",
  label: "Character AI",
  category: "ai",
  notes: "Weak CSP; common SEO query target."
},
{
  domain: "coinmarketcap.com",
  label: "CoinMarketCap",
  category: "finance",
  notes: "Weak CSP; large search volume."
},
{
  domain: "kraken.com",
  label: "Kraken Exchange",
  category: "finance",
  notes: "SSL strong; missing modern headers."
},
{
  domain: "sofi.com",
  label: "SoFi",
  category: "finance",
  notes: "Popular fintech; header score usually D."
},
{
  domain: "venmo.com",
  label: "Venmo",
  category: "finance",
  notes: "Missing Permissions-Policy."
},
{
  domain: "mint.com",
  label: "Mint",
  category: "finance",
  notes: "Good SSL, weak header setup."
},
{
  domain: "weebly.com",
  label: "Weebly",
  category: "general",
  notes: "Historically poor security headers (F/D)."
},
{
  domain: "godaddy.com",
  label: "GoDaddy",
  category: "general",
  notes: "Large audience; header score often D."
},
{
  domain: "quora.com",
  label: "Quora",
  category: "general",
  notes: "Missing key policies; great SEO target."
}

];
