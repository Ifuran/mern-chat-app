import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && (
        <div className="mx-auto mt-5">
          <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
        </div>
      )}

      {!loading && messages.length === 0 && (
        <div className="mx-auto text-center mt-5">
          Send a message to start the conversation
        </div>
      )}

      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
