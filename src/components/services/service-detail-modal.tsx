'use client';

import { ExternalLink, FileText, Users, Calendar, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { SERVICE_CATEGORY_LABELS } from '@/lib/constants';
import type { WelfareService, ServiceCategory } from '@/types';

interface ServiceDetailModalProps {
  service: WelfareService | null;
  open: boolean;
  onClose: () => void;
}

const categoryStyles: Record<ServiceCategory, string> = {
  '생활지원': 'bg-blue-100 text-blue-700 border-blue-200',
  '의료': 'bg-red-100 text-red-700 border-red-200',
  '주거': 'bg-orange-100 text-orange-700 border-orange-200',
  '고용': 'bg-green-100 text-green-700 border-green-200',
  '교육': 'bg-purple-100 text-purple-700 border-purple-200',
  '돌봄': 'bg-pink-100 text-pink-700 border-pink-200',
};

export function ServiceDetailModal({
  service,
  open,
  onClose,
}: ServiceDetailModalProps) {
  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <Badge
              variant="outline"
              className={cn('font-medium', categoryStyles[service.category])}
            >
              {SERVICE_CATEGORY_LABELS[service.category]}
            </Badge>
            {service.popularity >= 80 && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                인기 서비스
              </Badge>
            )}
          </div>
          <DialogTitle className="text-xl mt-2">{service.name}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* 서비스 설명 */}
            <div>
              <h4 className="font-medium mb-2">서비스 설명</h4>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>

            <Separator />

            {/* 지원 내용 */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                지원 내용
              </h4>
              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                <p className="text-sm text-green-800">{service.benefits}</p>
              </div>
            </div>

            <Separator />

            {/* 신청 자격 */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                신청 자격
              </h4>
              <div className="space-y-3">
                {service.eligibility.ageRange && (
                  <div className="flex items-start gap-3">
                    <span className="text-sm text-muted-foreground w-20 shrink-0">
                      연령
                    </span>
                    <span className="text-sm">
                      {service.eligibility.ageRange.min}세 ~{' '}
                      {service.eligibility.ageRange.max}세
                    </span>
                  </div>
                )}
                {service.eligibility.incomeLevel && (
                  <div className="flex items-start gap-3">
                    <span className="text-sm text-muted-foreground w-20 shrink-0">
                      소득 기준
                    </span>
                    <span className="text-sm">
                      기준 중위소득 {service.eligibility.incomeLevel}% 이하
                    </span>
                  </div>
                )}
                {service.eligibility.householdTypes && service.eligibility.householdTypes.length > 0 && (
                  <div className="flex items-start gap-3">
                    <span className="text-sm text-muted-foreground w-20 shrink-0">
                      가구 유형
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {service.eligibility.householdTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* 신청 방법 */}
            {service.applicationMethods && service.applicationMethods.length > 0 && (
              <>
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    신청 방법
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.applicationMethods.map((method) => (
                      <Badge key={method} variant="outline">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* 태그 */}
            <div>
              <h4 className="font-medium mb-2">관련 키워드</h4>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* 하단 버튼 */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            닫기
          </Button>
          <Button className="flex-1">
            <ExternalLink className="h-4 w-4 mr-2" />
            신청 페이지로 이동
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
