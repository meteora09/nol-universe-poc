# NOL Universe PoC 웹 목업

NOL의 홈페이지 정보 구조를 참고해 만든 로컬 체험용 웹 목업입니다. 실제 NOL 서비스와 연결되지 않으며 상품, 가격, 예약은 모두 예시입니다. 숙소·티켓·레저·항공 탐색, 검색, 찜, 장바구니, 로그인, 회원가입, 예약 완료, 마이페이지를 사용할 수 있습니다.

## 실행

Node.js 18 이상이 필요합니다.

```bash
npm install
npm run dev
```

터미널에 표시된 `http://127.0.0.1:5173/`을 여세요. `npm run build`로 정적 빌드를 만들 수 있습니다. 사진은 `public/media`에 저장되어 있어 실행 중 인터넷 연결이 필요하지 않습니다.

## PoC 계정

로그인 화면의 **PoC 시나리오 계정**을 누르면 바로 전환됩니다. 직접 로그인할 때의 공통 비밀번호는 `demo1234`입니다.

| 시나리오 | 이메일 | 특성 |
| --- | --- | --- |
| 신규 탐색 | `new@nol-poc.test` | BASIC, 첫 예약 |
| 재방문 | `repeat@nol-poc.test` | SILVER, 누적 이용 480,000원 |
| VIP | `vip@nol-poc.test` | GOLD, 누적 이용 5,200,000원 |
| 예약 이탈 | `dropoff@nol-poc.test` | BASIC, 체크아웃 이탈 테스트 |

상단의 **PoC 시나리오**에서 예약 버튼의 Control/Treatment 화면을 바꾸고 가이드·설문 미리보기를 켜거나 끌 수 있습니다. 이 스위치는 화면 미리보기일 뿐 실제 Amplitude Feature Flag/Experiment가 아닙니다.

## 저장 범위

회원가입, 로그인 상태, 찜, 장바구니, 최근 본 상품, 예약, 설문 응답, 시나리오 설정은 `localStorage`의 `nol-poc-v1`에 저장됩니다. 브라우저 저장소를 지우거나 다른 브라우저를 사용하면 데이터가 공유되지 않습니다. 데모용 비밀번호도 로컬에 저장되므로 실제 사용하는 비밀번호를 입력하지 마세요. 실제 결제나 발권은 없습니다.

## Amplitude 준비 상태

`@amplitude/unified`가 설치되어 있고 초기화 진입점은 `src/amplitude.js` 한 곳입니다. `.env.local`에 프로젝트 API 키가 설정되어 있지만 `VITE_AMPLITUDE_ENABLED=false`이므로 **`initAll()`을 호출하지 않습니다.** 자동 수집, Session Replay, Feature Experiment, Guides & Surveys 요청과 이벤트 전송이 모두 비활성화된 상태입니다. `track()` 호출도 없습니다. 로그인·회원가입·로그아웃에 필요한 `setUserId`, `identify`, `reset` 코드는 나중에 활성화될 때만 실행됩니다.

Braze Custom Event의 실제 택소노미가 수집된 뒤 이벤트명/속성 표를 확정하고 각 화면에 태깅하세요. 데이터센터(US/EU), Experiment deployment key, Session Replay 샘플링, Guides & Surveys 배포 설정도 확인해야 합니다. **`VITE_AMPLITUDE_ENABLED=true`로 바꾸는 즉시 SDK 자동 수집과 네트워크 요청이 시작됩니다.** 그 전에 택소노미와 프로젝트 설정을 검증하세요.

## 참고

- [NOL 공식 홈페이지](https://nol.yanolja.com/)의 검색, 내비게이션, 프로모션 배너, 카테고리 및 추천 상품 흐름을 참고했습니다.
- 예시 사진: Unsplash (`public/media`에 포함)
- [Amplitude Unified SDK 공식 문서](https://amplitude.com/docs/sdks/analytics/browser/browser-unified-sdk/get-started)

## GitHub Pages 배포

[공개 사이트](https://meteora09.github.io/nol-universe-poc/)는 [meteora09/nol-universe-poc](https://github.com/meteora09/nol-universe-poc) 저장소의 `main` 브랜치를 GitHub Actions로 빌드해 배포합니다. `.github/workflows/deploy.yml`이 `npm ci`와 Vite 빌드를 실행합니다. 배포 빌드에서도 `VITE_AMPLITUDE_ENABLED=false`로 고정되어 있습니다.

`.env.local`, `node_modules`, `dist`는 `.gitignore`로 저장소에서 제외됩니다. 브라우저에 저장된 예약과 회원 데이터도 저장소에 포함되지 않습니다.
