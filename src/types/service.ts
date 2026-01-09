import type { ServiceCategory, HouseholdType } from './common';

// 연령 범위
export interface AgeRange {
  min?: number;
  max?: number;
}

// 자격 요건
export interface Eligibility {
  ageRange?: AgeRange;
  incomeLevel?: string;        // "기준 중위소득 50% 이하"
  householdTypes?: HouseholdType[];
  otherRequirements?: string[];
}

// 복지 서비스
export interface WelfareService {
  id: string;
  name: string;
  category: ServiceCategory;
  subcategory: string;         // 소분류

  description: string;
  benefits: string;            // 지원 내용
  amount?: string;             // 지원 금액

  eligibility: Eligibility;

  applicationMethods: string[];   // ["주민센터 방문", "온라인", "전화"]
  requiredDocuments: string[];
  processingTime: string;
  contactInfo: string;

  tags: string[];
  popularity: number;          // 조회/연결 빈도
}

// 서비스 필터 옵션
export interface ServiceFilters {
  search: string;
  category: ServiceCategory | 'all';
  targetAge?: number;
  incomeLevel?: string;
}
