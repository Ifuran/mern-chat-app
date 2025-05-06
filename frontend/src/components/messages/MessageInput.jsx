import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-3 bg-gray-700 border-gray-600 text-white"
          placeholder="Type here.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <IoMdSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
