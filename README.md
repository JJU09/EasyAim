# EasyAim

FPS 입문자를 위한 **조준 학습 사이트**. 트래킹의 원리를 가이드로 이해하고,
브라우저에서 바로 따라 하며 감을 잡고, 게임별 감도 변환까지 한 곳에서 해결합니다.

## 기능

- **가이드** (`/guide`) — 트래킹 기초·마우스 그립과 자세·감도 이해하기. MDX로
  작성되며, 트래킹 가이드 안에는 라이브 연습 드릴이 임베드되어 있습니다.
- **트래킹 연습** (`/practice/tracking`) — Canvas + Pointer Lock 기반 트래킹 드릴.
  움직이는 타겟에 크로스헤어를 올려둔 시간 비율(정확도 %)로 점수를 매기고,
  최고 기록을 `localStorage`에 저장합니다.
- **감도 도구** (`/tools`)
  - 게임별 감도 변환기 (cm/360 기준)
  - cm/360 · DPI 계산기 (양방향)
  - 오버워치 줌 감도 1:1 매칭 (0% monitor distance)

## 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Zustand (설정·기록을 localStorage에 persist)
- `@next/mdx` (가이드 콘텐츠)
- Vitest (감도/엔진 순수 로직 단위 테스트)

백엔드 없이 프론트엔드만으로 동작합니다.

## 개발

```bash
npm run dev     # 개발 서버 (http://localhost:3000)
npm test        # 단위 테스트 (Vitest)
npm run build   # 프로덕션 빌드
npm run lint    # ESLint
```

## 구조

```
app/                  라우트 (홈/가이드/연습/도구)
components/
  site/               레이아웃·네비·푸터
  ui/                 버튼·카드 등 프리미티브
  tools/              감도 도구 UI
  practice/           트래킹 드릴
content/guides/       MDX 가이드 본문
lib/
  sens/               감도 변환 수식 + 게임 데이터 (+ 테스트)
  aim/                트래킹 엔진 + Pointer Lock (+ 테스트)
  guides.ts           가이드 매니페스트
store/useSettings.ts  공유 설정·최고기록 (Zustand persist)
```

## 핵심 개념: cm/360

모든 감도 계산의 기준은 **cm/360** — 360°를 도는 데 필요한 실제 마우스 이동 거리입니다.
게임이 달라도 손맛을 비교할 수 있는 공통 단위라서, 게임 간 변환은 이 값을 보존하도록
계산합니다. 게임별 `yaw`(감도 1에서 카운트당 회전 각도) 값은 `lib/sens/games.ts`에
있으며, 변환 정확도는 `lib/sens/convert.test.ts`에서 검증합니다.
