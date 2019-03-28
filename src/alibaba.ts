import fetch from 'node-fetch';
import puppeteer from 'puppeteer';

const babaPath = 'https://xueqiu.com/S/BABA';

let info = [
  {
    name: 'current',
    select: `#app > div.container-lg.clearfix > div.container-sm.float-left.stock__main > div.quote-container > div.stock-info > div.stock-price.stock-fall > div.stock-current > strong`
  },
  {
    name: 'top',
    select: `#app > div.container-lg.clearfix > div.container-sm.float-left.stock__main > div.quote-container > table > tbody > tr:nth-child(1) > td:nth-child(1) > span`
  },
  {
    name: 'down',
    select: `#app > div.container-lg.clearfix > div.container-sm.float-left.stock__main > div.quote-container > table > tbody > tr.separateTop > td:nth-child(1) > span`
  },
  {
    name: 'open',
    select: `#app > div.container-lg.clearfix > div.container-sm.float-left.stock__main > div.quote-container > table > tbody > tr:nth-child(1) > td:nth-child(2) > span`
  }
];

async function init() {
  const browser = await puppeteer.launch({ devtools: false });
  let hasError = false;

  const page = await browser.newPage();
  try {
    await page.goto(babaPath, { timeout: 0 });
    let res = await Promise.all(
      info.map(async val => {
        let data = await page.$eval(val.select, (el: any) => {
          return el.innerText;
        });
        return { [val.name]: data };
      })
    );
    console.log('res:', res);
    await browser.close();
    return res;
  } catch (error) {
    console.log('error:', error);
  }
  await browser.close();
}

init();
