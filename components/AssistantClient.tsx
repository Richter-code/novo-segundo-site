"use client"

import dynamic from 'next/dynamic'
const AssistantChat = dynamic(() => import('./AssistantChat'), { ssr: false })

export default function AssistantClient() {
  return <AssistantChat />
}
