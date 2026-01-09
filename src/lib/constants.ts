// 복지 레이더 디자인 시스템 상수

// 브랜드 컬러
export const COLORS = {
  // Brand Colors
  background: '#FAF8F5',      // Warm Cream
  primary: '#3D5A80',         // Twilight Blue
  primaryHover: '#2C4A6E',
  accent: '#E07A5F',          // Coral
  accentHover: '#C4684E',
  text: '#2D3436',            // Deep Charcoal
  textMuted: '#636E72',

  // Risk Level Colors
  risk: {
    critical: '#DC2626',      // Red
    criticalBg: '#FEE2E2',
    warning: '#EA580C',       // Orange
    warningBg: '#FFEDD5',
    attention: '#CA8A04',     // Yellow
    attentionBg: '#FEF9C3',
    normal: '#16A34A',        // Green
    normalBg: '#DCFCE7',
  },

  // Risk Dimension Colors (for Radar Chart)
  dimensions: {
    economic: '#3B82F6',      // Blue - 경제적 위기
    health: '#EF4444',        // Red - 건강 위기
    isolation: '#8B5CF6',     // Purple - 사회적 고립
    housing: '#F97316',       // Orange - 주거 위기
    family: '#EC4899',        // Pink - 가족 위기
    administrative: '#06B6D4', // Cyan - 행정 위기
  },

  // Service Category Colors
  categories: {
    '생활지원': '#3B82F6',
    '의료': '#EF4444',
    '주거': '#F97316',
    '고용': '#8B5CF6',
    '교육': '#06B6D4',
    '돌봄': '#EC4899',
  },
} as const;

// 위기 등급 라벨
export const RISK_LABELS: Record<string, string> = {
  critical: '긴급',
  warning: '주의',
  attention: '관심',
  normal: '정상',
};

// 6차원 위기 라벨
export const DIMENSION_LABELS = {
  economic: '경제적 위기',
  health: '건강 위기',
  isolation: '사회적 고립',
  housing: '주거 위기',
  family: '가족 위기',
  administrative: '행정 위기',
} as const;

// 처리 상태 라벨
export const STATUS_LABELS: Record<string, string> = {
  unprocessed: '미처리',
  in_progress: '진행중',
  completed: '완료',
  monitoring: '모니터링',
};

// 가구 유형 라벨
export const HOUSEHOLD_TYPE_LABELS = {
  '1인': '1인가구',
  '부부': '부부',
  '한부모': '한부모',
  '다자녀': '다자녀',
  '다문화': '다문화',
  '조손': '조손',
  '기타': '기타',
} as const;

// 연락 방법 라벨
export const CONTACT_METHOD_LABELS = {
  phone: { ko: '전화', icon: '📞' },
  sms: { ko: '문자', icon: '💬' },
  kakao: { ko: '카카오톡', icon: '💛' },
  visit: { ko: '방문', icon: '🏠' },
} as const;

// 서비스 카테고리 라벨
export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  '생활지원': '생활지원',
  '의료': '의료',
  '주거': '주거',
  '고용': '고용',
  '교육': '교육',
  '돌봄': '돌봄',
};

// KPI 라벨
export const KPI_LABELS = {
  blindSpotReduction: {
    title: '사각지대 감소율',
    unit: '%',
    target: 50,
    icon: '📉',
  },
  connectionRate: {
    title: '복지 연결률',
    unit: '%',
    target: 85,
    icon: '🔗',
  },
  discoveryTime: {
    title: '평균 발견시간',
    unit: '일',
    target: 3,
    icon: '⏱️',
  },
  monthlyDiscovery: {
    title: '이번달 발굴',
    unit: '건',
    icon: '🔍',
  },
} as const;
