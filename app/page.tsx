'use client';

import { useState, useEffect, useRef } from 'react';
import { Message } from '@/types';
import { sendQuery } from '@/lib/api';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';

const exampleQueries = [
  'Show me the number of papers by year',
  'Show me the number of papers by field',
  'What are the most cited papers?',
  'Show me collaboration statistics over time',
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuery = async (query: string) => {
    const userMessage: Message = {
      role: 'user',
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await sendQuery(query);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.analysis.summary,
        vegaSpec: response.vega_spec,
        analysis: response.analysis,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to process query'}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-semibold text-white">SciSciNet Agent</h1>
            <p className="text-xs text-gray-400">AI-powered research data analysis</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-4">
            <div className="w-full max-w-2xl space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">
                  Welcome to SciSciNet Agent
                </h2>
                <p className="text-base text-gray-400">
                  Ask questions about VT CS research papers (2013-2022)
                </p>
              </div>

              <div className="pt-8">
                <ChatInput onSubmit={handleQuery} loading={loading} />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <div className="mx-auto max-w-5xl px-4 py-6">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {loading && (
                <div className="mb-4 flex justify-start">
                  <div className="rounded-2xl bg-gray-800 px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      {messages.length > 0 && (
        <div className="border-t border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <ChatInput onSubmit={handleQuery} loading={loading} />
          </div>
        </div>
      )}
    </div>
  );
}
