'use client';

import { useState, useMemo } from 'react';
import { ServiceFilters, ServiceCard, ServiceDetailModal } from '@/components/services';
import { Pagination, EmptyState } from '@/components/shared';
import { useServiceStore } from '@/stores';
import type { WelfareService } from '@/types';

const ITEMS_PER_PAGE = 12;

export default function ServicesPage() {
  const { getFilteredServices, selectService, selectedService } = useServiceStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredServices = getFilteredServices();

  // 페이지네이션
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetail = (service: WelfareService) => {
    selectService(service.id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    selectService(null);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold">복지서비스</h2>
        <p className="text-muted-foreground">
          총 {filteredServices.length}개 서비스
        </p>
      </div>

      {/* 필터 */}
      <ServiceFilters />

      {/* 서비스 목록 */}
      {filteredServices.length === 0 ? (
        <EmptyState
          type="search"
          title="조건에 맞는 서비스가 없습니다"
          description="다른 카테고리를 선택하거나 검색어를 변경해보세요"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onViewDetail={() => handleViewDetail(service)}
            />
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

      {/* 상세 모달 */}
      <ServiceDetailModal
        service={selectedService}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
