import { JSX } from 'preact/jsx-runtime';

/**
 * Use this function to automatically select all the content in an input element when
 * it is clicked.
 *
 * Usage:
 * ```jsx
 * <input onClick={selectContent} />
 * ```
 */
const selectContent = (e: JSX.TargetedMouseEvent<HTMLInputElement>) => e.currentTarget.select();

export default selectContent;
