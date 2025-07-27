import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { FC } from "react";

interface EmojiPickerComponentProp {
  openEmodji: boolean;
  onEmojiClick: (emoji: string) => void;
}

const EmojiPickerComponent: FC<EmojiPickerComponentProp> = ({
  openEmodji,
  onEmojiClick,
}) => {
  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    onEmojiClick(emojiData.emoji);
  };

  return (
    <div className={`EmojiPickerComponent ${openEmodji ? "hide" : ""}`}>
      <EmojiPicker
        height={400}
        width={300}
        theme={Theme.DARK}
        onEmojiClick={handleEmojiSelect}
      />
    </div>
  );
};

export default EmojiPickerComponent;
