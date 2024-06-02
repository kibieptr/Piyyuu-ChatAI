import { requestToGroq } from "./utils/groq";
import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const content = document.getElementById("content");
    setLoading(true);
    setTimeout(async () => {
      const ai = await requestToGroq(content.value);
      setData(ai);
      setLoading(false);
    }, 2000);
  };

  const customStyle = {
    ...oneDark,
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      fontFamily: "sans-serif, italic",
    },
  };

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto">
      <h1 className="text-4xl text-indigo-500">Piyyuu Chat AI</h1>
      <form className="flex flex-col gap-4 py-4 w-full">
        <div className="flex gap-2">
          <input
            placeholder="Type your message here"
            className="py-4 px-4 text-md rounded-md flex-grow focus:outline-none"
            id="content"
            type="text"
          />
          <button
            onClick={handleSubmit}
            type="button"
            className={`py-4 px-5 font-bold text-white rounded-md flex justify-center items-center ${
              loading ? "bg-gray-400" : "bg-indigo-500"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
          </button>
        </div>
      </form>
      <div className="max-w-xl w-full mx-auto">
        {data ? (
          <SyntaxHighlighter
            language="bash"
            style={customStyle}
            wrapLongLines={true}
          >
            {data}
          </SyntaxHighlighter>
        ) : null}
      </div>
    </main>
  );
}

export default App;
