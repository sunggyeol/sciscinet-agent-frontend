'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ChatInputProps {
  onSubmit: (query: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSubmit, loading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !loading) {
      onSubmit(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question about research papers..."
        disabled={loading}
        rows={1}
        className="max-h-32 min-h-[44px] w-full resize-none overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 px-4 py-3 pr-12 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !input.trim()}
        className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Send message"
      >
        <PaperAirplaneIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

