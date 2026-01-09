'use client';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  Phone,
  FileCheck,
  UserPlus,
  AlertCircle,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type ActivityType =
  | 'contact'
  | 'service_linked'
  | 'new_household'
  | 'risk_changed'
  | 'status_changed'
  | 'note_added';

interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  householdName?: string;
  officerName: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const activityIcons: Record<ActivityType, React.ElementType> = {
  contact: Phone,
  service_linked: FileCheck,
  new_household: UserPlus,
  risk_changed: AlertCircle,
  status_changed: CheckCircle,
  note_added: MessageSquare,
};

const activityStyles: Record<ActivityType, string> = {
  contact: 'bg-blue-100 text-blue-600',
  service_linked: 'bg-green-100 text-green-600',
  new_household: 'bg-purple-100 text-purple-600',
  risk_changed: 'bg-orange-100 text-orange-600',
  status_changed: 'bg-teal-100 text-teal-600',
  note_added: 'bg-gray-100 text-gray-600',
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">최근 활동</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              최근 활동이 없습니다
            </p>
          ) : (
            activities.map((activity, index) => {
              const Icon = activityIcons[activity.type];
              const isLast = index === activities.length - 1;

              return (
                <div key={activity.id} className="flex gap-3">
                  {/* 타임라인 */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        activityStyles[activity.type]
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {!isLast && (
                      <div className="mt-1 h-full w-px bg-border" />
                    )}
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 pb-4">
                    <p className="text-sm">
                      {activity.householdName && (
                        <span className="font-medium">
                          {activity.householdName}
                        </span>
                      )}{' '}
                      {activity.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Avatar className="h-4 w-4">
                        <AvatarFallback className="text-[8px] bg-muted">
                          {activity.officerName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{activity.officerName}</span>
                      <span>·</span>
                      <span>
                        {formatDistanceToNow(new Date(activity.timestamp), {
                          addSuffix: true,
                          locale: ko,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
