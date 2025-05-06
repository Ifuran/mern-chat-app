import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, i) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={i === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="mx-auto mt-5">
          <AiOutlineLoading3Quarters className="animate-spin" />
        </span>
      ) : null}
    </div>
  );
};

export default Conversations;
