'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Users,
  FileCheck,
  TrendingUp,
  Award,
  Edit,
  Shield,
  Clock,
} from 'lucide-react';
import { currentOfficer } from '@/lib/mock-data';

const stats = [
  { label: '담당 가구', value: '12', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { label: '이번 달 처리', value: '28', icon: FileCheck, color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: '처리율', value: '94%', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { label: '누적 처리', value: '156', icon: Award, color: 'text-orange-600', bgColor: 'bg-orange-100' },
];

const recentWork = [
  { date: '2025-01-09', action: '박OO 가구 긴급복지지원 연계', type: 'service' },
  { date: '2025-01-09', action: '최OO 가구 방문 상담', type: 'visit' },
  { date: '2025-01-08', action: '정OO 가구 상태 업데이트', type: 'update' },
  { date: '2025-01-08', action: '이OO 가구 서비스 안내', type: 'service' },
  { date: '2025-01-07', action: '한OO 가구 전화 상담', type: 'call' },
];

const typeColors: Record<string, string> = {
  service: 'bg-blue-100 text-blue-700',
  visit: 'bg-green-100 text-green-700',
  update: 'bg-purple-100 text-purple-700',
  call: 'bg-orange-100 text-orange-700',
};

const typeLabels: Record<string, string> = {
  service: '서비스 연계',
  visit: '방문',
  update: '상태 변경',
  call: '전화',
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold">내 프로필</h2>
        <p className="text-muted-foreground">계정 정보 및 활동 현황을 확인합니다</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 프로필 카드 */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* 아바타 */}
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-3xl font-bold">
                    {currentOfficer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-lg"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              {/* 이름 및 직위 */}
              <div>
                <h3 className="text-xl font-bold">{currentOfficer.name}</h3>
                <p className="text-muted-foreground">{currentOfficer.position}</p>
                <Badge variant="secondary" className="mt-2">
                  <Shield className="h-3 w-3 mr-1" />
                  인증됨
                </Badge>
              </div>

              {/* 기본 정보 */}
              <div className="w-full space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{currentOfficer.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{currentOfficer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{currentOfficer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>입사일: 2020-03-02</span>
                </div>
              </div>

              {/* 수정 버튼 */}
              <Button className="w-full mt-4">
                <Edit className="h-4 w-4 mr-2" />
                프로필 수정
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 우측 영역 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 활동 통계 */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 최근 활동 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">최근 활동</CardTitle>
              <CardDescription>최근 7일간의 업무 활동 내역</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWork.map((work, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-sm text-muted-foreground min-w-[90px]">
                      <Clock className="h-4 w-4" />
                      {work.date}
                    </div>
                    <p className="flex-1 text-sm font-medium">{work.action}</p>
                    <Badge className={typeColors[work.type]}>
                      {typeLabels[work.type]}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 계정 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">계정 정보</CardTitle>
              <CardDescription>계정 보안 및 인증 상태</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg border space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">2단계 인증</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">활성화</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    SMS 인증으로 설정되어 있습니다
                  </p>
                </div>
                <div className="p-4 rounded-lg border space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">마지막 로그인</p>
                    <Badge variant="outline">오늘</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    2025-01-09 09:15 (서울)
                  </p>
                </div>
                <div className="p-4 rounded-lg border space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">비밀번호</p>
                    <Badge variant="outline">30일 전 변경</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    주기적인 비밀번호 변경을 권장합니다
                  </p>
                </div>
                <div className="p-4 rounded-lg border space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">접근 권한</p>
                    <Badge className="bg-primary/10 text-primary">담당자</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    위기가구 관리 전체 권한
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
