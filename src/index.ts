const schedule = require('node-schedule');
const fetch = require('node-fetch')

let dingtalkUrl = 'https://oapi.dingtalk.com/robot/send?access_token=2f6de77b2f1ad2dc3e0decfd63c29b99db1d73c2f4aacdf83f7464892397c222'
let dingMessage = {
  msgtype: "text",
  text: {
    content: ""
  },
  at: {
    atMobiles: [],
    isAtAll: true
  }
}

schedule.scheduleJob('0 11,15,16,17,18 * * 1-5', function (fireDate) {
  dingMessage.text.content = '坐太久了，大家起来活动啦：' + new Date().toTimeString()
  fetch(dingtalkUrl, {
    method: 'post',
    body: JSON.stringify(dingMessage),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(json => console.log(json));
  console.log(new Date().toTimeString());
});



