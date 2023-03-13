import { Button, Card, TextField, Typography } from "@suid/material";
import { createSignal } from "solid-js";
import { getAnswer } from "~/entry-server";


export type Message = {
  content: string;
  role: string;
};

export const Chat = () => {
  const [messages, setMessages] = createSignal([]);
  const [message, setMessage] = createSignal("");
  const [error, setError] = createSignal("");

  const sendMessage = async () => {
    if (!message()) {
      setError("Please enter a message");
      return;
    }
    setError("");
    const newMessage: Message = {
      content: message(),
      role: "User",
    };
    setMessages([...messages(), newMessage]);
    scrollToBottom(document.querySelector(".messages"));
    const responseMessage = await getAnswer(messages());
    console.log(responseMessage);
    setMessages([...messages(), responseMessage]);
    scrollToBottom(document.querySelector(".messages"));
    setMessage("");
  };

  const scrollToBottom = (element: HTMLBodyElement | null) => {
    if (element)
      element.scroll({ top: element.scrollHeight, behavior: "smooth" });
  };

  return (
    <div class="chat">
      <div class="messages" style="height:60vh; overflow-y: scroll;">
        {messages().map((msg: Message) => (
          <Card
            style={`padding: 1rem 2rem 0 2rem; margin:1rem; background-color:${
              msg.role === "User" ? "#f2f2f2" : "#fcb7b7"
            }`}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
              align={msg.role === "User" ? "right" : "left"}
            >
              {msg.role}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              align={msg.role === "User" ? "right" : "left"}
            >
              {msg.content}
            </Typography>
          </Card>
        ))}
      </div>
      <div class="controls" style="margin-top:2rem">
        <TextField
          type="text"
          placeholder="Message"
          value={message()}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <Button
          onClick={sendMessage}
          style="align:center; margin-left:1rem; margin-top:0.5rem"
          size="large"
        >
          Send
        </Button>
      </div>
      {error() && (
        <div class="error" style="margin-top: 1rem">
          {error()}
        </div>
      )}
    </div>
  );
};
