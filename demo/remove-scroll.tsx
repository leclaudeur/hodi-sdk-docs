import { cloneElement, type ReactElement, type Ref } from 'react'

// A dialog drawn in a render is part of the docs' page: it never stops the page from scrolling, as Hodi's own
// dialog does while it is open. Its ref still reaches the dialog.
interface Props {
  children: ReactElement<{ ref?: Ref<Element> }>
  ref?: Ref<Element>
  enabled?: boolean
  forwardProps?: boolean
  allowPinchZoom?: boolean
}

export const RemoveScroll = ({ children, ref }: Props) => cloneElement(children, { ref })
