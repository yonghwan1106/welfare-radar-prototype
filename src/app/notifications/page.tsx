'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Calendar,
  Users,
  FileText,
  Settings,
  Check,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'urgent' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  category: 'household' | 'service' | 'system' | 'schedule';
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'urgent',
    title: '긴급 위기가구 발생',
    message: '박OO 가구가 긴급 위험 등급으로 분류되었습니다. 즉시 확인이 필요합니다.',
    timestamp: '10분 전',
    read: false,
    link: '/households/household-critical-1',
    category: 'household',
  },
  {
    id: '2',
    type: 'urgent',
    title: '긴급 위기가구 발생',
    message: '이OO 가구가 긴급 위험 등급으로 분류되었습니다. 즉시 확인이 필요합니다.',
    timestamp: '30분 전',
    read: false,
    link: '/households/household-critical-2',
    category: 'household',
  },
  {
    id: '3',
    type: 'warning',
    title: '방문 예정 알림',
    message: '오늘 16:00 최OO 가구 방문이 예정되어 있습니다.',
    timestamp: '1시간 전',
    read: false,
    link: '/households/household-warning-3',
    category: 'schedule',
  },
  {
    id: '4',
    type: 'info',
    title: '새로운 복지서비스 등록',
    message: '2025년 긴급복지지원 서비스가 새로 등록되었습니다.',
    timestamp: '2시간 전',
    read: true,
    link: '/services',
    category: 'service',
  },
  {
    id: '5',
    type: 'success',
    title: '서비스 연계 완료',
    message: '한OO 가구에 에너지바우처 서비스가 성공적으로 연계되었습니다.',
    timestamp: '3시간 전',
    read: true,
    link: '/households/household-attention-2',
    category: 'household',
  },
  {
    id: '6',
    type: 'info',
    title: '일일 리포트',
    message: '1월 9일 업무 현황: 총 5건 처리 완료, 2건 진행 중',
    timestamp: '어제',
    read: true,
    category: 'system',
  },
  {
    id: '7',
    type: 'info',
    title: '시스템 업데이트 안내',
    message: 'AI 분석 엔진이 v2.1로 업데이트되었습니다. 더 정확한 위험도 분석이 가능합니다.',
    timestamp: '2일 전',
    read: true,
    category: 'system',
  },
];

const typeConfig = {
  urgent: {
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    badgeVariant: 'destructive' as const,
  },
  warning: {
    icon: Bell,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    badgeVariant: 'secondary' as const,
  },
  info: {
    icon: Info,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    badgeVariant: 'secondary' as const,
  },
  success: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    badgeVariant: 'secondary' as const,
  },
};

const categoryConfig = {
  household: { label: '위기가구', icon: Users },
  service: { label: '복지서비스', icon: FileText },
  system: { label: '시스템', icon: Settings },
  schedule: { label: '일정', icon: Calendar },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => !n.read);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">알림</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount}개의 읽지 않은 알림이 있습니다` : '모든 알림을 확인했습니다'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="h-4 w-4 mr-2" />
            모두 읽음
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll} disabled={notifications.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            모두 삭제
          </Button>
        </div>
      </div>

      {/* 필터 */}
      <div className="flex items-center gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          전체 ({notifications.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          읽지 않음 ({unreadCount})
        </Button>
      </div>

      {/* 알림 목록 */}
      <Card>
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">알림이 없습니다</p>
              <p className="text-sm text-muted-foreground/70">새로운 알림이 오면 여기에 표시됩니다</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredNotifications.map((notification) => {
                const config = typeConfig[notification.type];
                const categoryInfo = categoryConfig[notification.category];
                const Icon = config.icon;
                const CategoryIcon = categoryInfo.icon;

                return (
                  <div
                    key={notification.id}
                    className={cn(
                      'flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors',
                      !notification.read && 'bg-primary/5'
                    )}
                  >
                    {/* 아이콘 */}
                    <div className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                      config.bgColor
                    )}>
                      <Icon className={cn('h-5 w-5', config.color)} />
                    </div>

                    {/* 내용 */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className={cn(
                          'text-sm font-medium',
                          !notification.read && 'text-foreground'
                        )}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <Badge variant="outline" className="text-xs gap-1">
                          <CategoryIcon className="h-3 w-3" />
                          {categoryInfo.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* 액션 */}
                    <div className="flex items-center gap-2 shrink-0">
                      {notification.link && (
                        <Link href={notification.link}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
