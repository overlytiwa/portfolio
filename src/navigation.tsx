import { createContext, useContext, type AnchorHTMLAttributes, type MouseEvent } from 'react';

export const NavigationContext = createContext<(path: string, origin?: HTMLElement) => void>(() => undefined);

export function RouteLink({ href = '/', onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const navigate = useContext(NavigationContext);
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || props.target === '_blank') return;
    event.preventDefault();
    navigate(href, event.currentTarget);
  }
  return <a {...props} href={href} onClick={handleClick} />;
}
