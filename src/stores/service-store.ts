'use client';

import { create } from 'zustand';
import type { WelfareService, ServiceFilters, ServiceCategory } from '@/types';
import { welfareServices as mockServices } from '@/lib/mock-data';

interface ServiceState {
  // 데이터
  services: WelfareService[];
  selectedService: WelfareService | null;

  // 필터
  filters: ServiceFilters;

  // 액션
  setFilters: (filters: Partial<ServiceFilters>) => void;
  resetFilters: () => void;
  selectService: (id: string | null) => void;
  getFilteredServices: () => WelfareService[];
  getServiceById: (id: string) => WelfareService | undefined;
  getServicesByCategory: (category: ServiceCategory) => WelfareService[];
}

const defaultFilters: ServiceFilters = {
  search: '',
  category: 'all',
};

export const useServiceStore = create<ServiceState>((set, get) => ({
  // 초기 데이터
  services: mockServices,
  selectedService: null,

  // 초기 필터
  filters: defaultFilters,

  // 필터 설정
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  // 필터 초기화
  resetFilters: () =>
    set({ filters: defaultFilters }),

  // 서비스 선택
  selectService: (id) =>
    set((state) => ({
      selectedService: id ? state.services.find((s) => s.id === id) || null : null,
    })),

  // 필터링된 서비스 목록 반환
  getFilteredServices: () => {
    const { services, filters } = get();

    let filtered = [...services];

    // 검색 필터
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.description.toLowerCase().includes(searchLower) ||
          s.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // 카테고리 필터
    if (filters.category !== 'all') {
      filtered = filtered.filter((s) => s.category === filters.category);
    }

    // 인기순 정렬
    filtered.sort((a, b) => b.popularity - a.popularity);

    return filtered;
  },

  // ID로 서비스 조회
  getServiceById: (id) => {
    const { services } = get();
    return services.find((s) => s.id === id);
  },

  // 카테고리별 서비스 조회
  getServicesByCategory: (category) => {
    const { services } = get();
    return services.filter((s) => s.category === category);
  },
}));
