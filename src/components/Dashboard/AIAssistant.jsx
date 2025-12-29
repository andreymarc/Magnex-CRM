import { useState } from 'react'
import { FiX, FiSend, FiZap } from 'react-icons/fi'

export default function AIAssistant({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI assistant. I can help you with:\n• Generating reports\n• Analyzing deals\n• Finding contacts\n• Answering questions about your CRM\n\nWhat would you like to know?'
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your data, I can see that your conversion rate has improved by 15% this month. Would you like me to generate a detailed report?",
        "I found 12 high-priority leads that match your ideal customer profile. Should I create a task list for follow-ups?",
        "Your sales pipeline shows 3 deals that are likely to close this week. The total value is $45,000. Want me to prepare a summary?",
        "I've analyzed your email interactions. 5 customers haven't responded in over 7 days. Would you like me to suggest follow-up messages?",
        "Great! I can help with that. Let me analyze your data and get back to you with insights."
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-2xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <FiZap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">AI Assistant</h3>
            <p className="text-white/80 text-xs">Powered by AI</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-1 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-end space-x-2 rtl:space-x-reverse">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

