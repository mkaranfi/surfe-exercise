import { ComponentPropsWithoutRef, forwardRef } from 'react';

import 'components/ui-controls/text-area/TextArea.style.scss';

interface Props extends ComponentPropsWithoutRef<'textarea'> {}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  { ...props }: Props,
  ref
) {
  return <textarea ref={ref} spellCheck {...props} />;
});

export default TextArea;
