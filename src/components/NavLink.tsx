import { EVENTS, BUTTONS } from '../constants.ts';

interface Props {
  href: string,
  children: any,
}

function NavLink({ href, children }: Props) {
  
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const isMainEvent = event.button === BUTTONS.PRIMARY;
    const isModifiedEvent = event.metaKey || event.altKey || event.shiftKey;
    
    if (isMainEvent && !isModifiedEvent) {
      event.preventDefault();

      window.history.pushState({}, '', href);
      const navigationEvent = new Event(EVENTS.PUSHSTATE);
      window.dispatchEvent(navigationEvent);
    }
  }

  return (
    <a href={href} onClick={handleClick} className='flex items-center gap-4 flex-1'>
      { children }
    </a>
  );
}

export default NavLink;
