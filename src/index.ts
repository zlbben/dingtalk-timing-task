const schedule = require('node-schedule');
const fetch = require('node-fetch');
import getAli from './alibaba';

let dingtalkUrl =
  'https://oapi.dingtalk.com/robot/send?access_token=1559976653999f704af684658de80b2a52038ba5ba434c45435c2cebc2393a9c';

schedule.scheduleJob('0 10,11,15,16,17,18 * * 1-5', function(fireDate) {
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

schedule.scheduleJob('0 10 * * 1-5', async () => {
  let res: any = await getAli();
  if (res) {
    let dingMessage = {
      msgtype: 'markdown',
      markdown: {
        title: '阿里股价',
        text: `#### 阿里股价 \n ##### 现在：${res.current} \n ##### 最高：${
          res.top
        } \n ##### 最低：${res.down} \n ##### 开盘：${res.open} \n [详情](${
          res.url
        }) `
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
});
