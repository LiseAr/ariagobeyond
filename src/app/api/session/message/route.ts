import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { message, role, chatSessionId } = await request.json()

  return prisma.chatSession
    .update({
      where: {
        id: chatSessionId
      },
      data: {
        messages: {
          create: {
            content: message,
            role: role,
            createdAt: new Date()
          }
        }
      }
    })
    .then((message) => {
      return NextResponse.json({ message })
    })
    .catch((error) => {
      return NextResponse.json(new Error('An error occurred'))
    })
}
