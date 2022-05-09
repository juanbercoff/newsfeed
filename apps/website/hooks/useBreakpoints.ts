import useMediaQuery from './useMediaQuery';

export default function useBreakpoints() {
  const breakpoints = {
    isXs: useMediaQuery('(max-width: 640px)'),
    isSm: useMediaQuery('(min-width: 641px) and (max-width: 768px)'),
    isMd: useMediaQuery('(min-width: 769px) and (max-width: 1254px)'),
    isLg: useMediaQuery('(min-width: 1254px)'),
    isXl: useMediaQuery('(min-width: 1480px)'),
    active: 'xs',
  };
  if (breakpoints.isXs) breakpoints.active = 'xs';
  if (breakpoints.isSm) breakpoints.active = 'sm';
  if (breakpoints.isMd) breakpoints.active = 'md';
  if (breakpoints.isLg) breakpoints.active = 'lg';
  return breakpoints;
}
