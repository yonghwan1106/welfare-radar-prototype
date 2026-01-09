// 담당자 (복지 담당 공무원)
export interface Officer {
  id: string;
  name: string;
  position: string;        // "주무관"
  department: string;      // "복지정책과"
  phone: string;
  email: string;
  assignedHouseholdCount: number;
  avatar?: string;
}
