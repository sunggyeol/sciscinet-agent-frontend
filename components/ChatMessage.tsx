'use client';

import { Message } from '@/types';
import dynamic from 'next/dynamic';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const VegaVisualization = dynamic(() => import('./VegaVisualization'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center">
      <div className="text-gray-400">Loading visualization...</div>
    </div>
  ),
});

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group relative mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${message.vegaSpec ? 'w-full' : 'max-w-[80%]'} flex-col gap-2 rounded-2xl px-4 py-3 ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-800 text-gray-100'
      }`}>
        {!isUser && !message.vegaSpec && (
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
            title="Copy message"
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-green-400" />
            ) : (
              <ClipboardIcon className="h-4 w-4 text-gray-400 hover:text-gray-200" />
            )}
          </button>
        )}
        
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="space-y-3">
            {message.analysis && (
              <div className="space-y-2">
                <p className="text-sm font-medium leading-relaxed">{message.analysis.summary}</p>
                {message.analysis.key_findings && message.analysis.key_findings.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                      Key Findings
                    </p>
                    <ul className="space-y-1 text-xs text-gray-300">
                      {message.analysis.key_findings.map((finding, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {message.vegaSpec && (
              <div className="mt-3 overflow-hidden rounded-xl bg-gray-900 p-4 shadow-sm border border-gray-700">
                <VegaVisualization spec={message.vegaSpec} />
              </div>
            )}
            
            {!message.vegaSpec && !message.analysis && (
              <p className="text-sm leading-relaxed">{message.content}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

