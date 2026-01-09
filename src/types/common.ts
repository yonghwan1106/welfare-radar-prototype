// 위기 등급
export type RiskLevel = 'critical' | 'warning' | 'attention' | 'normal';

// 가구 처리 상태
export type HouseholdStatus = 'unprocessed' | 'in_progress' | 'completed' | 'monitoring';

// 가구 유형
export type HouseholdType = '1인' | '부부' | '한부모' | '다자녀' | '다문화' | '조손' | '기타';

// 연락 방법
export type ContactMethod = 'phone' | 'sms' | 'kakao' | 'visit';

// 연락 결과
export type ContactResult = 'success' | 'no_answer' | 'refused' | 'scheduled';

// 복지서비스 카테고리
export type ServiceCategory = '생활지원' | '의료' | '주거' | '고용' | '교육' | '돌봄';

// 성별
export type Gender = 'M' | 'F';

// 자격 상태
export type EligibilityStatus = 'eligible' | 'check_required' | 'ineligible';
