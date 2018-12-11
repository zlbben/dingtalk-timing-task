const schedule = require('node-schedule');
const fetch = require('node-fetch')

let dingtalkUrl = 'https://oapi.dingtalk.com/robot/send?access_token=215918f8f7fe1794ba4d96f4481f12890ecb708bec6db5d764975af51233b085'
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



