import { ROLE } from '@/store/useMessagesStore'
import { useSessionStore } from '@/store/useSessionStore'
import useUserStore from '@/store/useUserStore'

const usePrisma = () => {
  const { sessionId, setSessionId, setSessions } = useSessionStore()
  const { user } = useUserStore()
  // User
  const getUser = (email: string) => {
    return fetch(`api/user?email=${email}`, {
      method: 'GET'
    }).then((response) => response.json())
  }

  // Session
  const generateSessionTitle = (messages: any) => {
    return fetch('api/session/title', {
      method: 'POST',
      body: JSON.stringify({
        messages
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const title = data?.response?.choices[0]?.message?.content
        updateSessionTitle(title)
      })
  }

  const createSession = (userId: number) => {
    if (sessionId) return

    fetch('api/session', {
      method: 'POST',
      body: JSON.stringify({
        userId
      })
    })
      .then((response) => {
        console.log('response', response)
        return response.json()
      })
      .then((data) => {
        console.log('data', data)
        setSessionId(data?.userSession?.id)
      })
  }

  const getAllSessions = (id: number) => {
    return fetch(`api/session?id=${id}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) =>
        setSessions(
          data.sessions.filter((session: any) => session.messages.length > 0)
        )
      )
  }

  const updateSessionTitle = (title: string) => {
    fetch('api/session', {
      method: 'PATCH',
      body: JSON.stringify({
        id: sessionId,
        data: {
          title
        }
      })
    }).then((response) => {
      console.log('response', response)
      // return response.json()
    })
    // .then((data) => {
    //   console.log('data', data)
    // })
  }

  const removeIdleSession = () => {
    return fetch('api/session', {
      method: 'DELETE',
      body: JSON.stringify({
        userId: user?.id
      })
    }).then((response) => {
      console.log('response', response)
    })
  }

  // Message
  const addMessage = (message: string, role: ROLE) => {
    fetch('api/session/message', {
      method: 'POST',
      body: JSON.stringify({
        message,
        chatSessionId: sessionId,
        role
      })
    })
  }

  return {
    generateSessionTitle,
    sessionId,
    createSession,
    getAllSessions,
    addMessage,
    updateSessionTitle,
    getUser,
    removeIdleSession
  }
}
export { usePrisma }
