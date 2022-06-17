const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const articles = [];
app.get("/", (req, res) => {
  res.json("Welcome to my 1st api");
});
app.get("/news", (res, req) => {
  axios
    .get("https://www.abc.net.au/news/politics")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const specificArticles = [];

      $('a:contains("politics")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url: newspaperBase + url,
          source: newspaperId,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});
app.listen(PORT, () => console.log("server "));
