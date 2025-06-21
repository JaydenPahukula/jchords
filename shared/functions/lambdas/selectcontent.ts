import { MouseEvent } from 'react';

/**
 * Use this function to automatically select all the content in an input element when
 * it is clicked.
 *
 * Usage:
 * ```jsx
 * <input onClick={selectContent} />
 * ```
 */
export const selectContent = (e: MouseEvent<HTMLInputElement>) => e.currentTarget.select();
