import type { Household, RiskLevel, HouseholdType, HouseholdStatus, Gender, ContactMethod } from '@/types';

// 강남구 동 목록
const dongs = ['역삼동', '삼성동', '대치동', '청담동', '논현동', '신사동', '압구정동', '개포동'];

// 이름 목록 (마스킹용)
const lastNames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '류', '홍'];

// 위기 요인 템플릿
const riskFactorTemplates = {
  economic: [
    { factor: '건강보험료 체납', description: '건강보험료 3개월 이상 체납' },
    { factor: '전기요금 체납', description: '전기요금 연속 체납' },
    { factor: '가스요금 체납', description: '가스요금 연속 체납' },
    { factor: '국민연금 미납', description: '국민연금 보험료 미납' },
    { factor: '소득 급감', description: '전년 대비 소득 50% 이상 감소' },
  ],
  health: [
    { factor: '병원 방문 중단', description: '정기 병원 방문 3개월 이상 중단' },
    { factor: '만성질환 약 처방 중단', description: '만성질환 약 처방 2개월 이상 중단' },
    { factor: '응급실 반복 이용', description: '최근 3개월 내 응급실 2회 이상 이용' },
    { factor: '건강검진 미수검', description: '2년 이상 건강검진 미수검' },
  ],
  isolation: [
    { factor: '1인 독거', description: '독거 상태로 생활' },
    { factor: '사회적 접촉 감소', description: '사회적 활동 및 접촉 현저히 감소' },
    { factor: '복지관 이용 중단', description: '복지관 이용 6개월 이상 중단' },
    { factor: '민원/상담 이력 없음', description: '최근 1년간 민원/상담 이력 없음' },
  ],
  housing: [
    { factor: '주거급여 미신청', description: '주거급여 수급 자격이나 미신청' },
    { factor: '임대료 체납', description: '임대료 2개월 이상 체납' },
    { factor: '에너지 빈곤', description: '에너지비 과부담 가구' },
  ],
  family: [
    { factor: '한부모 가정', description: '한부모 가정으로 양육 부담' },
    { factor: '최근 이혼/사별', description: '최근 1년 내 이혼 또는 사별' },
    { factor: '양육비 미지급', description: '양육비 미수령 상태' },
  ],
  administrative: [
    { factor: '복지급여 중단 예정', description: '복지급여 중단 예정 통보' },
    { factor: '자격 재심사 대상', description: '복지 자격 재심사 대상자' },
  ],
};

// AI 요약 템플릿
const aiSummaryTemplates = {
  critical: [
    '전기요금 장기 체납과 병원 방문 중단이 주요 위기 요인으로 분석됩니다. 긴급 개입이 필요합니다.',
    '건강보험료 체납과 사회적 고립이 심각한 수준입니다. 즉각적인 복지 연결이 필요합니다.',
    '복합적인 경제 위기와 건강 위기가 동시에 발생하고 있습니다. 긴급복지지원 연계를 권장합니다.',
  ],
  warning: [
    '경제적 어려움과 건강 관리 중단 징후가 발견됩니다. 면밀한 모니터링이 필요합니다.',
    '사회적 고립 지표가 상승하고 있습니다. 방문 상담을 통한 상태 확인을 권장합니다.',
    '복지급여 중단 예정으로 인한 생활 어려움이 예상됩니다. 대체 서비스 연결이 필요합니다.',
  ],
  attention: [
    '일부 위기 지표가 관찰되나 즉각적인 위험 수준은 아닙니다. 정기적인 모니터링을 권장합니다.',
    '경제적 지표에서 약간의 변화가 감지됩니다. 예방적 복지 서비스 안내를 고려해 주세요.',
  ],
  normal: [
    '현재 안정적인 상태입니다. 정기 모니터링을 유지해 주세요.',
    '특별한 위기 징후가 발견되지 않습니다.',
  ],
};

// 추천 조치
const recommendationTemplates = {
  critical: [
    '긴급복지지원 연계 (생계지원)',
    '에너지바우처 신청 지원',
    '건강 상태 확인을 위한 방문 상담',
    '의료급여 연결',
  ],
  warning: [
    '복지 서비스 안내 발송',
    '정기 연락을 통한 상태 모니터링',
    '지역사회 연계 프로그램 안내',
  ],
  attention: [
    '예방적 복지 정보 안내',
    '분기별 상태 확인',
  ],
  normal: [
    '정기 모니터링 유지',
  ],
};

