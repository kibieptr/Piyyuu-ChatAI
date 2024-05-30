import { Groq } from "groq-sdk";

const GROQ_API = import.meta.env.VITE_PIYYUAI;

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true,
});

export const requestToGroq = async (content) => {
  const reply = groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
  });
  return (await reply).choices[0].message.content;
};
