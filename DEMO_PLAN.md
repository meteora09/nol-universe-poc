# NOL Universe PoC 진행 상태

작성일: 2026-11-02

| 단계 | 상태 | 결과 |
| --- | --- | --- |
| GitHub Pages 공개 배포 | passed | https://meteora09.github.io/nol-universe-poc/ |
| 로컬 목업 | passed | 홈, 탐색, 상세, 장바구니, 로그인/회원가입, 예약, 마이페이지 |
| PoC 사용자 | passed | 신규, 재방문, VIP, 예약 이탈 4개 계정 |
| Unified SDK 설치 | passed | `@amplitude/unified`, 단일 초기화 파일, 환경 변수 기반 비활성화 |
| Braze Custom Event 택소노미 | pending | 실제 데이터 수집 후 다운로드하여 확정 |
| Amplitude 이벤트 태깅 | pending | 택소노미 확정 후 구현 |
| 수집 검증 | pending | 태깅 후 User Lookup 및 네트워크 확인 |
| Feature Flag/Experiment | pending | 현재는 로컬 UI 미리보기만 제공 |
| Session Replay | pending | 현재 수집 꺼짐 |
| Guides & Surveys | pending | 현재는 로컬 UI 미리보기만 제공 |

Amplitude Project API Key: `.env.local`에 저장. 현재 `VITE_AMPLITUDE_ENABLED=false`.
Server Zone: `US`를 임시값으로 설정. 활성화 전에 실제 프로젝트 존 확인 필요.
확정 이벤트명/속성: 아직 없음. Braze의 실제 택소노미를 수집한 뒤 채움.
Flag key / deployment key: 아직 없음.

## 이후 작업 순서

1. 오늘 이후 Braze Custom Event 실제 수집 결과에서 이벤트명, 속성, 식별자, 값 예시를 추출한다.
2. 페이지별 태깅 표와 사용자 속성 매핑을 확정한다.
3. `src/amplitude.js`의 단일 진입점과 화면별 호출에 태깅을 추가한다.
4. 프로젝트 데이터센터와 Deployment Key를 확인하고 비활성화 스위치를 해제한다.
5. User Lookup, Session Replay, Feature Experiment exposure, Guides & Surveys 노출을 검증한다.