// 연락 기록 생성
function generateContactHistory(count: number, officerNames: string[]): Household['contactHistory'] {
  const methods: ContactMethod[] = ['phone', 'sms', 'kakao', 'visit'];
  const results: ('success' | 'no_answer' | 'refused' | 'scheduled')[] = ['success', 'no_answer', 'refused', 'scheduled'];
  const notes = [
    '건강상태 양호, 경제적 어려움 호소',
    '부재중, 문자 발송 완료',
    '복지 서비스 안내 발송',
    '긴급복지지원 신청 의향 있음',
    '정기 모니터링 완료',
    '에너지바우처 안내 완료',
    '방문 상담 예약됨',
  ];

  const history = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (i * 5 + Math.floor(Math.random() * 10)));

    history.push({
      id: `contact-${Math.random().toString(36).substr(2, 9)}`,
      contactedAt: date.toISOString(),
      method: methods[Math.floor(Math.random() * methods.length)],
      officerName: officerNames[Math.floor(Math.random() * officerNames.length)],
      notes: notes[Math.floor(Math.random() * notes.length)],
      result: results[Math.floor(Math.random() * results.length)],
    });
  }

  return history.sort((a, b) => new Date(b.contactedAt).getTime() - new Date(a.contactedAt).getTime());
}

// 가구 생성 함수
function generateHousehold(
  id: string,
  riskLevel: RiskLevel,
  officerId: string,
  officerName: string
): Household {
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const dong = dongs[Math.floor(Math.random() * dongs.length)];
  const gender: Gender = Math.random() > 0.5 ? 'M' : 'F';

  // 위기 등급별 나이 분포 조정
  let age: number;
  if (riskLevel === 'critical' || riskLevel === 'warning') {
    age = Math.floor(Math.random() * 30) + 55; // 55-85세 (고위험은 고령자 비율 높음)
  } else {
    age = Math.floor(Math.random() * 50) + 30; // 30-80세
  }

  // 가구 유형 (위기 등급 높을수록 1인가구 비율 높음)
  const householdTypes: HouseholdType[] = ['1인', '부부', '한부모', '다자녀', '다문화', '조손', '기타'];
  let householdType: HouseholdType;
  if (riskLevel === 'critical') {
    householdType = Math.random() > 0.3 ? '1인' : householdTypes[Math.floor(Math.random() * householdTypes.length)];
  } else if (riskLevel === 'warning') {
    householdType = Math.random() > 0.5 ? '1인' : householdTypes[Math.floor(Math.random() * householdTypes.length)];
  } else {
    householdType = householdTypes[Math.floor(Math.random() * householdTypes.length)];
  }

  // 위기 스코어 및 차원별 점수 생성
  let riskScore: number;
  let dimensions: Household['riskDimensions'];

  switch (riskLevel) {
    case 'critical':
      riskScore = Math.floor(Math.random() * 20) + 80; // 80-100
      dimensions = {
        economic: Math.floor(Math.random() * 30) + 70,
        health: Math.floor(Math.random() * 40) + 50,
        isolation: Math.floor(Math.random() * 40) + 60,
        housing: Math.floor(Math.random() * 50) + 30,
        family: Math.floor(Math.random() * 60) + 20,
        administrative: Math.floor(Math.random() * 50) + 40,
      };
      break;
    case 'warning':
      riskScore = Math.floor(Math.random() * 15) + 65; // 65-80
      dimensions = {
        economic: Math.floor(Math.random() * 40) + 50,
        health: Math.floor(Math.random() * 40) + 40,
        isolation: Math.floor(Math.random() * 40) + 50,
        housing: Math.floor(Math.random() * 50) + 30,
        family: Math.floor(Math.random() * 50) + 20,
        administrative: Math.floor(Math.random() * 50) + 30,
      };
      break;
    case 'attention':
      riskScore = Math.floor(Math.random() * 15) + 50; // 50-65
      dimensions = {
        economic: Math.floor(Math.random() * 40) + 30,
        health: Math.floor(Math.random() * 40) + 30,
        isolation: Math.floor(Math.random() * 40) + 40,
        housing: Math.floor(Math.random() * 40) + 20,
        family: Math.floor(Math.random() * 40) + 15,
        administrative: Math.floor(Math.random() * 40) + 20,
      };
      break;
    default: // normal
      riskScore = Math.floor(Math.random() * 30) + 20; // 20-50
      dimensions = {
        economic: Math.floor(Math.random() * 30) + 10,
        health: Math.floor(Math.random() * 30) + 10,
        isolation: Math.floor(Math.random() * 30) + 15,
        housing: Math.floor(Math.random() * 30) + 10,
        family: Math.floor(Math.random() * 25) + 5,
        administrative: Math.floor(Math.random() * 25) + 10,
      };
  }

  // 위기 요인 생성
  const riskFactors: Household['riskFactors'] = [];
  const factorCount = riskLevel === 'critical' ? 4 : riskLevel === 'warning' ? 3 : riskLevel === 'attention' ? 2 : 1;

  const dimensionKeys = ['economic', 'health', 'isolation', 'housing', 'family', 'administrative'] as const;
  const sortedDimensions = dimensionKeys
    .map(key => ({ key, value: dimensions[key] }))
    .sort((a, b) => b.value - a.value);

  let remainingImpact = 100;
  for (let i = 0; i < Math.min(factorCount, sortedDimensions.length); i++) {
    const dim = sortedDimensions[i].key;
    const templates = riskFactorTemplates[dim];
    const template = templates[Math.floor(Math.random() * templates.length)];
    const impact = i === factorCount - 1 ? remainingImpact : Math.floor(Math.random() * 20) + 20;
    remainingImpact -= impact;

    riskFactors.push({
      factor: template.factor,
      description: template.description,
      impact: Math.max(impact, 10),
    });
  }

  // AI 요약 및 추천
  const summaryTemplates = aiSummaryTemplates[riskLevel];
  const aiSummary = summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
  const aiRecommendations = recommendationTemplates[riskLevel];

  // 추천 서비스
  const recommendedServices: Household['recommendedServices'] = [];
  if (riskLevel === 'critical' || riskLevel === 'warning') {
    recommendedServices.push(
      { serviceId: 'service-1', serviceName: '긴급복지지원', matchScore: 92, eligibilityStatus: 'eligible' },
      { serviceId: 'service-2', serviceName: '에너지바우처', matchScore: 88, eligibilityStatus: 'eligible' },
      { serviceId: 'service-3', serviceName: '기초생활보장', matchScore: 85, eligibilityStatus: 'check_required' },
    );
  } else if (riskLevel === 'attention') {
    recommendedServices.push(
      { serviceId: 'service-4', serviceName: '건강보험료 지원', matchScore: 78, eligibilityStatus: 'eligible' },
      { serviceId: 'service-5', serviceName: '노인돌봄서비스', matchScore: 72, eligibilityStatus: 'check_required' },
    );
  }

  // 상태 (위기 등급이 높을수록 미처리 비율 높음)
  const statuses: HouseholdStatus[] = ['unprocessed', 'in_progress', 'completed', 'monitoring'];
  let status: HouseholdStatus;
  if (riskLevel === 'critical') {
    status = Math.random() > 0.7 ? 'in_progress' : 'unprocessed';
  } else if (riskLevel === 'warning') {
    status = statuses[Math.floor(Math.random() * 3)];
  } else {
    status = statuses[Math.floor(Math.random() * statuses.length)];
  }

  const today = new Date();
  const createdDate = new Date(today);
  createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 60));

  return {
    id,
    name: `${lastName}OO`,
    age,
    gender,
    address: {
      city: '서울특별시',
      district: '강남구',
      dong,
    },
    householdType,
    contact: `010-****-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    riskLevel,
    riskScore,
    riskDimensions: dimensions,
    riskFactors,
    aiSummary,
    aiRecommendations,
    recommendedServices,
    assignedOfficerId: officerId,
    assignedOfficerName: officerName,
    status,
    contactHistory: generateContactHistory(Math.floor(Math.random() * 4) + 2, [officerName]),
    createdAt: createdDate.toISOString(),
    updatedAt: today.toISOString(),
  };
}

// 가구 데이터 생성
const officerNames = ['김주무관', '이주무관', '박주무관', '최주무관', '정주무관'];
const officerIds = ['officer-1', 'officer-2', 'officer-3', 'officer-4', 'officer-5'];

export const households: Household[] = [];

// 긴급 (5%) - 3개
for (let i = 0; i < 3; i++) {
  const officerIndex = i % 5;
  households.push(generateHousehold(
    `household-critical-${i + 1}`,
    'critical',
    officerIds[officerIndex],
    officerNames[officerIndex]
  ));
}

// 주의 (15%) - 8개
for (let i = 0; i < 8; i++) {
  const officerIndex = i % 5;
  households.push(generateHousehold(
    `household-warning-${i + 1}`,
    'warning',
    officerIds[officerIndex],
    officerNames[officerIndex]
  ));
}

// 관심 (30%) - 15개
for (let i = 0; i < 15; i++) {
  const officerIndex = i % 5;
  households.push(generateHousehold(
    `household-attention-${i + 1}`,
    'attention',
    officerIds[officerIndex],
    officerNames[officerIndex]
  ));
}

// 정상 (50%) - 25개
for (let i = 0; i < 25; i++) {
  const officerIndex = i % 5;
  households.push(generateHousehold(
    `household-normal-${i + 1}`,
    'normal',
    officerIds[officerIndex],
    officerNames[officerIndex]
  ));
}

// 위기 스코어 기준 정렬
households.sort((a, b) => b.riskScore - a.riskScore);

// 동별 목록 (필터용)
export const dongList = dongs;

// 통계 데이터
export const householdStats = {
  total: households.length,
  byRiskLevel: {
    critical: households.filter(h => h.riskLevel === 'critical').length,
    warning: households.filter(h => h.riskLevel === 'warning').length,
    attention: households.filter(h => h.riskLevel === 'attention').length,
    normal: households.filter(h => h.riskLevel === 'normal').length,
  },
  byStatus: {
    unprocessed: households.filter(h => h.status === 'unprocessed').length,
    in_progress: households.filter(h => h.status === 'in_progress').length,
    completed: households.filter(h => h.status === 'completed').length,
    monitoring: households.filter(h => h.status === 'monitoring').length,
  },
};
