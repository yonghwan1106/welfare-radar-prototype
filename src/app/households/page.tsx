'use client';

import { useState, useMemo } from 'react';
import { HouseholdFilters, HouseholdTable, HouseholdCard } from '@/components/households';
import { Pagination, EmptyState } from '@/components/shared';
import { useHouseholdStore } from '@/stores';

const ITEMS_PER_PAGE = 12;

export default function HouseholdsPage() {
  const { viewMode, getFilteredHouseholds } = useHouseholdStore();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredHouseholds = getFilteredHouseholds();

  // 페이지네이션
  const totalPages = Math.ceil(filteredHouseholds.length / ITEMS_PER_PAGE);
  const paginatedHouseholds = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredHouseholds.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredHouseholds, currentPage]);

  // 페이지 변경 시 첫 페이지로 이동 방지
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold">위기가구 관리</h2>
        <p className="text-muted-foreground">
          총 {filteredHouseholds.length}가구
        </p>
      </div>

      {/* 필터 */}
      <HouseholdFilters />

      {/* 컨텐츠 */}
      {filteredHouseholds.length === 0 ? (
        <EmptyState
          type="households"
          title="조건에 맞는 가구가 없습니다"
          description="필터 조건을 변경하거나 검색어를 확인해주세요"
        />
      ) : viewMode === 'table' ? (
        <HouseholdTable households={paginatedHouseholds} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedHouseholds.map((household) => (
            <HouseholdCard key={household.id} household={household} />
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
