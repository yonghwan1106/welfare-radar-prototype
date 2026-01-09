import type { RiskLevel, HouseholdStatus, HouseholdType, Gender, ContactMethod, ContactResult, EligibilityStatus } from './common';

// 주소 정보
export interface Address {
  city: string;           // "서울특별시"
  district: string;       // "강남구"
  dong: string;           // "역삼동"
}

// 6차원 위기 점수
export interface RiskDimensions {
  economic: number;        // 경제적 위기 0-100
  health: number;          // 건강 위기 0-100
  isolation: number;       // 사회적 고립 0-100
  housing: number;         // 주거 위기 0-100
  family: number;          // 가족 위기 0-100
  administrative: number;  // 행정 위기 0-100
}

// 6차원 위기 키
export type RiskDimensionKey = keyof RiskDimensions;

// 위기 요인
export interface RiskFactor {
  factor: string;          // "전기요금 4개월 체납"
  impact: number;          // 영향도 (퍼센트)
  description: string;     // 상세 설명
}

// 복지 서비스 추천
export interface ServiceRecommendation {
  serviceId: string;
  serviceName: string;
  matchScore: number;      // 0-100
  reason?: string;
  isLinked?: boolean;
  eligibilityStatus: EligibilityStatus;
}

// 연락 기록
export interface ContactRecord {
  id: string;
  contactedAt: string;     // ISO date string
  method: ContactMethod;
  result: ContactResult;
  officerName: string;
  notes?: string;
}

// 가구 정보 (메인 인터페이스)
export interface Household {
  id: string;
  name: string;              // 마스킹: "박OO"
  age: number;
  gender: Gender;
  address: Address;
  householdType: HouseholdType;
  contact: string;           // 마스킹: "010-****-5678"

  // 위기 분석
  riskLevel: RiskLevel;
  riskScore: number;         // 종합 스코어 0-100
  riskDimensions: RiskDimensions;
  riskFactors: RiskFactor[];

  // AI 분석
  aiSummary: string;
  aiRecommendations: string[];

  // 추천 서비스
  recommendedServices: ServiceRecommendation[];

  // 담당 및 상태
  assignedOfficerId: string;
  assignedOfficerName: string;
  status: HouseholdStatus;

  // 이력
  contactHistory: ContactRecord[];

  // 메타
  createdAt: string;
  updatedAt: string;
}

// 가구 필터 옵션
export interface HouseholdFilters {
  search: string;
  riskLevel: RiskLevel | 'all';
  householdType: HouseholdType | 'all';
  status: HouseholdStatus | 'all';
  dong: string | 'all';
  assignedOfficerId: string | 'all';
}

// 정렬 옵션
export interface HouseholdSort {
  field: 'riskScore' | 'createdAt' | 'name' | 'age';
  order: 'asc' | 'desc';
}
