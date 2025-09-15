# 🎯 8-bit

> 협업 기반 여행 계획 플랫폼

팀과 함께 여행을 계획하고, 실시간으로 소통하며, 효율적으로 일정을 관리할 수 있는 현대적인 웹 애플리케이션입니다.

## ✨ 주요 기능

- 🔐 **사용자 인증**: 소셜 로그인(카카오) 및 일반 회원가입
- 👥 **팀 관리**: 팀 생성, 멤버 초대, 권한 관리
- 📊 **프로젝트 대시보드**: 프로젝트 생성, 수정, 삭제 및 통계
- 🗺️ **지도 기반 여행 계획**: 카카오맵 연동 장소 검색 및 일정 관리
- 💬 **실시간 협업**: SSE를 통한 실시간 댓글 및 업데이트
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 지원

## 🛠 기술 스택

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **스타일링**: TailwindCSS
- **상태관리**: Zustand
- **라우팅**: React Router v7
- **API 통신**: Axios
- **지도**: React Kakao Maps SDK
- **애니메이션**: Framer Motion
- **실시간 통신**: Server-Sent Events (SSE)

### Development
- **Code Convention**: ESLint + Prettier
- **버전 관리**: Git + GitHub
- **배포**: Vercel

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/8-bit.git
cd 8-bit

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_KAKAO_APP_KEY=your_kakao_map_api_key
```

## 📂 프로젝트 구조

```
src/
├── 📁 components/     # UI 컴포넌트
│   ├── 📁 common/     # 공통 컴포넌트
│   ├── 📁 dashboard/  # 대시보드 컴포넌트
│   ├── 📁 plan/       # 여행 계획 컴포넌트
│   ├── 📁 global/     # 전역 컴포넌트
│   └── 📁 layouts/    # 레이아웃 컴포넌트
├── 📁 pages/          # 페이지 컴포넌트
├── 📁 hooks/          # 커스텀 React 훅
├── 📁 stores/         # 상태 관리 (Zustand)
├── 📁 service/        # API 서비스
├── 📁 types/          # TypeScript 타입 정의
├── 📁 utils/          # 유틸리티 함수
├── 📁 assets/         # 정적 자산
└── 📁 styles/         # 스타일 파일
```

## 🌿 개발 워크플로우

### Branch 전략

- `main`: 프로덕션 브랜치
- `dev`: 개발 브랜치 (기본)
- `feature/#{이슈번호}-{기능이름}`: 기능 개발 브랜치

### Commit Convention

```
타입: 제목 - #이슈번호
```

**타입 종류:**
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드
- `chore`: 빌드/패키지 관리

**예시:**
```bash
feat: 로그인 기능 추가 - #12
fix: 버튼 클릭 이벤트 수정 - #45
```

### Code Convention

- **ESLint + Prettier**를 사용하여 코드 스타일 통일
- PR 전 `npm run lint` 실행 필수
- 컴포넌트명은 PascalCase 사용
- 파일명은 PascalCase (컴포넌트) 또는 camelCase (유틸리티) 사용

## 📝 스크립트

```bash
npm run dev        # 개발 서버 실행
npm run build      # 프로덕션 빌드
npm run preview    # 빌드 결과 미리보기
npm run lint       # ESLint 검사
```

## 🚀 배포

이 프로젝트는 **Vercel**을 통해 배포됩니다.

### 자동 배포
- `main` 브랜치에 push하면 자동으로 프로덕션 배포
- PR 생성 시 프리뷰 배포 자동 생성
- 실시간 로그 및 배포 상태 확인 가능

### 수동 배포

```bash
# Vercel CLI 설치 (최초 1회)
npm install -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 배포 설정

프로젝트에는 `vercel.json` 파일이 포함되어 있어 SPA 라우팅을 지원합니다:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 환경 변수 설정 (Vercel)

Vercel 대시보드에서 다음 환경 변수를 설정해야 합니다:

1. Vercel 프로젝트 설정으로 이동
2. **Environment Variables** 탭 클릭
3. 다음 변수들 추가:
   ```
   VITE_API_BASE_URL=your_production_api_url
   VITE_KAKAO_APP_KEY=your_kakao_map_api_key
   ```

### 배포 상태 확인

배포 후 다음을 확인하세요:
- ✅ 모든 페이지가 정상적으로 로드되는지
- ✅ API 연결이 정상적으로 작동하는지  
- ✅ 카카오맵이 정상적으로 표시되는지
- ✅ 라우팅이 올바르게 작동하는지

## 🔧 주요 의존성

```json
{
  "react": "^19.1.1",
  "typescript": "~5.8.3",
  "vite": "^7.1.0",
  "tailwindcss": "^4.1.12",
  "zustand": "^5.0.7",
  "react-kakao-maps-sdk": "^1.2.0",
  "framer-motion": "^12.23.12"
}
```

## 🤝 기여하기

1. 이 저장소를 Fork 합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

**Made with ❤️ by 8-bit Team**
