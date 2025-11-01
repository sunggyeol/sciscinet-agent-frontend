'use client';

import { useEffect, useRef } from 'react';
import embed from 'vega-embed';

interface VegaVisualizationProps {
  spec: object;
}

export default function VegaVisualization({ spec }: VegaVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && spec) {
      embed(containerRef.current, spec as any, {
        actions: {
          export: true,
          source: false,
          compiled: false,
          editor: false,
        },
        theme: 'dark',
        config: {
          background: '#111827',
          view: {
            stroke: 'transparent',
          },
          axis: {
            domainColor: '#4b5563',
            gridColor: '#374151',
            tickColor: '#4b5563',
            labelColor: '#9ca3af',
            titleColor: '#d1d5db',
          },
          legend: {
            labelColor: '#9ca3af',
            titleColor: '#d1d5db',
          },
          title: {
            color: '#f3f4f6',
          },
        },
      }).catch((error) => {
        console.error('Error rendering Vega-Lite:', error);
      });
    }
  }, [spec]);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center items-center min-h-[400px]"
    />
  );
}

