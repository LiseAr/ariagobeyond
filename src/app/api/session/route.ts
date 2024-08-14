import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const { userId } = await request.json()

  return prisma.chatSession
    .create({
      data: {
        user: {
          connect: { id: userId }
        },
        createdAt: new Date(),
        title: 'Nova conversa'
      }
    })
    .then((userSession) => {
      return NextResponse.json({ userSession })
    })
    .catch((error) => {
      return NextResponse.json(new Error('An error occurred'))
    })
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json(new Error('Id is required'))
  }
  return prisma.chatSession
    .findMany({
      where: {
        userId: parseInt(id)
      },
      include: {
        messages: true
      }
    })
    .then((sessions) => {
      return NextResponse.json({ sessions })
    })
    .catch((error) => {
      return NextResponse.json(new Error('An error occurred'))
    })
}

export async function PATCH(request: NextRequest) {
  const { id, data } = await request.json()
  return prisma.chatSession
    .update({
      where: {
        id
      },
      data
    })
    .then((session) => {
      return NextResponse.json({ session })
    })
    .catch((error) => {
      return NextResponse.json(new Error('An error occurred'))
    })
}

export async function DELETE(request: NextRequest) {
  const { userId } = await request.json()

  const emptySession = await prisma.chatSession.findMany({
    where: {
      userId,
      messages: {
        none: {}
      }
    }
  })

  const ids = emptySession.map((session) => session.id)

  if (ids.length === 0) {
    return NextResponse.json({ message: 'No sessions to delete' })
  }

  prisma.chatSession
    .deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
    .then(() => {
      return NextResponse.json({ message: 'Sessions deleted' })
    })
}
