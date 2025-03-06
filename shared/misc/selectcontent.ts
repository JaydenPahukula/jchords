import { JSX } from 'preact/jsx-runtime';

/**
 * Use this function to automatically select all the content in an input element when
 * it is clicked.
 *
 * For example:
 * ```jsx
 * <input onClick={selectContent} />
 * ```
 */
export default function selectContent(e: JSX.TargetedMouseEvent<HTMLInputElement>) {
  e.currentTarget.select();
}
