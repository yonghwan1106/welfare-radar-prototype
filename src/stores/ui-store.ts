'use client';

import { create } from 'zustand';

interface UIState {
  // 사이드바 상태
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;

  // 모달 상태
  activeModal: string | null;
  modalData: Record<string, unknown> | null;

  // 알림
  notifications: Notification[];

  // 액션
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openModal: (modalId: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  timestamp: string;
}

export const useUIStore = create<UIState>((set, get) => ({
  // 초기 상태
  sidebarOpen: true,
  sidebarCollapsed: false,
  activeModal: null,
  modalData: null,
  notifications: [],

  // 사이드바 토글
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // 사이드바 열기/닫기
  setSidebarOpen: (open) =>
    set({ sidebarOpen: open }),

  // 사이드바 축소
  setSidebarCollapsed: (collapsed) =>
    set({ sidebarCollapsed: collapsed }),

  // 모달 열기
  openModal: (modalId, data) =>
    set({ activeModal: modalId, modalData: data || null }),

  // 모달 닫기
  closeModal: () =>
    set({ activeModal: null, modalData: null }),

  // 알림 추가
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
        },
      ],
    })),

  // 알림 제거
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  // 모든 알림 제거
  clearNotifications: () =>
    set({ notifications: [] }),
}));
