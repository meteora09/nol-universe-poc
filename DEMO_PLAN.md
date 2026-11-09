# NOL Universe PoC 진행 상태

작성일: 2026-11-02

| 단계 | 상태 | 결과 |
| --- | --- | --- |
| GitHub Pages 공개 배포 | passed | https://meteora09.github.io/nol-universe-poc/ |
| 로컬 목업 | passed | 홈, 탐색, 상세, 장바구니, 로그인/회원가입, 예약, 마이페이지 |
| PoC 사용자 | passed | 신규, 재방문, VIP, 예약 이탈 4개 계정 |
| Unified SDK 설치 | passed | `@amplitude/unified`, 단일 초기화 파일, 환경 변수 기반 비활성화 |
| Braze Custom Event 택소노미 | passed | 2026-11-09 PoC project의 수집 이벤트명과 이벤트 속성을 확인. 행동 이벤트 범위는 `TAGGING_PLAN.md`에 기록 |
| Amplitude 이벤트 태깅 | passed | 목업 행동에 맞는 Braze 수집명으로 코드 연결. SDK는 비활성화되어 전송 없음 |
| 수집 검증 | pending | 태깅 후 User Lookup 및 네트워크 확인 |
| Feature Flag/Experiment | pending | 현재는 로컬 UI 미리보기만 제공 |
| Session Replay | pending | 현재 수집 꺼짐 |
| Guides & Surveys | pending | 현재는 로컬 UI 미리보기만 제공 |

Amplitude Project API Key: `.env.local`에 저장. 현재 `VITE_AMPLITUDE_ENABLED=false`.
Server Zone: `US`를 임시값으로 설정. 활성화 전에 실제 프로젝트 존 확인 필요.
확정 이벤트명/속성: `TAGGING_PLAN.md` 참조. 분석용 Display Name 대신 실제 수집 이벤트명과 속성명을 사용.
Flag key / deployment key: 아직 없음.

## 이후 작업 순서

1. 프로젝트 API 키와 데이터센터가 PoC project에 대응하는지 확인한다.
2. 실제 전송을 켜기 전에 목업의 예시 예약이 프로젝트 데이터와 섞이는 범위를 검토한다.
3. 수집을 승인한 뒤 SDK 스위치를 켜고 User Lookup, 이벤트 속성, Session Replay를 검증한다.
4. Feature Experiment와 Guides & Surveys 배포 설정을 별도로 확인한다.
