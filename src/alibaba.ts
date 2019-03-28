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

export default async function init() {
  const browser = await puppeteer.launch({ devtools: false });
  const page = await browser.newPage();

  let data: any = { url: babaPath };

  try {
    await page.goto(babaPath, { timeout: 0 });
    let res: any = await Promise.all(
      info.map(async val => {
        let __res = await page.$eval(val.select, (el: any) => {
          return el.innerText;
        });
        return { [val.name]: __res };
      })
    );
    res.map(val => {
      Object.assign(data, val);
    });
  } catch (error) {
    console.log('error:', error);
    data = null;
  }
  await browser.close();
  return data;
}

init();
