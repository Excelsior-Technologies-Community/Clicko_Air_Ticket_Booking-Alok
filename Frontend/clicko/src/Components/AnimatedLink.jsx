import React from 'react';
import { useTransitionContext } from './PageTransition';

const AnimatedLink = ({ to, children, className, onClick, ...props }) => {
  const { startTransition } = useTransitionContext();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    const isExternalOrHash = to && (to.startsWith('http') || to.startsWith('//') || to.startsWith('#') || to.includes(':'));
    const isModifiedEvent = !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
    const isRightClick = e.button !== 0;

    if (e.defaultPrevented || isExternalOrHash || isModifiedEvent || isRightClick) {
      return;
    }
    e.preventDefault();
    startTransition(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default AnimatedLink;
