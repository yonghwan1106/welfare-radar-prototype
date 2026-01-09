'use client';

import { ExternalLink, Users, Calendar, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SERVICE_CATEGORY_LABELS } from '@/lib/constants';
import type { WelfareService, ServiceCategory } from '@/types';

interface ServiceCardProps {
  service: WelfareService;
  onViewDetail?: () => void;
}

const categoryStyles: Record<ServiceCategory, string> = {
  '생활지원': 'bg-blue-100 text-blue-700 border-blue-200',
  '의료': 'bg-red-100 text-red-700 border-red-200',
  '주거': 'bg-orange-100 text-orange-700 border-orange-200',
  '고용': 'bg-green-100 text-green-700 border-green-200',
  '교육': 'bg-purple-100 text-purple-700 border-purple-200',
  '돌봄': 'bg-pink-100 text-pink-700 border-pink-200',
};

export function ServiceCard({ service, onViewDetail }: ServiceCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-5">
        {/* 카테고리 및 인기도 */}
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className={cn('font-medium', categoryStyles[service.category])}
          >
            {SERVICE_CATEGORY_LABELS[service.category]}
          </Badge>
          {service.popularity >= 80 && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
              인기
            </Badge>
          )}
        </div>

        {/* 서비스명 */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {service.name}
        </h3>

        {/* 설명 */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1 mb-4">
          {service.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {service.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{service.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* 주요 정보 */}
        <div className="space-y-2 mb-4 text-sm">
          {service.eligibility.householdTypes && service.eligibility.householdTypes.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="line-clamp-1">{service.eligibility.householdTypes.join(', ')}</span>
            </div>
          )}
          {service.applicationMethods && service.applicationMethods.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>{service.applicationMethods.join(', ')}</span>
            </div>
          )}
        </div>

        {/* 지원 내용 (간략) */}
        <div className="p-3 rounded-lg bg-muted/50 mb-4">
          <p className="text-xs text-muted-foreground mb-1">지원 내용</p>
          <p className="text-sm font-medium line-clamp-1">{service.benefits}</p>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onViewDetail}
          >
            상세보기
          </Button>
          <Button size="sm" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-1" />
            신청하기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
