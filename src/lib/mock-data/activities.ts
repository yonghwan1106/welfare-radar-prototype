// 최근 활동 데이터
export interface Activity {
  id: string;
  officerName: string;
  action: string;
  target: string;
  targetId?: string;
  timestamp: string;
  type: 'send' | 'visit' | 'call' | 'status' | 'note';
}

const now = new Date();

export const recentActivities: Activity[] = [
  {
    id: 'activity-1',
    officerName: '김주무관',
    action: '긴급복지지원 안내 발송',
    target: '박OO 가구',
    targetId: 'household-critical-1',
    timestamp: new Date(now.getTime() - 10 * 60 * 1000).toISOString(), // 10분 전
    type: 'send',
  },
  {
    id: 'activity-2',
    officerName: '이주무관',
    action: '방문 상담 완료',
    target: '최OO 가구',
    targetId: 'household-warning-3',
    timestamp: new Date(now.getTime() - 60 * 60 * 1000).toISOString(), // 1시간 전
    type: 'visit',
  },
  {
    id: 'activity-3',
    officerName: '박주무관',
    action: '전화 연락 시도 (부재중)',
    target: '정OO 가구',
    targetId: 'household-warning-5',
    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
    type: 'call',
  },
  {
    id: 'activity-4',
    officerName: '최주무관',
    action: '상태 변경 (진행중 → 완료)',
    target: '한OO 가구',
    targetId: 'household-attention-2',
    timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3시간 전
    type: 'status',
  },
  {
    id: 'activity-5',
    officerName: '정주무관',
    action: '에너지바우처 안내 발송',
    target: '이OO 가구',
    targetId: 'household-critical-2',
    timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(), // 4시간 전
    type: 'send',
  },
  {
    id: 'activity-6',
    officerName: '김주무관',
    action: '메모 추가',
    target: '강OO 가구',
    targetId: 'household-warning-1',
    timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(), // 5시간 전
    type: 'note',
  },
  {
    id: 'activity-7',
    officerName: '이주무관',
    action: '카카오톡 안내 발송',
    target: '윤OO 가구',
    targetId: 'household-attention-5',
    timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 1일 전
    type: 'send',
  },
  {
    id: 'activity-8',
    officerName: '박주무관',
    action: '방문 상담 완료',
    target: '송OO 가구',
    targetId: 'household-warning-7',
    timestamp: new Date(now.getTime() - 25 * 60 * 60 * 1000).toISOString(), // 1일 1시간 전
    type: 'visit',
  },
];

// 오늘의 할 일 (긴급, 연락예정, 방문예정)
export interface TodoItem {
  id: string;
  type: 'urgent' | 'call' | 'visit';
  title: string;
  target: string;
  targetId: string;
  time?: string;
  riskLevel?: 'critical' | 'warning' | 'attention';
}

export const todayTasks: TodoItem[] = [
  {
    id: 'task-1',
    type: 'urgent',
    title: '긴급 대응 필요',
    target: '박OO 가구',
    targetId: 'household-critical-1',
    riskLevel: 'critical',
  },
  {
    id: 'task-2',
    type: 'urgent',
    title: '긴급 대응 필요',
    target: '이OO 가구',
    targetId: 'household-critical-2',
    riskLevel: 'critical',
  },
  {
    id: 'task-3',
    type: 'call',
    title: '연락 예정',
    target: '정OO 가구',
    targetId: 'household-warning-5',
    time: '14:00',
  },
  {
    id: 'task-4',
    type: 'call',
    title: '연락 예정',
    target: '한OO 가구',
    targetId: 'household-attention-1',
    time: '15:30',
  },
  {
    id: 'task-5',
    type: 'visit',
    title: '방문 예정',
    target: '최OO 가구',
    targetId: 'household-warning-3',
    time: '16:00',
  },
];
