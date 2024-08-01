import { ChatAnthropic } from "@langchain/anthropic";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import {
  RunnableWithMessageHistory,
  RunnablePassthrough,
  RunnableSequence
} from "@langchain/core/runnables";
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const config = {
  configurable: {
    sessionId: "abc2",
  },
};

const model = new ChatAnthropic({
	temperature: 0.9,
  model: "claude-3-5-sonnet-20240620",
  apiKey: process.env.ANTHROPIC_API_KEY,
  maxTokens: 1024,
});

const messageHistories = {};

const messages = [
  new HumanMessage({ content: "hi! My name is Bob" }),
  new AIMessage({ content: "hi! I remembered you name" }),
  new HumanMessage({ content: "I like vanilla ice cream" }),
  new AIMessage({ content: "nice" }),
  new HumanMessage({ content: "whats 2 + 2" }),
  new AIMessage({ content: "4" }),
  new HumanMessage({ content: "thanks" }),
  new AIMessage({ content: "No problem!" }),
  new HumanMessage({ content: "having fun?" }),
  new AIMessage({ content: "yes!" }),
  new HumanMessage({ content: "That's great!" }),
  new AIMessage({ content: "yes it is!" }),
];

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant who remembers all details the user shares with you.`,
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
]);

const chain = RunnableSequence.from([
  RunnablePassthrough.assign({
    chat_history: ({ chat_history }) => chat_history,
  }),
  prompt,
  model,
]);

const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
	getMessageHistory: async (sessionId) => {
    if (messageHistories[sessionId] === undefined) {
      const messageHistory = new InMemoryChatMessageHistory();
      await messageHistory.addMessages(messages);
      messageHistories[sessionId] = messageHistory;
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

async function run() {
  while (true) {
    const userInput = await askQuestion("Enter your question (or 'exit' to quit): ");
    
    if (userInput.toLowerCase() === 'exit') {
      console.log("Exiting the program.");
      rl.close();
      break;
    }

    const streamResponse = await withMessageHistory.stream(
      {
        input: userInput,
      },
      config
    );

    process.stdout.write("AI: ");
    for await (const chunk of streamResponse) {
      process.stdout.write(chunk.content);
    }
    console.log("\n");
  }
}

run().catch(console.error);