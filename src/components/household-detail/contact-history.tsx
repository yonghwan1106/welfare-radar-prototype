'use client';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Phone, MessageSquare, MapPin, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { ContactRecord, ContactMethod, ContactResult } from '@/types';

interface ContactHistoryProps {
  records: ContactRecord[];
  onAddRecord?: () => void;
}

const methodIcons: Record<ContactMethod, React.ElementType> = {
  phone: Phone,
  sms: MessageSquare,
  kakao: MessageSquare,
  visit: MapPin,
};

const methodLabels: Record<ContactMethod, string> = {
  phone: '전화',
  sms: '문자',
  kakao: '카카오톡',
  visit: '방문',
};

const resultStyles: Record<ContactResult, { label: string; className: string }> = {
  success: { label: '성공', className: 'bg-green-100 text-green-700' },
  no_answer: { label: '부재중', className: 'bg-yellow-100 text-yellow-700' },
  refused: { label: '거부', className: 'bg-red-100 text-red-700' },
  scheduled: { label: '예약', className: 'bg-blue-100 text-blue-700' },
};

export function ContactHistory({ records, onAddRecord }: ContactHistoryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">연락 기록</CardTitle>
        <Button size="sm" onClick={onAddRecord}>
          <Plus className="h-4 w-4 mr-1" />
          기록 추가
        </Button>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            연락 기록이 없습니다
          </p>
        ) : (
          <div className="space-y-4">
            {records.map((record, index) => {
              const Icon = methodIcons[record.method];
              const resultStyle = resultStyles[record.result];
              const isLast = index === records.length - 1;

              return (
                <div key={record.id} className="flex gap-3">
                  {/* 타임라인 */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    {!isLast && <div className="mt-2 h-full w-px bg-border" />}
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium">{methodLabels[record.method]}</span>
                      <Badge
                        variant="secondary"
                        className={cn('text-xs', resultStyle.className)}
                      >
                        {resultStyle.label}
                      </Badge>
                    </div>

                    {record.notes && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {record.notes}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px] bg-muted">
                          {record.officerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{record.officerName}</span>
                      <span>·</span>
                      <span>
                        {formatDistanceToNow(new Date(record.contactedAt), {
                          addSuffix: true,
                          locale: ko,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
