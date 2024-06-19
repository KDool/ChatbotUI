import { faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useRef, useState } from "react";
import { Button, Textarea } from "react-daisyui";
import { IChatInputProps } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ChatInput = ({
  disabled,
  onSubmit,
  placeholder,
  customSubmitIcon,
}: IChatInputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const textArea = textAreaRef?.current;
      const selectedFile = fileInputRef?.current?.files?.[0];

      if ((textArea && textArea.value.trim().length > 0) || selectedFile) {
        if (onSubmit) {
          onSubmit({ text: textArea?.value, file: selectedFile });
        }
        if (textArea) textArea.value = "";
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [onSubmit]
  );

  const handleEnterKey = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <div className="flex flex-col items-center">
      <Textarea
        ref={textAreaRef}
        bordered
        className={`resize-none w-2/3 max-h-48 overflow-y-auto mb-2`}
        onKeyUp={handleEnterKey}
        placeholder={placeholder ? placeholder : "Type here to chat"}
        disabled={disabled}
      ></Textarea>
      <input
        ref={fileInputRef}
        type="file"
        className="mb-2"
        disabled={disabled}
      />
      <Button
        shape={"square"}
        className="absolute ml-[58%]"
        disabled={disabled}
        onClick={handleSubmit}
      >
        {customSubmitIcon ? (
          customSubmitIcon
        ) : (
          <FontAwesomeIcon icon={faMagicWandSparkles} />
        )}
      </Button>
    </div>
  );
};
