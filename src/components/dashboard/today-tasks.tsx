'use client';

import { CheckCircle2, Circle, Phone, MessageSquare, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { RISK_LABELS } from '@/lib/constants';
import type { RiskLevel, ContactMethod } from '@/types';

interface TodayTask {
  id: string;
  householdName: string;
  riskLevel: RiskLevel;
  taskType: ContactMethod;
  description: string;
  completed: boolean;
}

interface TodayTasksProps {
  tasks: TodayTask[];
  onToggleComplete?: (id: string) => void;
}

const taskTypeIcons: Record<ContactMethod, React.ElementType> = {
  phone: Phone,
  sms: MessageSquare,
  kakao: MessageSquare,
  visit: MapPin,
};

const taskTypeLabels: Record<ContactMethod, string> = {
  phone: '전화',
  sms: '문자',
  kakao: '카카오톡',
  visit: '방문',
};

const riskBadgeStyles: Record<RiskLevel, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  warning: 'bg-orange-100 text-orange-700 border-orange-200',
  attention: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  normal: 'bg-green-100 text-green-700 border-green-200',
};

export function TodayTasks({ tasks, onToggleComplete }: TodayTasksProps) {
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">오늘의 할 일</CardTitle>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{tasks.length} 완료
        </span>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            오늘 예정된 업무가 없습니다
          </p>
        ) : (
          tasks.map((task) => {
            const Icon = taskTypeIcons[task.taskType];
            return (
              <div
                key={task.id}
                className={cn(
                  'flex items-start gap-3 rounded-lg border p-3 transition-colors',
                  task.completed ? 'bg-muted/50 opacity-60' : 'bg-white'
                )}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => onToggleComplete?.(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn(
                      'font-medium',
                      task.completed && 'line-through'
                    )}>
                      {task.householdName}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn('text-xs', riskBadgeStyles[task.riskLevel])}
                    >
                      {RISK_LABELS[task.riskLevel]}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {task.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {taskTypeLabels[task.taskType]}
                  </span>
                </div>
              </div>
            );
          })
        )}

        {tasks.length > 0 && (
          <Button variant="outline" className="w-full mt-2">
            전체 보기
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
