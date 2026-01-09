'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Monitor,
  Moon,
  Sun,
  Check,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingItem {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [notificationSettings, setNotificationSettings] = useState<SettingItem[]>([
    { id: 'urgent', label: '긴급 알림', description: '긴급 위기가구 발생 시 즉시 알림', enabled: true },
    { id: 'daily', label: '일일 리포트', description: '매일 업무 현황 요약 알림', enabled: true },
    { id: 'service', label: '서비스 알림', description: '새로운 복지서비스 등록 알림', enabled: false },
    { id: 'system', label: '시스템 알림', description: '시스템 업데이트 및 점검 알림', enabled: true },
  ]);

  const [privacySettings, setPrivacySettings] = useState<SettingItem[]>([
    { id: 'twoFactor', label: '2단계 인증', description: '로그인 시 추가 인증 사용', enabled: true },
    { id: 'sessionLog', label: '세션 기록', description: '로그인 기록 저장', enabled: true },
    { id: 'autoLogout', label: '자동 로그아웃', description: '30분 미사용 시 자동 로그아웃', enabled: true },
  ]);

  const toggleNotification = (id: string) => {
    setNotificationSettings(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const togglePrivacy = (id: string) => {
    setPrivacySettings(prev =>
      prev.map(item =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const themeOptions = [
    { value: 'light', label: '라이트', icon: Sun },
    { value: 'dark', label: '다크', icon: Moon },
    { value: 'system', label: '시스템', icon: Monitor },
  ];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold">설정</h2>
        <p className="text-muted-foreground">시스템 환경설정을 관리합니다</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 알림 설정 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">알림 설정</CardTitle>
                <CardDescription>알림 수신 여부를 설정합니다</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationSettings.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Button
                  variant={item.enabled ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleNotification(item.id)}
                  className={cn(
                    'min-w-[60px]',
                    item.enabled && 'bg-green-600 hover:bg-green-700'
                  )}
                >
                  {item.enabled ? 'ON' : 'OFF'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 보안 설정 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">보안 설정</CardTitle>
                <CardDescription>계정 보안 옵션을 설정합니다</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {privacySettings.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <Button
                  variant={item.enabled ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => togglePrivacy(item.id)}
                  className={cn(
                    'min-w-[60px]',
                    item.enabled && 'bg-green-600 hover:bg-green-700'
                  )}
                >
                  {item.enabled ? 'ON' : 'OFF'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 테마 설정 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Palette className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">화면 테마</CardTitle>
                <CardDescription>화면 테마를 선택합니다</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={theme === option.value ? 'default' : 'outline'}
                  className={cn(
                    'flex flex-col items-center gap-2 h-auto py-4',
                    theme === option.value && 'bg-primary'
                  )}
                  onClick={() => setTheme(option.value as typeof theme)}
                >
                  <option.icon className="h-5 w-5" />
                  <span className="text-xs">{option.label}</span>
                  {theme === option.value && (
                    <Check className="h-4 w-4 absolute top-2 right-2" />
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 언어 및 지역 설정 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">언어 및 지역</CardTitle>
                <CardDescription>언어와 지역 설정을 변경합니다</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="text-sm font-medium">언어</p>
                <p className="text-xs text-muted-foreground">시스템 언어 설정</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">한국어</Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="text-sm font-medium">시간대</p>
                <p className="text-xs text-muted-foreground">날짜 및 시간 표시 형식</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Asia/Seoul (GMT+9)</Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 데이터 관리 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                <Database className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg">데이터 관리</CardTitle>
                <CardDescription>데이터 백업 및 동기화 설정</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-lg border space-y-3">
                <p className="text-sm font-medium">마지막 동기화</p>
                <p className="text-2xl font-bold text-primary">2분 전</p>
                <Button variant="outline" size="sm" className="w-full">
                  지금 동기화
                </Button>
              </div>
              <div className="p-4 rounded-lg border space-y-3">
                <p className="text-sm font-medium">데이터 백업</p>
                <p className="text-2xl font-bold text-green-600">자동</p>
                <Button variant="outline" size="sm" className="w-full">
                  수동 백업
                </Button>
              </div>
              <div className="p-4 rounded-lg border space-y-3">
                <p className="text-sm font-medium">캐시 용량</p>
                <p className="text-2xl font-bold">128 MB</p>
                <Button variant="outline" size="sm" className="w-full">
                  캐시 삭제
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
