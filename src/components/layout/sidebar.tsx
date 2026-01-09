'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  Radio,
} from 'lucide-react';

const navigation = [
  {
    name: '대시보드',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: '위기가구',
    href: '/households',
    icon: Users,
  },
  {
    name: '복지서비스',
    href: '/services',
    icon: FileText,
  },
  {
    name: '통계',
    href: '/statistics',
    icon: BarChart3,
  },
];

const bottomNavigation = [
  {
    name: '설정',
    href: '/settings',
    icon: Settings,
  },
  {
    name: '도움말',
    href: '/help',
    icon: HelpCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col bg-white border-r border-border">
      {/* 로고 */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Radio className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-primary">복지 레이더</span>
      </div>

      {/* 메인 네비게이션 */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 하단 네비게이션 */}
      <div className="border-t border-border px-3 py-4 space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
