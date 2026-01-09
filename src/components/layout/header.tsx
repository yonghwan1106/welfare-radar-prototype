'use client';

import { Bell, ChevronDown, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { currentOfficer } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const notificationCount = 3;

  return (
    <header className="flex h-16 items-center justify-between border-b border-border/50 bg-white/80 backdrop-blur-xl px-6 sticky top-0 z-40">
      {/* 페이지 타이틀 */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          {title || '복지 레이더'}
        </h1>
        {title && (
          <Badge variant="secondary" className="text-xs font-normal">
            <Sparkles className="h-3 w-3 mr-1" />
            AI 분석 활성화
          </Badge>
        )}
      </div>

      {/* 우측 액션 영역 */}
      <div className="flex items-center gap-2">
        {/* 검색 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground px-3 py-2 h-9 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-all"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">검색</span>
          <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </Button>

        {/* 알림 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'relative h-9 w-9 rounded-lg transition-all hover:bg-muted',
            notificationCount > 0 && 'text-primary'
          )}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-gradient-to-r from-red-500 to-rose-500 text-[10px] font-bold text-white shadow-lg shadow-red-500/30">
                {notificationCount}
              </span>
            </span>
          )}
        </Button>

        {/* 구분선 */}
        <div className="h-6 w-px bg-border mx-1" />

        {/* 사용자 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2.5 px-2 py-1.5 h-auto hover:bg-muted rounded-lg transition-all"
            >
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-primary text-white text-sm font-bold">
                  {currentOfficer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-semibold leading-none">{currentOfficer.name}</span>
                <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
                  {currentOfficer.department}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2">
            <DropdownMenuLabel className="p-3 bg-muted/50 rounded-lg mb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-primary text-white font-bold">
                    {currentOfficer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">{currentOfficer.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {currentOfficer.department} · {currentOfficer.position}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              내 프로필
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer">
              설정
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
