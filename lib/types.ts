import { Message } from 'ai'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  messages: Message[]
}