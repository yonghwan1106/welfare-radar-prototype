'use client';

import { create } from 'zustand';
import type { Household, HouseholdFilters, HouseholdSort, RiskLevel, HouseholdStatus, HouseholdType } from '@/types';
import { households as mockHouseholds } from '@/lib/mock-data';

interface HouseholdState {
  // 데이터
  households: Household[];
  selectedHousehold: Household | null;

  // 필터
  filters: HouseholdFilters;

  // 정렬
  sort: HouseholdSort;

  // 뷰 모드
  viewMode: 'table' | 'card';

  // 액션
  setFilters: (filters: Partial<HouseholdFilters>) => void;
  resetFilters: () => void;
  setSort: (sort: Partial<HouseholdSort>) => void;
  setViewMode: (mode: 'table' | 'card') => void;
  selectHousehold: (id: string | null) => void;
  getFilteredHouseholds: () => Household[];
  getHouseholdById: (id: string) => Household | undefined;
}

const defaultFilters: HouseholdFilters = {
  search: '',
  riskLevel: 'all',
  householdType: 'all',
  status: 'all',
  dong: 'all',
  assignedOfficerId: 'all',
};

const defaultSort: HouseholdSort = {
  field: 'riskScore',
  order: 'desc',
};

export const useHouseholdStore = create<HouseholdState>((set, get) => ({
  // 초기 데이터
  households: mockHouseholds,
  selectedHousehold: null,

  // 초기 필터
  filters: defaultFilters,

  // 초기 정렬
  sort: defaultSort,

  // 초기 뷰 모드
  viewMode: 'table',

  // 필터 설정
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  // 필터 초기화
  resetFilters: () =>
    set({ filters: defaultFilters }),

  // 정렬 설정
  setSort: (newSort) =>
    set((state) => ({
      sort: { ...state.sort, ...newSort },
    })),

  // 뷰 모드 변경
  setViewMode: (mode) =>
    set({ viewMode: mode }),

  // 가구 선택
  selectHousehold: (id) =>
    set((state) => ({
      selectedHousehold: id ? state.households.find((h) => h.id === id) || null : null,
    })),

  // 필터링된 가구 목록 반환
  getFilteredHouseholds: () => {
    const { households, filters, sort } = get();

    let filtered = [...households];

    // 검색 필터
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (h) =>
          h.name.toLowerCase().includes(searchLower) ||
          h.address.dong.toLowerCase().includes(searchLower)
      );
    }

    // 위기 등급 필터
    if (filters.riskLevel !== 'all') {
      filtered = filtered.filter((h) => h.riskLevel === filters.riskLevel);
    }

    // 가구 유형 필터
    if (filters.householdType !== 'all') {
      filtered = filtered.filter((h) => h.householdType === filters.householdType);
    }

    // 상태 필터
    if (filters.status !== 'all') {
      filtered = filtered.filter((h) => h.status === filters.status);
    }

    // 동 필터
    if (filters.dong !== 'all') {
      filtered = filtered.filter((h) => h.address.dong === filters.dong);
    }

    // 담당자 필터
    if (filters.assignedOfficerId !== 'all') {
      filtered = filtered.filter((h) => h.assignedOfficerId === filters.assignedOfficerId);
    }

    // 정렬
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sort.field) {
        case 'riskScore':
          comparison = a.riskScore - b.riskScore;
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'age':
          comparison = a.age - b.age;
          break;
      }

      return sort.order === 'asc' ? comparison : -comparison;
    });

    return filtered;
  },

  // ID로 가구 조회
  getHouseholdById: (id) => {
    const { households } = get();
    return households.find((h) => h.id === id);
  },
}));
