import { createContext, useState } from "react";
import runChat from "../config/gemini";

// Create the context
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 35 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // ✅ Fixed: Always store the prompt in prevPrompts
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let usedPrompt = prompt !== undefined ? prompt : input;

    if (usedPrompt.trim()) {
      setPrevPrompts((prev) => [...prev, usedPrompt]);
      setRecentPrompt(usedPrompt);
    }

    const response = await runChat(usedPrompt);

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split("");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + "");
    }

    setLoading(false);
    setInput("");
  };

  // Providing the context value to the rest of the app
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
