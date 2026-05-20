import express from "express";
import { Configuration, OpenAIApi } from "openai";
import process from "node:process";

const app = express();
const PORT = 8000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

app.use(express.json());

async function createOpenAiChat(messages) {
  const response = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages
  });

  console.log("response", response.data);
  return response.data;
}

app.post("/converse", async (req, res) => {
  try {
    const { message } = req.body;

    const conversation = [
      {
        role: "system",
        content:
          "Você é uma IA chamada PAQUITO que ajuda a procurar empregos para jovens em inicio de carreira"
      },
      {
        role: "user",
        content: message
      }
    ];

    const response = await createOpenAiChat(conversation);
    res.json(response);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: String(error) });
  }
});

app.listen(PORT, () => {
  console.log(`Escutando o servidor na porta: ${PORT}`);
});