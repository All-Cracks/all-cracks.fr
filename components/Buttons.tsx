import React from 'react';
import Link from 'next/link';
import 'styles/Buttons.module.scss';

export function Primary({
  type,
  onClick,
  href,
  ...Props
}: { type: 'link' | 'href' | 'button'; onClick?: React.MouseEventHandler<HTMLButtonElement>; href?: string } & React.ComponentProps<'link' | 'a' | 'button'>) {
  function onHover(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) {
    const target = event.target as HTMLElement;
    const { x, y } = target.getBoundingClientRect();
    target?.style.setProperty('--x', String(event.clientX - x));
    target?.style.setProperty('--y', String(event.clientY - y));
  }
  const className = Props.className + ' relative text-lg btn-primary rounded-[4px] py-[10px] px-6 inline-flex items-center justify-center text-white';
  return (
    <>
      {type === 'link' ? (
        <Link href={href || '/'} className={className} onMouseMove={onHover}>
          {Props.children}
        </Link>
      ) : type === 'href' ? (
        <a href={href} target="_blank" rel="noreferrer" className={className} onMouseMove={onHover}>
          {Props.children}
        </a>
      ) : (
        <button onClick={onClick} className={className} onMouseMove={onHover}>
          {Props.children}
        </button>
      )}
    </>
  );
}

export function Secondary({
  type,
  onClick,
  href,
  ...Props
}: { type: 'link' | 'href' | 'button'; onClick?: React.MouseEventHandler<HTMLButtonElement>; href?: string } & React.ComponentProps<'link' | 'a' | 'button'>) {
  const className = Props.className + ' relative text-lg btn-secondary rounded-[4px] py-[10px] px-6 inline-flex items-center justify-center text-black';
  return (
    <>
      {type === 'link' ? (
        <Link href={href ? href : '/'} className={className}>
          {Props.children}
        </Link>
      ) : type === 'href' ? (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
          {Props.children}
        </a>
      ) : (
        <button onClick={onClick} className={className}>
          {Props.children}
        </button>
      )}
    </>
  );
}

const Buttons = { Primary, Secondary };
export default Buttons;
