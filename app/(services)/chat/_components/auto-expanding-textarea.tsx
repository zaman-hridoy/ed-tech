"use client";

import { cn } from "@/lib/utils";
import { FormEvent, KeyboardEvent, useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  submitOnEnter?: () => void;
}

const AutoExpandingTextarea = ({
  value = "",
  onChange,
  submitOnEnter,
}: Props) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      // Prevent the default behavior of the Enter key (e.g., adding a new line)
      e.preventDefault();

      // Do something when Enter is pressed without Shift
      if (submitOnEnter) {
        submitOnEnter();
        // if (inputDiv?.current) {
        //   inputDiv?.current?.innerHTML = "";
        // }
      }
    }
  };

  const handleInputChange = (e: FormEvent<HTMLDivElement>) => {
    const rawContent = e.currentTarget.innerHTML;

    // Check if the "@" symbol is typed
    const lastCharacter = rawContent.slice(-1);
    if (lastCharacter === "@") {
      // Display the popover
      //   setShowPopover(true);
    } else {
      // Hide the popover
      //   setShowPopover(false);

      // Check if the current content includes a mention
      const match = rawContent.match(/@(\w+)/);
      if (match) {
        // Replace the mention with bold text
        const mentionedUser = match[1];
        const formattedContent = rawContent.replace(
          `@${mentionedUser}`,
          `<strong>@${mentionedUser}</strong>`
        );

        // Set the formatted content back to the contenteditable div
        onChange(formattedContent);
      } else if (lastCharacter === " ") {
        // Do nothing if space is pressed
        onChange(rawContent);
      }
    }
  };

  const handlePaste = (e: any) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  useEffect(() => {
    // Move the cursor to the end when the component mounts or content changes
    moveCursorToEnd();
  }, [value]);

  const moveCursorToEnd = () => {
    const range = document.createRange();
    const selection = window.getSelection();
    const node = contentEditableRef.current;

    if (node && selection) {
      range.selectNodeContents(node);
      range.collapse(false);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <div>
      <div className="group pl-10 py-3 rounded-md bg-zinc-200 relative overflow-y-auto max-h-[50vh] no-scrollbar">
        <div
          className={cn(
            "absolute top-[15px] left-0 px-3 pl-10 text-slate-500 font-medium text-sm tracking-tight",
            value.length > 0 && "hidden"
          )}
        >
          Message
        </div>
        <div
          ref={contentEditableRef}
          contentEditable={true}
          // placeholder="Message"
          className="relative w-full h-full focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0"
          onInput={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      </div>
    </div>
  );
};

export default AutoExpandingTextarea;
