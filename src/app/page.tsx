'use client';

import { KPICards, RiskDistributionChart, TodayTasks, RecentActivity } from '@/components/dashboard';
import {
  households,
  householdStats,
  recentActivities,
  todayTasks,
} from '@/lib/mock-data';
import type { RiskLevel, ContactMethod } from '@/types';

// 활동 타입 매핑
const activityTypeMap: Record<string, string> = {
  send: 'service_linked',
  visit: 'contact',
  call: 'contact',
  status: 'status_changed',
  note: 'note_added',
};

// 할일 타입 매핑
const taskTypeMap: Record<string, ContactMethod> = {
  urgent: 'phone',
  call: 'phone',
  visit: 'visit',
};

export default function DashboardPage() {
  // KPI 데이터
  const kpiData = {
    totalHouseholds: householdStats.total,
    criticalCount: householdStats.byRiskLevel.critical,
    inProgressCount: households.filter((h) => h.status === 'in_progress').length,
    completedToday: 5, // Mock
  };

  // 위기등급 분포 데이터
  const riskDistributionData: { level: RiskLevel; count: number }[] = [
    { level: 'critical', count: householdStats.byRiskLevel.critical },
    { level: 'warning', count: householdStats.byRiskLevel.warning },
    { level: 'attention', count: householdStats.byRiskLevel.attention },
    { level: 'normal', count: householdStats.byRiskLevel.normal },
  ];

  // 오늘의 할 일 데이터 변환
  const transformedTasks = todayTasks.map((task) => ({
    id: task.id,
    householdName: task.target,
    riskLevel: (task.riskLevel || 'attention') as RiskLevel,
    taskType: taskTypeMap[task.type] || 'phone',
    description: task.title + (task.time ? ` (${task.time})` : ''),
    completed: false,
  }));

  // 최근 활동 데이터 변환
  const transformedActivities = recentActivities.slice(0, 6).map((activity) => ({
    id: activity.id,
    type: activityTypeMap[activity.type] as 'contact' | 'service_linked' | 'new_household' | 'risk_changed' | 'status_changed' | 'note_added',
    description: activity.action,
    householdName: activity.target,
    officerName: activity.officerName,
    timestamp: activity.timestamp,
  }));

  return (
    <div className="space-y-6">
      {/* KPI 카드 */}
      <KPICards data={kpiData} />

      {/* 차트 및 할일 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RiskDistributionChart data={riskDistributionData} />
        <TodayTasks tasks={transformedTasks} />
      </div>

      {/* 최근 활동 */}
      <RecentActivity activities={transformedActivities} />
    </div>
  );
}
