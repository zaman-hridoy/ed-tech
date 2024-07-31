"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface Props {
  content: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
  onOpenMention: (s: boolean) => void;
  onFilterMention: (query: string) => void;
  submitOnEnter: (val: string) => void;
}

const ExpandableInput = ({
  content = "",
  onChange,
  disabled = false,
  placeholder,
  onOpenMention,
  onFilterMention,
  submitOnEnter,
}: Props) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const handleChange = (e: ContentEditableEvent) => {
    const rawContent = e.target.value;
    onChange(rawContent);
    const lastWord = rawContent.split(" ").pop();
    if (lastWord?.includes("@") && onOpenMention) {
      onOpenMention(true);
      const match = rawContent.match(/@(\w+)/);
      if (match) {
        onFilterMention(match[1]);
      }
    } else {
      onOpenMention(false);
    }
  };

  const handlePaste = (e: any) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  // useEffect(() => {
  //   // Move the cursor to the end when the component mounts or content changes
  //   moveCursorToEnd();
  // }, [content]);

  // const moveCursorToEnd = () => {
  //   const range = document.createRange();
  //   const selection = window.getSelection();
  //   const node = contentEditableRef.current;

  //   if (node && selection) {
  //     range.selectNodeContents(node);
  //     range.collapse(false);

  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //   }
  // };

  const handleKeyDown = (e: any) => {
    console.log(e);
    // if (e.key === "Enter" && e.shiftKey) {
    if (e.key === "Enter") {
      // Prevent the default behavior of the Enter key (e.g., adding a new line)
      e.preventDefault();

      // console.log({ content });

      // Do something when Enter is pressed without Shift
      // submitOnEnter();
    }
  };

  return (
    <div>
      <div className="relative">
        {placeholder && (
          <span
            className={cn(
              "absolute top-0 left-0 h-full flex flex-col items-center justify-center text-sm text-slate-500 font-medium",
              content.length > 0 && "hidden"
            )}
          >
            {placeholder}
          </span>
        )}
        <ContentEditable
          innerRef={contentEditableRef}
          html={content} // innerHTML of the editable div
          disabled={disabled} // use true to disable editing
          onChange={handleChange} // handle innerHTML change
          className="focus-visible:outline-none text-sm text-slate-800 font-medium relative whitespace-pre-wrap break-words"
          // placeholder="Message"
          onPaste={handlePaste}
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
            // if (e.key === "Enter" && e.shiftKey) {
            if (e.key === "Enter" && !e.shiftKey) {
              // console.log(e.target?.innerHTML);
              submitOnEnter(e.target?.innerHTML);
            }
            if (e.key === "Enter" && e.shiftKey) {
              document.execCommand("insertText", false, "\n");
            }
          }}
        />
      </div>
    </div>
  );
};

export default ExpandableInput;
