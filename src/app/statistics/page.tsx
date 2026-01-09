'use client';

import {
  StatisticsKpi,
  MonthlyTrendChart,
  GeographicChart,
  HouseholdTypeChart,
  AgeDistributionChart,
  RiskDimensionChart,
  StatusChart,
} from '@/components/statistics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">통계</h2>
          <p className="text-muted-foreground">
            복지 사각지대 발굴 현황을 한눈에 파악하세요
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            새로고침
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            보고서 다운로드
          </Button>
        </div>
      </div>

      {/* 핵심 지표 */}
      <StatisticsKpi />

      {/* 탭별 상세 통계 */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">종합 현황</TabsTrigger>
          <TabsTrigger value="risk">위기 분석</TabsTrigger>
          <TabsTrigger value="demographics">인구 통계</TabsTrigger>
        </TabsList>

        {/* 종합 현황 탭 */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MonthlyTrendChart />
            <StatusChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <GeographicChart />
            <HouseholdTypeChart />
          </div>
        </TabsContent>

        {/* 위기 분석 탭 */}
        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RiskDimensionChart />
            <StatusChart />
          </div>
          <MonthlyTrendChart />
        </TabsContent>

        {/* 인구 통계 탭 */}
        <TabsContent value="demographics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AgeDistributionChart />
            <HouseholdTypeChart />
          </div>
          <GeographicChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
