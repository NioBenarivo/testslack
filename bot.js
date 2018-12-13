const SlackBot = require("slackbots");
const request = require('request');

const envKey = process.env.JOKES_BOT_TOKEN

const bot = new SlackBot({
  token: envKey,
  name: 'Jokes Bot'
});

bot.on("start", function() {
  let params = {
    icon_emoji: ':cat:'
  }

  bot.postMessageToChannel('general', 'meow!', params);
  bot.postMessageToUser('user_name', 'meow!', params);
  bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' });
  bot.postMessageToGroup('private_group', 'meow!', params);
});

bot.on("message", msg => {
  switch (msg.type) {
  case "message":
    if (msg.channel[0] === "D" && msg.bot_id === undefined) {
      bot.postMessage(msg.user, "hi", { as_user: true })
    }
    break
  }
})

const getRandomJoke = (callback, user) => {
  return request("https://icanhazdadjoke.com/slack", (error, response) => {
    if (error) {
      console.log("Error: ", error)
    } else {
      let jokeJSON = JSON.parse(response.body)
      let joke = jokeJSON.attachments[0].text
      return callback(joke, user)
    }
  })
}

const postMessage = (message, user) => {
  bot.postMessage(user, message, { as_user: true })
}

// bot.on("start", function() {
//   bot.postMessageToChannel(channel, "Hi, I'm alive and well! Please ask me anything related to unify! type `help` for more info");
// });

// bot.on("message", function(data) {
//   if (data.type !== "message") {
//     return;
//   }

//   handleMessage(data.text);
// });

// const getRandomJoke = (callback, user) => {
//   return request("https://icanhazdadjoke.com/slack", (error, response) => {
//     if (error) {
//       console.log("Error: ", error)
//     } else {
//       let jokeJSON = JSON.parse(response.body)
//       let joke = jokeJSON.attachments[0].text
//       return callback(joke, user)
//     }
//   })
// }

// const postMessage = (message, user) => {
//   bot.postMessage(user, message, { as_user: true })
// }

// function handleMessage(message) {
//   switch(message) {
//     case "hi":
//     case "hello":
//       sendGreeting();
//       break;
//     case "message":
//       if (msg.channel[0] === "D" && msg.bot_id === undefined) {
//         bot.postMessage(msg.user, "hi", { as_user: true })
//       }
//       break;
//     case "help":
//       listHelp();
//       break;
//     default:
//       return;
//   }
// }

// listHelp = () => {
//   let list = 'Commands: \n' + 
//   '>>> `<component name>` or `<component label>` \n' +
//   'Example: `button` or `btn`'

//   bot.postMessageToChannel(channel, list);
// }

// function sendGreeting() {
//   var greeting = getGreeting();
//   bot.postMessageToChannel(channel, greeting);
// }

// function getGreeting() {
//   var greetings = [
//     "hello!",
//     "hi there!",
//     "cheerio!",
//     "how do you do!",
//     "¡hola!"
//   ];

//   return greetings[Math.floor(Math.random() * greetings.length)];
// }
