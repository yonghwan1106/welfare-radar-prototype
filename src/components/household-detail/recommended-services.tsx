'use client';

import { ExternalLink, Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { ServiceRecommendation } from '@/types';

interface RecommendedServicesProps {
  recommendations: ServiceRecommendation[];
  onLinkService?: (serviceId: string) => void;
}

export function RecommendedServices({
  recommendations,
  onLinkService,
}: RecommendedServicesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI 추천 서비스
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            추천 서비스가 없습니다
          </p>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={rec.serviceId}
                className={cn(
                  'rounded-lg border p-4 transition-colors',
                  rec.isLinked ? 'bg-green-50 border-green-200' : 'hover:bg-muted/50'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                        {index + 1}
                      </span>
                      <h4 className="font-medium">{rec.serviceName}</h4>
                      {rec.isLinked && (
                        <Badge className="bg-green-100 text-green-700 border-0">
                          <Check className="h-3 w-3 mr-1" />
                          연계됨
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {rec.reason}
                    </p>

                    {/* 적합도 */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">적합도</span>
                      <Progress value={rec.matchScore} className="h-2 flex-1 max-w-[120px]" />
                      <span className="text-sm font-medium">{rec.matchScore}%</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {!rec.isLinked ? (
                      <Button
                        size="sm"
                        onClick={() => onLinkService?.(rec.serviceId)}
                      >
                        연계하기
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        연계 완료
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      상세보기
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
