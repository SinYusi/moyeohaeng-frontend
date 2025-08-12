## 🛠 기술 스택

- Frontend: React, Vite, TypeScript, Tailwind CSS, axios, tanstack-query
- Code Convention: Prettier
- 버전 관리: Git + GitHub

## 📏 Code Convention

- Prettier를 사용하여 코드 스타일을 통일합니다.
- 모든 PR 전 npm run format 명령어로 코드 정렬을 확인합니다.

## 🌿 Branch 전략

1. dev 브랜치를 기본 개발 브랜치로 사용합니다.
2. 기능 개발 시 다음과 같이 브랜치를 생성합니다.

   ```
   feature/#{이슈 번호}-{기능 이름}
   ```

3. 작업 완료 후 dev 브랜치로 PR을 생성합니다.

📝 Commit Convention

커밋 메시지는 다음 규칙을 따릅니다.

```
타입: 제목 - #이슈번호
```

예시:

```
feat: 로그인 기능 추가 - #12
fix: 버튼 클릭 이벤트 수정 - #45
```

타입 종류

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 포맷팅, 세미콜론 누락 등 비즈니스 로직 변경 없는 경우
- refactor : 코드 리팩토링
- test : 테스트 코드 추가/수정
- chore : 빌드 업무, 패키지 매니저 설정 등
  📂 폴더 구조 (예시)

```
src
 ┣ components/    # 공용 컴포넌트
 ┣ pages/         # 페이지 컴포넌트
 ┣ hooks/         # 커스텀 훅
 ┣ stores/        # 상태 관리
 ┣ types/         # 타입 정의
 ┣ lib/           # 유틸리티, axios 설정 등
 ┣ assets/        # 이미지, 폰트
 ┗ index.css      # TailwindCSS 설정
```
