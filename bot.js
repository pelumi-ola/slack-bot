require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/hello", async ({ command, ack, respond }) => {
  await ack();

  await respond(`Hello, ${command.user_name}! 👋`);
});

app.message(async ({ message, say }) => {
  console.log("----- New Slack Message -----");
  console.log("User:", message.user);
  console.log("Channel:", message.channel);
  console.log("Message:", message.text);

  const text = message.text?.toLowerCase();

  if (text === "hello bot") {
    await say("Hello! 👋 How can I help you?");
  }

  if (text === "help") {
    await say("Available commands:\n• /hello\n• hello bot\n• help");
  }
});

(async () => {
  await app.start();

  console.log("⚡ Slack bot is running!");
})();
