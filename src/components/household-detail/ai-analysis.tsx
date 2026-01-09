'use client';

import { Sparkles, AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RiskLevel } from '@/types';

interface AIAnalysisProps {
  summary: string;
  riskLevel: RiskLevel;
  keyFindings?: string[];
  recommendations?: string[];
}

const urgencyStyles: Record<RiskLevel, { bg: string; text: string; label: string }> = {
  critical: { bg: 'bg-red-50', text: 'text-red-700', label: '즉시 대응 필요' },
  warning: { bg: 'bg-orange-50', text: 'text-orange-700', label: '빠른 대응 권장' },
  attention: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: '모니터링 필요' },
  normal: { bg: 'bg-green-50', text: 'text-green-700', label: '정상 관리' },
};

export function AIAnalysis({
  summary,
  riskLevel,
  keyFindings = [],
  recommendations = [],
}: AIAnalysisProps) {
  const urgency = urgencyStyles[riskLevel];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI 분석 결과
          </CardTitle>
          <Badge className={cn(urgency.bg, urgency.text, 'border-0')}>
            {urgency.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 종합 요약 */}
        <div className={cn('rounded-lg p-4', urgency.bg)}>
          <p className={cn('text-sm leading-relaxed', urgency.text)}>
            {summary}
          </p>
        </div>

        {/* 주요 발견 사항 */}
        {keyFindings.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-sm font-medium mb-3">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              주요 발견 사항
            </h4>
            <ul className="space-y-2">
              {keyFindings.map((finding, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-medium text-orange-700">
                    {index + 1}
                  </span>
                  {finding}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* AI 권장 사항 */}
        {recommendations.length > 0 && (
          <div>
            <h4 className="flex items-center gap-2 text-sm font-medium mb-3">
              <Lightbulb className="h-4 w-4 text-blue-500" />
              AI 권장 조치
            </h4>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                    {index + 1}
                  </span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 분석 신뢰도 */}
        <div className="flex items-center justify-between pt-4 border-t text-xs text-muted-foreground">
          <span>AI 분석 엔진 v2.1</span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            분석 신뢰도 87%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
