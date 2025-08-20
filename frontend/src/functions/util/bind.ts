import { Dispatch, EventHandler, FormEvent, SetStateAction } from 'react';

/**
 * Shorthand for redirecting input events into react state setters.
 *
 * Example:
 * ```jsx
 * const [text, setText] = useState('');
 * // ...
 * <input value={text} onInput={bind(setText)}/>
 * ```
 */
export const bind: <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
  setter: Dispatch<SetStateAction<string>>,
) => EventHandler<FormEvent<T>> = (setter) => (event) => setter(event.currentTarget.value);
