'use client';

import { Phone, MessageSquare, MapPin, MoreHorizontal, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface QuickActionsProps {
  householdId: string;
  householdName: string;
  compact?: boolean;
  onCall?: () => void;
  onMessage?: () => void;
  onVisit?: () => void;
  onViewDetail?: () => void;
}

export function QuickActions({
  householdId,
  householdName,
  compact = false,
  onCall,
  onMessage,
  onVisit,
  onViewDetail,
}: QuickActionsProps) {
  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onCall}>
            <Phone className="mr-2 h-4 w-4" />
            전화 연락
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onMessage}>
            <MessageSquare className="mr-2 h-4 w-4" />
            문자 발송
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onVisit}>
            <MapPin className="mr-2 h-4 w-4" />
            방문 일정
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onViewDetail}>
            <FileText className="mr-2 h-4 w-4" />
            상세 보기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onCall}
            >
              <Phone className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>전화 연락</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onMessage}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>문자 발송</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onVisit}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>방문 일정</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onViewDetail}>
              <FileText className="mr-2 h-4 w-4" />
              상세 보기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  );
}
