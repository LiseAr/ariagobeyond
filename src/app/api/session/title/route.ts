import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemInstructions = {
    role: 'system',
    content: 'Crie um título simples para a conversa.'
  }

  return openai.chat.completions
    .create({
      model: 'gpt-3.5-turbo',
      messages: [systemInstructions, ...messages]
    })
    .then((response) => {
      console.log('response', response)
      return NextResponse.json({ response })
    })
    .catch((error) => {
      return NextResponse.json(new Error('An error occurred'))
    })
}
