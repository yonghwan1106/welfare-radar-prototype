'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Users,
  FileText,
  Clock,
  ChevronRight,
  X,
  History,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { households, welfareServices } from '@/lib/mock-data';
import type { RiskLevel } from '@/types';

type SearchCategory = 'all' | 'households' | 'services';

interface SearchResult {
  id: string;
  type: 'household' | 'service';
  title: string;
  subtitle: string;
  link: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const recentSearches = ['긴급가구', '노인돌봄', '에너지바우처', '한부모'];

const riskLevelConfig: Record<RiskLevel, { label: string; variant: 'destructive' | 'secondary' | 'outline' }> = {
  critical: { label: '긴급', variant: 'destructive' },
  warning: { label: '주의', variant: 'secondary' },
  attention: { label: '관심', variant: 'outline' },
  normal: { label: '정상', variant: 'outline' },
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const [isFocused, setIsFocused] = useState(false);

  // 검색 결과 생성
  const searchResults = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];

    // 가구 검색
    if (category === 'all' || category === 'households') {
      households
        .filter(h =>
          h.name.includes(query) ||
          h.address.district.includes(query) ||
          h.address.dong.includes(query) ||
          h.householdType.includes(query)
        )
        .forEach(h => {
          const riskConfig = riskLevelConfig[h.riskLevel];
          const addressStr = `${h.address.district} ${h.address.dong}`;
          results.push({
            id: h.id,
            type: 'household',
            title: h.name,
            subtitle: `${addressStr} · ${h.householdType}`,
            link: `/households/${h.id}`,
            badge: riskConfig.label,
            badgeVariant: riskConfig.variant,
          });
        });
    }

    // 서비스 검색
    if (category === 'all' || category === 'services') {
      welfareServices
        .filter(s =>
          s.name.includes(query) ||
          s.description.includes(query) ||
          s.category.includes(query)
        )
        .forEach(s => {
          results.push({
            id: s.id,
            type: 'service',
            title: s.name,
            subtitle: s.description.slice(0, 50) + '...',
            link: '/services',
            badge: s.category,
            badgeVariant: 'secondary',
          });
        });
    }

    return results;
  }, [query, category]);

  const householdResults = searchResults.filter(r => r.type === 'household');
  const serviceResults = searchResults.filter(r => r.type === 'service');

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold">검색</h2>
        <p className="text-muted-foreground">위기가구와 복지서비스를 검색합니다</p>
      </div>

      {/* 검색 입력 */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="가구명, 주소, 서비스명 등을 입력하세요..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="w-full h-14 pl-12 pr-12 rounded-xl border border-border bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* 카테고리 필터 */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">분류:</span>
            {[
              { value: 'all', label: '전체' },
              { value: 'households', label: '위기가구' },
              { value: 'services', label: '복지서비스' },
            ].map((cat) => (
              <Button
                key={cat.value}
                variant={category === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategory(cat.value as SearchCategory)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 검색 결과 또는 추천 */}
      {query ? (
        <div className="space-y-6">
          {/* 결과 요약 */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">&quot;{query}&quot;</span> 검색 결과{' '}
              <span className="font-medium text-foreground">{searchResults.length}</span>건
            </p>
          </div>

          {searchResults.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-muted-foreground">검색 결과가 없습니다</p>
                <p className="text-sm text-muted-foreground/70 mt-1">다른 검색어를 입력해보세요</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* 위기가구 결과 */}
              {(category === 'all' || category === 'households') && householdResults.length > 0 && (
                <Card>
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 p-4 border-b">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">위기가구</span>
                      <Badge variant="secondary">{householdResults.length}</Badge>
                    </div>
                    <div className="divide-y">
                      {householdResults.slice(0, 5).map((result) => (
                        <Link
                          key={result.id}
                          href={result.link}
                          className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{result.title}</span>
                              {result.badge && (
                                <Badge variant={result.badgeVariant}>
                                  {result.badge === '긴급' && <AlertTriangle className="h-3 w-3 mr-1" />}
                                  {result.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{result.subtitle}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                    {householdResults.length > 5 && (
                      <div className="p-4 border-t">
                        <Button variant="ghost" className="w-full">
                          {householdResults.length - 5}건 더 보기
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* 복지서비스 결과 */}
              {(category === 'all' || category === 'services') && serviceResults.length > 0 && (
                <Card>
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 p-4 border-b">
                      <FileText className="h-5 w-5 text-green-600" />
                      <span className="font-medium">복지서비스</span>
                      <Badge variant="secondary">{serviceResults.length}</Badge>
                    </div>
                    <div className="divide-y">
                      {serviceResults.slice(0, 5).map((result) => (
                        <Link
                          key={result.id}
                          href={result.link}
                          className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{result.title}</span>
                              {result.badge && (
                                <Badge variant={result.badgeVariant}>{result.badge}</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{result.subtitle}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                    {serviceResults.length > 5 && (
                      <div className="p-4 border-t">
                        <Button variant="ghost" className="w-full">
                          {serviceResults.length - 5}건 더 보기
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* 최근 검색어 */}
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center gap-2 p-4 border-b">
                <History className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">최근 검색어</span>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuery(search)}
                      className="gap-2"
                    >
                      <Clock className="h-3 w-3" />
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 인기 검색어 */}
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center gap-2 p-4 border-b">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">인기 검색어</span>
              </div>
              <div className="divide-y">
                {['긴급복지지원', '노인돌봄서비스', '에너지바우처', '기초생활수급', '한부모가정'].map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(term)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <span className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold',
                      index < 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    )}>
                      {index + 1}
                    </span>
                    <span className="font-medium">{term}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
