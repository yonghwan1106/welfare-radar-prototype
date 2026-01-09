'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar';
import { Header } from './header';

const pageTitles: Record<string, string> = {
  '/': '대시보드',
  '/households': '위기가구 관리',
  '/services': '복지서비스',
  '/statistics': '통계',
  '/settings': '설정',
  '/help': '도움말',
};

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  // 가구 상세 페이지 타이틀 처리
  const getTitle = () => {
    if (pathname.startsWith('/households/') && pathname !== '/households') {
      return '가구 상세';
    }
    return pageTitles[pathname] || '복지 레이더';
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={getTitle()} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
