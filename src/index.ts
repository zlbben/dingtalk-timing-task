const schedule = require('node-schedule');
const fetch = require('node-fetch');

let dingtalkUrl =
  'https://oapi.dingtalk.com/robot/send?access_token=1559976653999f704af684658de80b2a52038ba5ba434c45435c2cebc2393a9c';

let dingMessage = {
  msgtype: 'text',
  text: {
    content: ''
  },
  at: {
    atMobiles: [],
    isAtAll: true
  }
};

schedule.scheduleJob('0 10,11,15,16,17,18 * * 1-5', function(fireDate) {
  dingMessage.text.content =
    '坐太久了，大家起来活动啦：' + new Date().toTimeString();
  fetch(dingtalkUrl, {
    method: 'post',
    body: JSON.stringify(dingMessage),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(json => console.log(json));
  console.log(new Date().toTimeString());
});
