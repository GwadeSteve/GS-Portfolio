const mq = (q: string) => typeof matchMedia === 'function' && matchMedia(q).matches;

export const reduceMotion = mq('(prefers-reduced-motion: reduce)');

/** True on devices with a mouse or trackpad, where hover effects make sense. */
export const finePointer = mq('(hover: hover) and (pointer: fine)');

export const scrollBehavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth';

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior });
}

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}
