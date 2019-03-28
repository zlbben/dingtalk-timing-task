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
const schedule = require('node-schedule');
const fetch = require('node-fetch');
const alibaba_1 = __importDefault(require("./alibaba"));
let dingtalkUrl = 'https://oapi.dingtalk.com/robot/send?access_token=1559976653999f704af684658de80b2a52038ba5ba434c45435c2cebc2393a9c';
schedule.scheduleJob('0 10,11,15,16,17,18 * * 1-5', function (fireDate) {
    let dingMessage = {
        msgtype: 'text',
        text: { content: '坐太久了，大家起来活动啦：' + new Date().toTimeString() },
        at: { atMobiles: [], isAtAll: true }
    };
    fetch(dingtalkUrl, {
        method: 'post',
        body: JSON.stringify(dingMessage),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(json => console.log(json));
});
schedule.scheduleJob('0 10 * * 1-5', () => __awaiter(this, void 0, void 0, function* () {
    let res = yield alibaba_1.default();
    if (res) {
        let dingMessage = {
            msgtype: 'markdown',
            markdown: {
                title: '阿里股价',
                text: `#### 阿里股价 \n ##### 现在：${res.current} \n ##### 最高：${res.top} \n ##### 最低：${res.down} \n ##### 开盘：${res.open} \n [详情](${res.url}) `
            },
            at: {
                atMobiles: [],
                isAtAll: false
            }
        };
        fetch(dingtalkUrl, {
            method: 'post',
            body: JSON.stringify(dingMessage),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(json => console.log(json));
    }
}));
