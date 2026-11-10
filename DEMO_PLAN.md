# NOL Universe PoC 진행 상태

작성일: 2026-11-02

| 단계 | 상태 | 결과 |
| --- | --- | --- |
| GitHub Pages 공개 배포 | passed | https://meteora09.github.io/nol-universe-poc/ |
| 로컬 목업 | passed | 홈, 탐색, 상세, 장바구니, 로그인/회원가입, 예약, 마이페이지 |
| PoC 사용자 | passed | 신규, 재방문, VIP, 예약 이탈 4개 계정 |
| Unified SDK 설치 | passed | `@amplitude/unified`, 단일 초기화 파일, 환경 변수 기반 활성화 |
| Braze Custom Event 택소노미 | passed | 2026-11-09 PoC project의 수집 이벤트명과 이벤트 속성을 확인. 행동 이벤트 범위는 `TAGGING_PLAN.md`에 기록 |
| Amplitude 이벤트 태깅 | passed | 목업 행동에 맞는 Braze 수집명으로 코드 연결. SDK 활성화 및 이벤트 전송 |
| 수집 검증 | passed | 로컬 목업의 상품 상세 행동 이벤트 SDK 응답 200 확인 |
| Feature Flag/Experiment | passed | `nol-poc-booking-cta` 활성, 100% 롤아웃, 50:50 변형, 상세 노출 이벤트 |
| Session Replay | configured | 100% 샘플링; 리플레이 뷰어 수집은 추가 확인 필요 |
| Guides & Surveys | configured | Unified SDK 로드; 실제 콘텐츠는 미게시 |

Amplitude Project API Key: `.env.local`에 저장. 현재 `VITE_AMPLITUDE_ENABLED=true`.
Server Zone: `US` (PoC project 화면에서 Prod US 확인).
확정 이벤트명/속성: `TAGGING_PLAN.md` 참조. 분석용 Display Name 대신 실제 수집 이벤트명과 속성명을 사용.
Flag key: `nol-poc-booking-cta`. Deployment key: 프로젝트 API 키 배포 사용.

## 남은 확인

- GitHub Pages 배포 후 실사이트에서 이벤트, Session Replay, G&S 부팅 확인
- Web Experiment과 G&S 콘텐츠가 필요하면 Amplitude에서 생성·게시
