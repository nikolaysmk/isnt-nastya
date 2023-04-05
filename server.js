const tokenTelegram = '6072920921:AAHtj_ONrkEl1fcy9fLU40x7MRtEmbtIRGw'
const openaiApiKey = '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'

const TelegramBot = require('node-telegram-bot-api')
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: openaiApiKey,
})

const openaiApi = new OpenAIApi(configuration)

const bot = new TelegramBot(tokenTelegram, { polling: true })

bot

bot.on('message', async msg => {
  console.log(msg.text)

  const chatId = msg.chat.id
  const question =
    prompt => `Write a post for instagram for the photo ${prompt}. 

Include emoji and the best Instagram hashtags for this post. 

Format each new sentence with a new line to make the text more readable 

The writing style is friendly and use more emoji. 
The answer is in Russian only`

  // const response = await openaiApi.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: question(msg.text),
  //   temperature: 0.7,
  //   max_tokens: 1024,
  //   top_p: 1,
  // });

  console.log(question(msg.text))
  const response = await openaiApi.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: question(msg.text) }],
  })

  console.log(response.data)

  const answer = response.data.choices[0].message.content
  console.log(answer)
  bot.sendMessage(chatId, answer)
  fs.appendFileSync('prompt.txt', msg.text, 'utf8')
  fs.appendFileSync('answer.txt', answer, 'utf8')
})
