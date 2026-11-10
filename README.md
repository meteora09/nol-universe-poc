# NOL Universe PoC 웹 목업

NOL의 홈페이지 정보 구조를 참고해 만든 로컬 체험용 웹 목업입니다. 실제 NOL 서비스와 연결되지 않으며 상품, 가격, 예약은 모두 예시입니다. 숙소·티켓·레저·항공 탐색, 검색, 찜, 장바구니, 로그인, 회원가입, 예약 완료, 마이페이지를 사용할 수 있습니다. 쿠폰·혜택 화면에서 국내여행·해외여행·티켓 혜택을 탐색하고 쿠폰을 받을 수 있습니다. 상단의 전체 카테고리는 메뉴로 열리며, 티켓 홈에는 배너 캐러셀과 장르별 랭킹, 오픈 예정, 할인 상품이 있습니다. 뮤지컬·콘서트 등 장르를 누르면 원본의 장르 전용 탐색 흐름을 참고한 화면으로 이동하며, 배너와 섹션 이동, 오픈 예정, 할인, 일간 랭킹, 지역 추천, 테마, 세부 장르별 둘러보기를 체험할 수 있습니다. 호텔/리조트 등 여행 카테고리는 원본의 지역 선택 흐름을 참고해 광역 지역과 세부 지역을 고르고 상품을 살펴볼 수 있습니다. 지역별 상품은 PoC용 예시 데이터입니다.

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

상단의 **PoC 시나리오**에서 예약 버튼의 Control/Treatment 화면을 바꾸고 가이드·설문 미리보기를 켜거나 끌 수 있습니다. Amplitude 배정은 Feature Experiment deployment key와 flag key가 설정되면 적용됩니다. Control/Treatment 미리보기는 로컬 화면 전환입니다.

### Amplitude User ID·Device ID로 여정 시작

**PoC 시나리오 → Amplitude ID로 시작**에서 **User ID**와 **Device ID** 중 하나 또는 둘 다 붙여넣고 목업용 데모 시나리오를 선택하세요. Amplitude ID 숫자값은 입력 대상이 아닙니다. 기존 사용자를 조회하거나 실제 프로필을 복제하지 않습니다. 선택한 시나리오는 화면과 로컬 예약 데이터의 시작값에만 적용됩니다. 입력한 User ID는 `setUserId`, Device ID는 `setDeviceId`에 적용됩니다. Device ID만 입력하면 SDK에는 User ID를 설정하지 않아 익명 디바이스로 취급합니다. 가상의 시나리오 속성으로 기존 Amplitude 프로필을 덮어쓰지 않습니다. Amplitude 행동 이벤트와 자동 수집은 활성화되어 있습니다.

기본 선택인 **장바구니·찜·최근 본 상품을 비우고 시작**을 해제하면 같은 User ID 또는 Device ID의 이전 로컬 여정을 이어서 체험할 수 있습니다. 로컬 여정은 User ID가 있으면 User ID별로, Device ID만 있으면 Device ID별로 저장됩니다. 제어판에서 적용된 두 ID, SDK 상태, 화면, 데이터 개수를 확인하고 비밀번호나 API 키를 제외한 디버그 정보를 복사할 수 있습니다. **현재 사용자 여정 초기화**는 해당 ID의 로컬 데이터만 지우고, **전체 PoC 데이터 초기화**는 브라우저의 모든 목업 데이터를 지웁니다.

## 저장 범위

회원가입, 로그인 상태, 계정별 받은 쿠폰, 찜, 장바구니, 최근 본 상품, 예약, 설문 응답, 시나리오 설정은 `localStorage`의 `nol-poc-v1`에 저장됩니다. 브라우저 저장소를 지우거나 다른 브라우저를 사용하면 데이터가 공유되지 않습니다. 데모용 비밀번호도 로컬에 저장되므로 실제 사용하는 비밀번호를 입력하지 마세요. 실제 결제나 발권은 없습니다.

## Amplitude 수집 및 실험

`@amplitude/unified`로 PoC project에 행동 이벤트를 전송합니다. Autocapture의 attribution, page views, sessions, form interactions, file downloads, page URL enrichment, element interactions, frustration interactions, network tracking, web vitals, performance tracking을 켰습니다. Session Replay는 PoC 확인을 위해 100% 샘플링하고 Guides & Surveys SDK도 로드합니다. Web Experiment 전용 스크립트는 빌드 시 `<head>`에 삽입됩니다.

검색·상세·찜·장바구니·예약·회원가입은 실제 Braze 수집명으로 전송합니다. [태깅 계획](TAGGING_PLAN.md)에 이벤트별 속성과 발생 시점, 제외한 CRM 이벤트를 기록했습니다. 제어판의 **최근 행동 태깅**에서 이벤트별 SDK 전송 결과를 확인할 수 있습니다. 예시 행동 데이터는 Braze 데이터와 같은 프로젝트에 들어갑니다. 로컬 예약·쿠폰·회원 데이터는 계속 브라우저에만 저장됩니다.

Feature Experiment의 `nol-poc-booking-cta` 플래그를 PoC project에 생성하고 프로젝트 API 키 배포에 연결해 활성화했습니다. 모든 사용자에게 100% 롤아웃하며 `control`/`treatment`를 50:50으로 배정합니다. 예약 버튼은 이 배정 결과를 사용하고, 상세 화면에서 실제 노출될 때 노출 이벤트를 기록합니다. 제어판에서 로컬 미리보기로 전환할 수도 있습니다. 별도의 client deployment key를 사용하려면 GitHub 저장소 변수 `AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY`를 설정하세요. Web Experiment·가이드·설문 콘텐츠는 Amplitude 프로젝트에서 별도로 생성·게시해야 노출됩니다.

## 참고

- [NOL 공식 홈페이지](https://nol.yanolja.com/), [호텔/리조트 화면](https://nol.yanolja.com/sub-home/hotel?verticalCategory=LOCAL_ACCOMMODATION&verticalSubCategory=HOTEL), [티켓 화면](https://nol.yanolja.com/ticket), [뮤지컬 장르 화면](https://nol.yanolja.com/ticket/genre/musical), [쿠폰·혜택 화면](https://nol.yanolja.com/benefit?category=BENEFIT_HOME)의 검색, 내비게이션, 프로모션 배너, 카테고리 및 추천 상품 흐름을 참고했습니다.
- 예시 사진: Unsplash (`public/media`에 포함)
- [Amplitude Unified SDK 공식 문서](https://amplitude.com/docs/sdks/analytics/browser/browser-unified-sdk/get-started)

## GitHub Pages 배포

[공개 사이트](https://meteora09.github.io/nol-universe-poc/)는 [meteora09/nol-universe-poc](https://github.com/meteora09/nol-universe-poc) 저장소의 `main` 브랜치를 GitHub Actions로 빌드해 배포합니다. `.github/workflows/deploy.yml`이 `npm ci`와 Vite 빌드를 실행합니다. 배포 빌드에는 PoC 프로젝트 API 키와 `VITE_AMPLITUDE_ENABLED=true`가 설정됩니다.

`.env.local`, `node_modules`, `dist`는 `.gitignore`로 저장소에서 제외됩니다. 브라우저에 저장된 예약과 회원 데이터도 저장소에 포함되지 않습니다.
