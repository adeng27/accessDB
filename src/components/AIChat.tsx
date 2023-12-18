import { Message } from "ai";
// import { useChat } from "ai/react";
import { useState } from "react";
import { api } from "~/utils/api";

export default function AIChat() {
    const sendPrompt = api.openai.chatCompletion.useMutation({
        onSuccess: (data) => {
            console.log(data);
            setUserMessage(prompt);
            const messageContent = data.choices[0]?.message.content;
            typeof messageContent === "string" ? setAiMessage(messageContent) : setAiMessage("something went wrong")
        }
    });
    const [prompt, setPrompt] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [aiMessage, setAiMessage] = useState("");

    return (
        <div className="w-full max-w-xs">
            <div>Ask the AI:</div>
            <form onSubmit={(e)=> {
                e.preventDefault();
                sendPrompt.mutate({ prompt });
            }}>
                <input 
                    type="text" 
                    placeholder="Find a resource!"
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit">SEND</button>
            </form>
            <div>
                {userMessage}
            </div>
            <div>
                {aiMessage}
            </div>
        </div>
    )
}