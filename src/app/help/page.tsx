'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  HelpCircle,
  Book,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
  Video,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    category: '기본 사용법',
    question: '위기가구 등록은 어떻게 하나요?',
    answer: '위기가구 메뉴에서 우측 상단의 "가구 등록" 버튼을 클릭하면 새로운 위기가구를 등록할 수 있습니다. 필수 정보를 입력하고 저장하면 자동으로 AI 분석이 시작됩니다.',
  },
  {
    id: '2',
    category: '기본 사용법',
    question: 'AI 위험도 분석은 어떻게 작동하나요?',
    answer: 'AI 위험도 분석은 가구의 다양한 정보(경제, 건강, 주거, 사회적 관계, 복지 이력)를 종합하여 위험도를 자동으로 산출합니다. 분석 결과는 레이더 차트로 시각화되며, 각 영역별 상세 점수를 확인할 수 있습니다.',
  },
  {
    id: '3',
    category: '복지서비스',
    question: '복지서비스 추천은 어떻게 받나요?',
    answer: '각 위기가구 상세 페이지에서 AI가 분석한 위험 요소를 기반으로 적합한 복지서비스를 자동으로 추천해 드립니다. 추천된 서비스는 바로 연계 신청이 가능합니다.',
  },
  {
    id: '4',
    category: '복지서비스',
    question: '서비스 연계 이력은 어디서 확인하나요?',
    answer: '위기가구 상세 페이지의 "서비스 연계 이력" 탭에서 해당 가구에 연계된 모든 복지서비스 이력을 확인할 수 있습니다. 연계 날짜, 담당자, 진행 상태 등의 정보가 제공됩니다.',
  },
  {
    id: '5',
    category: '통계/분석',
    question: '통계 데이터는 어떻게 내보내나요?',
    answer: '통계 페이지에서 원하는 차트 또는 데이터의 우측 상단 "내보내기" 버튼을 클릭하면 Excel, PDF 등 다양한 형식으로 데이터를 내보낼 수 있습니다.',
  },
  {
    id: '6',
    category: '계정/보안',
    question: '비밀번호를 변경하고 싶어요.',
    answer: '설정 > 보안 설정에서 비밀번호를 변경할 수 있습니다. 현재 비밀번호 입력 후 새 비밀번호를 설정하세요. 비밀번호는 8자 이상, 영문+숫자+특수문자를 포함해야 합니다.',
  },
];

const guides = [
  { title: '시작하기 가이드', icon: Book, description: '복지 레이더 기본 사용법', badge: 'PDF' },
  { title: '위기가구 관리 매뉴얼', icon: FileText, description: '가구 등록 및 관리 방법', badge: 'PDF' },
  { title: 'AI 분석 이해하기', icon: HelpCircle, description: 'AI 위험도 분석 설명', badge: 'PDF' },
  { title: '사용법 동영상', icon: Video, description: '5분만에 배우는 복지 레이더', badge: 'VIDEO' },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.includes(searchQuery) || faq.answer.includes(searchQuery);
    const matchesCategory = selectedCategory === '전체' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold">도움말</h2>
        <p className="text-muted-foreground">복지 레이더 사용에 관한 도움말과 자료를 제공합니다</p>
      </div>

      {/* 검색 */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="궁금한 내용을 검색하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* FAQ */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">자주 묻는 질문</CardTitle>
              <CardDescription>자주 문의되는 질문과 답변입니다</CardDescription>
              <div className="flex flex-wrap gap-2 pt-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredFAQs.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">검색 결과가 없습니다</p>
              ) : (
                filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          {faq.category}
                        </Badge>
                        <span className="font-medium text-sm">{faq.question}</span>
                      </div>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-4 pb-4 pt-2 bg-muted/30 border-t">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="space-y-4">
          {/* 가이드 문서 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">가이드 문서</CardTitle>
              <CardDescription>상세한 사용 설명서</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {guides.map((guide, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left"
                >
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg',
                    guide.badge === 'VIDEO' ? 'bg-red-100' : 'bg-blue-100'
                  )}>
                    <guide.icon className={cn(
                      'h-5 w-5',
                      guide.badge === 'VIDEO' ? 'text-red-600' : 'text-blue-600'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{guide.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{guide.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {guide.badge}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* 문의하기 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">문의하기</CardTitle>
              <CardDescription>추가 도움이 필요하신가요?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <span>채팅 상담</span>
                <Badge className="ml-auto bg-green-100 text-green-700 text-xs">온라인</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>전화 상담</span>
                <span className="ml-auto text-xs text-muted-foreground">1588-0000</span>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Mail className="h-4 w-4 text-purple-600" />
                <span>이메일 문의</span>
                <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground" />
              </Button>
            </CardContent>
          </Card>

          {/* 운영 시간 */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium">고객센터 운영시간</p>
                <p className="text-xs text-muted-foreground">
                  평일 09:00 - 18:00<br />
                  (점심시간 12:00 - 13:00)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
