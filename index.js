var SlackBot = require("slackbots");
var channel = "general";

// create a bot
var bot = new SlackBot({
  token: 'xoxb-491925787618-493382465046-188ckj3xdwgQoashWdjxnpne',
  name: "Jokes Bot"
})

bot.on("start", function() {
    bot.postMessageToChannel(channel, "Hello world!");
});

bot.on("message", function(data) {
    if (data.type !== "message") {
        return;
    }

    handleMessage(data.text);
});

function handleMessage(message) {
    switch(message) {
        case "hi":
        case "hello":
            sendGreeting();
            break;
        default:
            return;
    }
}

function sendGreeting() {
    var greeting = getGreeting();
    bot.postMessageToChannel(channel, greeting);
}

function getGreeting() {
    var greetings = [
        "hello!",
        "hi there!",
        "cheerio!",
        "how do you do!",
        "¡hola!"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
}