'use client';

import { User, MapPin, Home, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RiskLevelBadge } from '@/components/households';
import { STATUS_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Household, HouseholdStatus } from '@/types';

interface BasicInfoCardProps {
  household: Household;
}

const statusStyles: Record<HouseholdStatus, string> = {
  unprocessed: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  monitoring: 'bg-purple-100 text-purple-700',
};

export function BasicInfoCard({ household }: BasicInfoCardProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-3">
              {household.name}
              <RiskLevelBadge level={household.riskLevel} size="lg" showDot />
            </CardTitle>
            <Badge
              variant="secondary"
              className={cn('mt-2', statusStyles[household.status])}
            >
              {STATUS_LABELS[household.status]}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">위기 점수</p>
            <p className="text-3xl font-bold">{household.riskScore}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 위기 점수 프로그레스 */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">종합 위기 수준</span>
            <span className="font-medium">{household.riskScore}/100</span>
          </div>
          <Progress value={household.riskScore} className="h-3" />
        </div>

        {/* 기본 정보 */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">연령</p>
              <p className="font-medium">{household.age}세</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Home className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">가구유형</p>
              <p className="font-medium">{household.householdType}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">주소</p>
              <p className="font-medium">
                {household.address.city} {household.address.district} {household.address.dong}
              </p>
            </div>
          </div>

          {household.contact && (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">연락처</p>
                <p className="font-medium">{household.contact}</p>
              </div>
            </div>
          )}

          {household.createdAt && (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">등록일</p>
                <p className="font-medium">
                  {new Date(household.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 위기 요인 */}
        {household.riskFactors && household.riskFactors.length > 0 && (
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2">위기 요인</p>
            <div className="flex flex-wrap gap-2">
              {household.riskFactors.map((factor, index) => (
                <Badge key={index} variant="outline">
                  {factor.factor}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
