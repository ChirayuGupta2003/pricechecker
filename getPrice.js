const puppeteer = require("puppeteer");

module.exports = {
  async getPrice(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const element = await page.evaluate(() => {
      return document.querySelector(".a-offscreen").textContent;
    });

    var formattedElement = parseFloat(element.slice(1).split(",").join(""));

    await browser.close();
    return formattedElement;
  },
};
