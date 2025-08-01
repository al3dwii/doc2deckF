// i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, usePathname, useRouter, redirect } =
  createNavigation(routing);
