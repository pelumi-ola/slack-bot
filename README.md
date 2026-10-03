# Slack Bot Using the Slack API

A simple Slack bot built with **Node.js**, **JavaScript**, and the **Slack Bolt framework**. The bot demonstrates how to authenticate with Slack, respond to slash commands, listen for messages, and log Slack events.

## Project Overview

This project was developed as part of an exercise to learn how to build and integrate a bot using the Slack API.

The bot can:

- Respond to the `/hello` Slack slash command.
- Listen for messages in a Slack channel.
- Respond to specific messages such as `hello bot`.
- Provide a simple `help` response.
- Log received Slack messages in the terminal.
- Communicate with Slack using Socket Mode.

## Technologies Used

- **Node.js**
- **JavaScript**
- **Slack API**
- **Slack Bolt for JavaScript**
- **Slack Events API**
- **Slack Socket Mode**
- **dotenv**

## Project Structure

```text
slack-bot/
│
├── node_modules/
├── .env
├── .gitignore
├── bot.js
├── package.json
└── package-lock.json
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- A Slack workspace
- A Slack app created through the Slack API
- A Slack Bot Token
- A Slack App-Level Token

## Slack App Configuration

The Slack app was created through the Slack API platform.

The app was configured with the required permissions and features for the bot.

### Bot Token Scopes

The following permissions were configured for the bot:

```text
chat:write
channels:history
```

### Socket Mode

Socket Mode was enabled to allow the Node.js application to receive events from Slack without requiring a publicly accessible HTTP endpoint.

An App-Level Token with the following scope was used:

```text
connections:write
```

### Events

The Slack Events API was configured to allow the application to receive messages from channels.

### Slash Command

The following slash command was created:

```text
/hello
```

The command is handled by the Node.js application and responds with a greeting.

## Installation

Clone the repository and navigate into the project:

```bash
git clone <your-github-repository-url>
cd slack-bot
```

Install the project dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root of the project:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-level-token
```

The tokens should not be committed to GitHub.

## `.gitignore`

The `.gitignore` file contains:

```text
node_modules/
.env
```

This prevents sensitive environment variables and installed dependencies from being committed to the repository.

## Running the Bot

Start the bot with:

```bash
node bot.js
```

When the application starts successfully, the terminal displays:

```text
⚡ Slack bot is running!
```

## Bot Features

### 1. `/hello` Command

In Slack, type:

```text
/hello
```

The bot responds with:

```text
Hello, YourName! 👋
```

The user's Slack username is retrieved from the command payload.

### 2. Message Listener

The bot listens for messages received from Slack.

For example:

```text
hello bot
```

The bot responds:

```text
Hello! 👋 How can I help you?
```

### 3. Help Message

When the following message is sent:

```text
help
```

The bot responds with:

```text
Available commands:
• /hello
• hello bot
• help
```

### 4. Message Logging

Messages received by the bot are logged in the terminal.

Example:

```text
----- New Slack Message -----
User: U012345678
Channel: C012345678
Message: hello bot
```

This demonstrates how the Slack Events API can be used to receive and process Slack events.

## Example Bot Code

The main application is contained in `bot.js`.

```javascript
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
```

## Testing

The following tests were performed:

| Test                      | Expected Result                  |
| ------------------------- | -------------------------------- |
| Start Node.js application | Bot starts successfully          |
| `/hello`                  | Bot responds with a greeting     |
| `hello bot`               | Bot responds to the message      |
| `help`                    | Bot displays available commands  |
| Send a channel message    | Message appears in terminal logs |

## Learning Outcomes

Through this exercise, I learned how to:

- Create and configure a Slack application.
- Configure Slack bot permissions.
- Generate and use Slack authentication tokens.
- Use the Slack Bolt framework with Node.js.
- Implement Slack slash commands.
- Receive and handle Slack messages.
- Use the Slack Events API.
- Use Socket Mode for local development.
- Store sensitive credentials using environment variables.
- Test a bot directly within a Slack workspace.

## Future Improvements

Possible improvements to the bot include:

- Adding more slash commands.
- Supporting more natural-language messages.
- Connecting the bot to an external database.
- Adding persistent message logging.
- Integrating external APIs.
- Adding richer Slack responses using blocks and interactive components.
- Deploying the bot to a cloud hosting platform.

## Resources

- [Slack API Documentation](https://api.slack.com/?utm_source=chatgpt.com)
- [Slack Bolt for JavaScript](https://slack.dev/bolt-js/tutorial/getting-started?utm_source=chatgpt.com)
- [Slack Events API](https://api.slack.com/apis/connections/events-api?utm_source=chatgpt.com)
- [Node.js](https://nodejs.org/?utm_source=chatgpt.com)

## Author

**Esther Pelumi Ola**

Frontend Developer | Software Engineering Student
