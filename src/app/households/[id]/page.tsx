'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Phone, MessageSquare, MapPin, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BasicInfoCard,
  RiskRadarChart,
  AIAnalysis,
  RecommendedServices,
  ContactHistory,
} from '@/components/household-detail';
import { EmptyState } from '@/components/shared';
import { useHouseholdStore } from '@/stores';

interface HouseholdDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function HouseholdDetailPage({ params }: HouseholdDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { getHouseholdById } = useHouseholdStore();

  const household = getHouseholdById(id);

  if (!household) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <EmptyState
          type="households"
          title="가구를 찾을 수 없습니다"
          description="요청한 가구 정보가 존재하지 않습니다"
          action={
            <Button onClick={() => router.push('/households')}>
              목록으로 돌아가기
            </Button>
          }
        />
      </div>
    );
  }

  // AI 분석 데이터 (Mock)
  const aiKeyFindings = [
    '최근 3개월간 수도/전기 요금 연체 기록 확인',
    '건강보험 자격 상실 위험 감지',
    '사회적 고립 지표 상승 추세',
  ];

  const aiRecommendations = [
    '긴급복지지원제도 연계 검토 권장',
    '에너지바우처 신청 안내 필요',
    '독거노인 돌봄서비스 연계 고려',
  ];

  return (
    <div className="space-y-6">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/households')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{household.name}</h1>
            <p className="text-muted-foreground">
              {household.address.district} {household.address.dong}
            </p>
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            전화
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            문자
          </Button>
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            방문
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>상태 변경</DropdownMenuItem>
              <DropdownMenuItem>담당자 변경</DropdownMenuItem>
              <DropdownMenuItem>보고서 생성</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 좌측 컬럼 */}
        <div className="space-y-6">
          <BasicInfoCard household={household} />
          <RiskRadarChart dimensions={household.riskDimensions} />
        </div>

        {/* 우측 컬럼 */}
        <div className="space-y-6">
          <AIAnalysis
            summary={household.aiSummary}
            riskLevel={household.riskLevel}
            keyFindings={aiKeyFindings}
            recommendations={aiRecommendations}
          />
          <RecommendedServices
            recommendations={household.recommendedServices || []}
          />
        </div>
      </div>

      {/* 연락 기록 */}
      <ContactHistory records={household.contactHistory || []} />
    </div>
  );
}
