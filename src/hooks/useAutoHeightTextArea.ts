import { useEffect } from 'react';

export const useAutoHeightTextArea = (textAreaRef: HTMLTextAreaElement | null, value: string) => {
  useEffect(() => {
    if (textAreaRef) {
      // the textarea height is reset momentarily just to get the correct scrollHeight
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;

      // the height is set directly, outside of the render loop
      // setting it with state or a ref will result in an incorrect value
      textAreaRef.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value]);
};
