import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemInstructions = {
    role: 'system',
    content:
      "Behave as if you were a voice assistant for the user. If you ask things like the weather forecast or today's horoscope, or today's news, create it as if you were accessing the internet. Speak in a relaxed and intellectual way. And always create short answers."
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [systemInstructions, ...messages]
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
