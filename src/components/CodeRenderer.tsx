import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeRendererProps {
  content: string;
  className?: string;
}

export const CodeRenderer: React.FC<CodeRendererProps> = ({ content, className = '' }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Split by code blocks: ```python ... ``` or ``` ... ```
  const codeBlockRegex = /```(?:python|py|javascript|js|html|css)?\n([\s\S]*?)```/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let blockIndex = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Text before code block
    if (match.index > lastIndex) {
      const textBefore = content.substring(lastIndex, match.index);
      parts.push(
        <span key={`text-${lastIndex}`} className="whitespace-pre-line">
          {renderInlineCode(textBefore)}
        </span>
      );
    }

    const codeContent = match[1].trim();
    const currentBlock = blockIndex++;

    parts.push(
      <div
        key={`code-${match.index}`}
        className="my-3 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 text-left shadow-xs text-xs font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/80 border-b border-slate-800/80 text-[11px] text-slate-400">
          <span className="font-semibold text-indigo-400">Python</span>
          <button
            type="button"
            onClick={(e) => handleCopy(codeContent, currentBlock, e)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
            title="Copy code"
            aria-label="Copy code"
          >
            {copiedIndex === currentBlock ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 text-[10px]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="text-[10px]">Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-3.5 overflow-x-auto text-slate-100 text-xs sm:text-[13px] leading-relaxed selection:bg-indigo-600/50">
          <code>{codeContent}</code>
        </pre>
      </div>
    );

    lastIndex = match.index + match[0].length;
  }

  // Trailing text
  if (lastIndex < content.length) {
    const trailingText = content.substring(lastIndex);
    parts.push(
      <span key={`text-end`} className="whitespace-pre-line">
        {renderInlineCode(trailingText)}
      </span>
    );
  }

  return <div className={`leading-relaxed ${className}`}>{parts}</div>;
};

// Helper for inline backtick code `code`
function renderInlineCode(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const inlineRegex = /`([^`]+)`/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;

  while ((m = inlineRegex.exec(text)) !== null) {
    if (m.index > lastIdx) {
      parts.push(text.substring(lastIdx, m.index));
    }
    parts.push(
      <code
        key={`inline-${m.index}`}
        className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 border border-slate-200 text-indigo-700 font-mono text-[0.85em] font-medium"
      >
        {m[1]}
      </code>
    );
    lastIdx = m.index + m[0].length;
  }

  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx));
  }

  return parts;
}
