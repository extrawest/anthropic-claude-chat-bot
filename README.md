# Anthropic Claude Chat Bot

This project implements a chat bot using Anthropic's Claude AI model, with conversation memory and streaming capabilities. It's built using Node.js and leverages the LangChain framework for AI interactions.

## Technologies and Frameworks Used

- **Node.js**: The runtime environment for executing the JavaScript code.
- **LangChain**: A framework for developing applications powered by language models.

### Libraries and Packages

- **@langchain/anthropic**: For interacting with Anthropic's Claude AI model.
- **@langchain/core**: Core LangChain functionalities for prompts, messages, and chat history.
- **dotenv**: For loading environment variables.

## Key Concepts and Features

1. **Chat Model**: Uses Anthropic's Claude 3.5 Sonnet model for generating responses.
2. **Conversation Memory**: Implements in-memory chat history to maintain context across interactions.
3. **Message Filtering**: Limits the conversation history to the last 10 messages to manage context length.
4. **Prompt Templates**: Utilizes ChatPromptTemplate for structuring prompts with system messages and placeholders.
5. **Runnable Sequences**: Implements a chain of operations using RunnableSequence for processing inputs and generating responses.
6. **Streaming Responses**: Supports streaming of AI responses for real-time output.

## Setup and Configuration

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file with the following variable:
   - `ANTHROPIC_API_KEY`: Your Anthropic API key

## Usage

Run the script with:

```bash
node index.js
```

The script demonstrates the chat bot's capabilities by:

1. Initializing with a pre-defined conversation history.
2. Asking a question that requires remembering previous information.
3. Streaming the AI's response to the console.

## Customization

- Modify the messages array to change the initial conversation history.
- Adjust the prompt template to alter the system message or structure of the prompts.
- Change the model configuration in the ChatAnthropic constructor to use different Claude models or parameters.