"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
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
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ devtools: false });
        let hasError = false;
        const page = yield browser.newPage();
        try {
            yield page.goto(babaPath, { timeout: 0 });
            let res = yield Promise.all(info.map((val) => __awaiter(this, void 0, void 0, function* () {
                let data = yield page.$eval(val.select, (el) => {
                    return el.innerText;
                });
                return { [val.name]: data };
            })));
            console.log('res:', res);
            yield browser.close();
            return res;
        }
        catch (error) {
            console.log('error:', error);
        }
        yield browser.close();
    });
}
init();
