const tokenTelegram = "6072920921:AAHtj_ONrkEl1fcy9fLU40x7MRtEmbtIRGw";
const openaiApiKey = "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";

const TelegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: openaiApiKey,
});

const openaiApi = new OpenAIApi(configuration);

const bot = new TelegramBot(tokenTelegram, { polling: true });

bot.on("message", async (msg) => {
  console.log(msg.text);

  const chatId = msg.chat.id;
  const question = (
    prompt
  ) => `Create a instagram post for personal page. Post with a ${prompt} description. /n
/n
Include emoji and the best Instagram hashtags for this post. /n
/n
Format each new sentence with a new line to make the text more readable. /n
/n
This post is intended for girls./n
The writing style is gentle and friendly and use more emoji. /n
Don't write the year. /n
The answer is in Russian only`;

  // const response = await openaiApi.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: question(msg.text),
  //   temperature: 0.7,
  //   max_tokens: 1024,
  //   top_p: 1,
  // });

  console.log(question(msg.text));
  const response = await openaiApi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: question(msg.text) }],
  });

  console.log(response.data);

  const answer = response.data.choices[0].message.content;
  console.log(answer);
  bot.sendMessage(chatId, answer);
});
