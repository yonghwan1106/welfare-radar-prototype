import type { Officer } from '@/types';

export const officers: Officer[] = [
  {
    id: 'officer-1',
    name: '김주무관',
    position: '주무관',
    department: '복지정책과',
    phone: '02-1234-5678',
    email: 'kim@gangnam.go.kr',
    assignedHouseholdCount: 12,
  },
  {
    id: 'officer-2',
    name: '이주무관',
    position: '주무관',
    department: '복지정책과',
    phone: '02-1234-5679',
    email: 'lee@gangnam.go.kr',
    assignedHouseholdCount: 10,
  },
  {
    id: 'officer-3',
    name: '박주무관',
    position: '주무관',
    department: '복지정책과',
    phone: '02-1234-5680',
    email: 'park@gangnam.go.kr',
    assignedHouseholdCount: 11,
  },
  {
    id: 'officer-4',
    name: '최주무관',
    position: '주무관',
    department: '복지정책과',
    phone: '02-1234-5681',
    email: 'choi@gangnam.go.kr',
    assignedHouseholdCount: 9,
  },
  {
    id: 'officer-5',
    name: '정주무관',
    position: '주무관',
    department: '복지정책과',
    phone: '02-1234-5682',
    email: 'jung@gangnam.go.kr',
    assignedHouseholdCount: 8,
  },
];

// 현재 로그인한 담당자 (시뮬레이션용)
export const currentOfficer = officers[0];
