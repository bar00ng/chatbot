'use client'

import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { useChat } from "ai/react"
import { Bot, Trash, XCircle } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function AIChatBox({ open, onClose }) {
    const [info, setInfo] = useState(false);

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        isLoading,
        error
    } = useChat()

    const inputRef = useRef(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    useEffect(() => {
        if (open) {
            inputRef.current?.focus()
        }
    }, [open])

    const lastMessageIsUser = messages[messages.length - 1]?.role === "user"

    return (
        <div
            className={cn(
                "bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36",
                open ? "fixed" : "hidden"
            )}
        >
            <button onClick={onClose} className="mb-1 ms-auto block">
                <XCircle size={30} />
            </button>
            <div className="flex h-[500px] flex-col rounded border bg-background shadow-xl">
                <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
                    {messages.map(message => (
                        <ChatMessage message={message} key={message.id} />
                    ))}
                    {isLoading && lastMessageIsUser && (
                        <ChatMessage
                            message={{
                                role: "assistant",
                                content: "Sendang mencari jawaban..."
                            }}
                        />
                    )}
                    {error && (
                        <ChatMessage
                            message={{
                                role: "assistant",
                                content: "Terjadi kesalahan. Mohon coba lagi."
                            }}
                        />
                    )}
                    {!error && messages.length === 0 && !info && (
                        <>
                            <ChatMessage
                                message={{
                                    role: "assistant",
                                    content: "Selamat datang di Asisten Virtual Kampus! Saya siap membantu Anda dengan informasi tentang pendaftaran jurusan, dan biaya kuliah. Silahkan ajukan pertanyaan atau pilih kategori yang anda butuhkan."
                                }}
                            />

                            <div className="grid gap-1 sm:grid-cols-2 mx-6">
                                <Button
                                    title="Pendaftaran"
                                    type="button"
                                    onClick={() => { setInfo('Pendaftaran') }}
                                >Pendaftaran</Button>

                                <Button
                                    title="Jurusan"
                                    type="button"
                                    onClick={() => { setInfo('Jurusan') }}
                                >Jurusan</Button>

                                <Button
                                    title="Biaya Perkuliahan"
                                    type="button"
                                    onClick={() => { setInfo('Biaya') }}
                                >Biaya Perkuliahan</Button>
                            </div>
                        </>
                    )}

                    {info == "Biaya" && messages.length === 0 && !error && (
                        <div className="mt-2">
                            <ChatMessage
                                message={{
                                    role: "assistant",
                                    content: "Silahkan bertanya mengenai Biaya Perkuliahan pada saya."
                                }}
                            />

                        </div>
                    )}

                    {info == "Pendaftaran" && messages.length === 0 && !error && (
                        <div className="mt-2">
                            <ChatMessage
                                message={{
                                    role: "assistant",
                                    content: "Silahkan bertanya mengenai Pendaftaran pada saya."
                                }}
                            />

                        </div>
                    )}

                    {info == "Jurusan" && messages.length === 0 && !error && (
                        <div className="mt-2">
                            <ChatMessage
                                message={{
                                    role: "assistant",
                                    content: "Silahkan bertanya mengenai Jurusan pada saya."
                                }}
                            />

                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="m-3 flex gap-1">
                    <Button
                        title="Clear chat"
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                        type="button"
                        onClick={() => {
                            setMessages([])
                            setInfo(false)
                        }}
                    >
                        <Trash />
                    </Button>
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Tanyakan sesuatu..."
                        ref={inputRef}
                    />
                    <Button type="submit">Send</Button>
                </form>
            </div>
        </div>
    )
}

function ChatMessage({ message: { role, content } }) {
    const { user } = useUser()

    const isAiMessage = role === "assistant"

    return (
        <div
            className={cn(
                "mb-3 flex items-center",
                isAiMessage ? "me-5 justify-start" : "ms-5 justify-end"
            )}
        >
            {isAiMessage && <Bot className="mr-2 shrink-0" />}
            <p
                className={cn(
                    "whitespace-pre-line rounded-md border px-3 py-2",
                    isAiMessage ? "bg-background" : "bg-primary text-primary-foreground"
                )}
            >
                {content}
            </p>
            {!isAiMessage && user?.imageUrl && (
                <Image
                    src={user.imageUrl}
                    alt="User image"
                    width={100}
                    height={100}
                    className="ml-2 h-10 w-10 rounded-full object-cover"
                />
            )}
        </div>
    )
}
