import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json(new Error('Email is required'))
  }

  return prisma.user
    .findUnique({
      where: { email }
    })
    .then((user) => {
      return NextResponse.json(user)
    })
    .catch((error) => {
      return NextResponse.json(new Error('An error occurred'))
    })
}
