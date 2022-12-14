import { ComponentPropsWithoutRef, forwardRef } from 'react';

import 'components/ui-controls/text-area/TextArea.style.scss';

interface Props extends ComponentPropsWithoutRef<'textarea'> {
  isInvalid?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  { isInvalid = false, ...props }: Props,
  ref
) {
  return <textarea ref={ref} spellCheck {...props} />;
});

export default TextArea;
