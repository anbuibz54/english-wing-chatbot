'use client'
import {  useState } from 'react';
import {type IMessage} from '@/model/message/message-model'
import getChatbotResponse from '@/services/chatbot-service/chatbot-service';

export default function ChatBot() {
  const [messages, setMessages] = useState<IMessage[]>([
    { role: 'bot', content: 'Hello! I\'m your English Grammar Tutor. How can I help you today?' },
  ]);
  const [inputText, setInputText] = useState('');
 const [isLoading, setIsLoading] = useState(false); // Add loading state
  const handleSubmit = async () => {
    setMessages((preState)=>[...preState,{ role: 'user', content: inputText }]);
    setInputText('');
    setIsLoading(true); // Start loading
    const responsedText = await getChatbotResponse(inputText);
    setIsLoading(false); 
    setMessages((preState)=>[...preState, { role: 'bot', content: responsedText }]);
  };
  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-lg shadow-lg"> {/* Colorful background */}
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Let's Learn English! </h1> {/* Friendly title */}
      <div className="chat-window h-96 overflow-y-auto mb-4 p-4 border border-dashed border-green-500 rounded-lg"> {/* Dashed border */}
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : ''}`}> {/* Flexbox for alignment */}
            <span 
              className={`px-3 py-1 rounded-lg text-lg ${
                msg.role === 'user' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-green-100 text-green-700'
              } shadow-md`} // Lighter colors, shadow
            >
              {msg.content}
            </span>
            {msg.role === 'bot' && ( // Add an avatar for the bot
              <img 
                src="/chatbot-avatar.jfif" // Replace with your avatar image
                alt="Bot Avatar" 
                className="w-10 h-10 ml-2 rounded-full" 
              />
            )}
          </div>
        ))}
        {isLoading && ( // Show loading indicator while waiting
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 mr-2"></div>
            <span>Typing...</span>
          </div>
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow p-2 border border-blue-300 rounded-l-lg focus:outline-none focus:border-blue-500" // Focus styling
          placeholder="Type your message here..."
        />
        <button onClick={async()=>{
          await handleSubmit();
        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
          Send  {/* Add an emoji */}
        </button>
      </div>
    </div>
  );
}