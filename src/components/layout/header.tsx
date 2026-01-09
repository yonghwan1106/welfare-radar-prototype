'use client';

import { Bell, ChevronDown } from 'lucide-react';
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

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const notificationCount = 3; // Mock 알림 수

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
      {/* 페이지 타이틀 */}
      <h1 className="text-xl font-semibold text-foreground">
        {title || '복지 레이더'}
      </h1>

      {/* 우측 액션 영역 */}
      <div className="flex items-center gap-4">
        {/* 알림 버튼 */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>

        {/* 사용자 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white text-sm">
                  {currentOfficer.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{currentOfficer.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{currentOfficer.name}</span>
                <span className="text-xs text-muted-foreground">
                  {currentOfficer.department} · {currentOfficer.position}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>내 프로필</DropdownMenuItem>
            <DropdownMenuItem>설정</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
