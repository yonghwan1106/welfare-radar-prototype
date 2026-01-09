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
  ChevronRight,
} from 'lucide-react';

const navigation = [
  {
    name: '대시보드',
    href: '/',
    icon: LayoutDashboard,
    description: '전체 현황 요약',
  },
  {
    name: '위기가구',
    href: '/households',
    icon: Users,
    description: '가구 관리',
  },
  {
    name: '복지서비스',
    href: '/services',
    icon: FileText,
    description: '서비스 검색',
  },
  {
    name: '통계',
    href: '/statistics',
    icon: BarChart3,
    description: '데이터 분석',
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
    <aside className="flex h-full w-72 flex-col bg-white/80 backdrop-blur-xl border-r border-border/50">
      {/* 로고 */}
      <div className="flex h-20 items-center gap-3 px-6 border-b border-border/50">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-primary shadow-lg shadow-primary/25">
          <Radio className="h-6 w-6 text-white" />
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
        </div>
        <div>
          <span className="text-xl font-bold text-gradient">복지 레이더</span>
          <p className="text-xs text-muted-foreground">Welfare Radar</p>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <nav className="flex-1 space-y-1.5 px-4 py-6">
        <p className="px-3 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          메뉴
        </p>
        {navigation.map((item, index) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                'animate-fade-in-up opacity-0',
                isActive
                  ? 'bg-gradient-primary text-white shadow-lg shadow-primary/25'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-sm'
              )}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
            >
              <div className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-white/20'
                  : 'bg-muted group-hover:bg-primary/10'
              )}>
                <item.icon className={cn(
                  'h-5 w-5 transition-colors',
                  isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'
                )} />
              </div>
              <div className="flex-1">
                <span className="block">{item.name}</span>
                {item.description && !isActive && (
                  <span className="text-xs text-muted-foreground/70">{item.description}</span>
                )}
              </div>
              {isActive && (
                <ChevronRight className="h-4 w-4 text-white/70" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* 긴급 알림 배너 */}
      <div className="mx-4 mb-4 p-4 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="status-dot status-dot-critical animate-pulse" />
          <span className="text-sm font-semibold text-red-700">긴급 대응 필요</span>
        </div>
        <p className="text-xs text-red-600/80">
          3건의 긴급 가구가 미처리 상태입니다
        </p>
        <Link
          href="/households?riskLevel=critical&status=unprocessed"
          className="mt-2 inline-flex items-center text-xs font-medium text-red-700 hover:text-red-800 transition-colors"
        >
          바로가기 <ChevronRight className="h-3 w-3 ml-0.5" />
        </Link>
      </div>

      {/* 하단 네비게이션 */}
      <div className="border-t border-border/50 px-4 py-4 space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* 사용자 정보 */}
      <div className="border-t border-border/50 p-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
            김
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">김주무관</p>
            <p className="text-xs text-muted-foreground truncate">강남구청 복지과</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
