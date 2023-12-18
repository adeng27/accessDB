import { Message } from "ai";
// import { useChat } from "ai/react";
import { useState } from "react";
import { api } from "~/utils/api";

export default function AIChat() {
    const sendPrompt = api.openai.chatCompletion.useMutation();
    const [prompt, setPrompt] = useState("");

    const handleClick = () => {
        sendPrompt.mutate({
            prompt
        });
    }

    return (
        <div className="w-full max-w-xs">
            <div>Ask the AI:</div>
            <input 
                type="text" 
                placeholder="Find a resource!"
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button 
                onClick={() => handleClick()}
            >SEND</button>
        </div>
    )
}

function ChatMessage({message: {role, content}}: {message: Message}) {
    return (
        <div className="mb-3">
            <div>{role}</div>
            <div>{content}</div>
        </div>
    )
}