'use client';

import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { RiskLevelBadge } from './risk-level-badge';
import { QuickActions } from './quick-actions';
import { STATUS_LABELS } from '@/lib/constants';
import type { Household, HouseholdStatus } from '@/types';

interface HouseholdTableProps {
  households: Household[];
}

const statusStyles: Record<HouseholdStatus, string> = {
  unprocessed: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  monitoring: 'bg-purple-100 text-purple-700',
};

export function HouseholdTable({ households }: HouseholdTableProps) {
  const router = useRouter();

  const handleViewDetail = (id: string) => {
    router.push(`/households/${id}`);
  };

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">위기등급</TableHead>
            <TableHead className="w-[120px]">이름</TableHead>
            <TableHead className="w-[80px]">연령</TableHead>
            <TableHead className="w-[100px]">가구유형</TableHead>
            <TableHead>주소</TableHead>
            <TableHead className="w-[100px]">위기점수</TableHead>
            <TableHead className="w-[100px]">상태</TableHead>
            <TableHead className="w-[140px] text-right">액션</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {households.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center">
                <p className="text-muted-foreground">
                  조건에 맞는 가구가 없습니다
                </p>
              </TableCell>
            </TableRow>
          ) : (
            households.map((household) => (
              <TableRow
                key={household.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleViewDetail(household.id)}
              >
                <TableCell>
                  <RiskLevelBadge level={household.riskLevel} showDot />
                </TableCell>
                <TableCell className="font-medium">{household.name}</TableCell>
                <TableCell>{household.age}세</TableCell>
                <TableCell>{household.householdType}</TableCell>
                <TableCell className="text-muted-foreground">
                  {household.address.district} {household.address.dong}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${household.riskScore}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {household.riskScore}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusStyles[household.status]}
                  >
                    {STATUS_LABELS[household.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <QuickActions
                    householdId={household.id}
                    householdName={household.name}
                    onViewDetail={() => handleViewDetail(household.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
