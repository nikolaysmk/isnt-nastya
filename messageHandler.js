require('dotenv').config()

const fs = require('fs')
const { OpenAIApi } = require('openai')

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const openaiApi = new OpenAIApi({
  apiKey: OPENAI_API_KEY,
})

const question = prompt => `Write a post for instagram for the photo ${prompt}. 
Include emoji and the best Instagram hashtags for this post. 
Format each new sentence with a new line to make the text more readable 
The writing style is friendly and use more emoji. 
The answer is in Russian only`

const handleMessage = async (msg, bot) => {
  const chatId = msg.chat.id
  console.log('message: ', msg.chat.id)

  try {
    console.log('msg.text', msg.text)
    const response = openaiApi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question(msg.text) }],
    })
    const answer = response?.data?.choices[0]?.message?.content

    await bot.sendMessage(chatId, answer)

    fs.writeFile('hello.txt', answer, 'utf8')
  } catch (error) {
    response = error
    await bot.sendMessage(chatId, response)
  }
  console.log('answer: ', answer)
}

module.exports = handleMessage
