import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";
import { Message } from "./components/Chat";
import { createServerData$ } from "solid-start/server";
import { Configuration, OpenAIApi } from "openai";

export default createHandler(
  renderAsync((event) => <StartServer event={event} />)
);


const configuration = new Configuration({
  apiKey: "AUTH",
});

export const getAnswer = async (messages: Message[]) => {
  const openai = new OpenAIApi(configuration);
  const response = [
    { role: "system", content: "You are a helpful assistant." },
    ...messages,
  ];

  // const response = await openai.createCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       { role: "system", content: "You are a helpful assistant." },
  //       ...messages,
  //     ],
  //   })
  const responseMessage: Message = {
    content: response,
    role: "System",
    };
  return createServerData$(() => response);
};