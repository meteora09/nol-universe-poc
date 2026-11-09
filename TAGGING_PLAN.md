# Nol Universe PoC 행동 태깅 계획

출처: Amplitude `nol-universe-839801` 조직의 `PoC project` (project ID `896951`), 2026-11-09 기본 브랜치의 이벤트·이벤트 속성 구성. 아래 이름은 차트에 보이는 표시 이름이 아닌 **수집 이벤트명**과 **수집 속성명**이다. Braze에서 가져온 기존 수집명은 `[Appboy] [Custom Event]` 접두사, 커스텀 속성은 `[Custom event property]` 접두사를 포함한다. 대소문자도 그대로 유지한다.

| 수집 이벤트명 | 사용 속성 | 발생 시점 | 방식 |
| --- | --- | --- | --- |
| `[Appboy] [Custom Event] Search` | `keyword`, `category_name`(카테고리 지역 선택 시) | 검색어를 제출하거나 여행 카테고리에서 지역을 확정할 때 | Custom |
| `[Appboy] [Custom Event] click_product_detail` | `property_id`, `property_name`, `category_id`, `category_name`, `property_price`, `city_name`, `subcategory`(있을 때) | 항공·국내교통 외 상품 상세를 열 때 | Custom |
| `[Appboy] [Custom Event] click_flight_detail` | `platform` | 항공 상품 상세를 열 때 | Custom |
| `[Appboy] [Custom Event] click_trans_detail` | `category_id`, `category_name`, `property_price` | 국내교통 상품 상세를 열 때 | Custom |
| `[Appboy] [Custom Event] add_to_favorite` | `property_id`, `property_name`, `category_id`, `category_name`, `city_name` | 국내/해외 상품 찜 추가 시 | Custom |
| `[Appboy] [Custom Event] add_to_favorite_enter` / `undo_add_to_favorite_enter` | `property_id`, `property_name` 및 추가 시 `category_id`, `category_name`, `subcategory` | 엔터 티켓 찜 추가 / 취소 시 | Custom |
| `[Appboy] [Custom Event] click_cart_Intro` | `cart_amount`, `cart_category`, `cart_category_cnt` | 상단 장바구니를 열 때 | Custom |
| `[Appboy] [Custom Event] click_order_Intro` | `item_id`, `item_name`, `category_id`, `reserve_price`, `check_in_date` | 국내/해외숙소·레저·투어·국내교통 예약 확인 화면에 진입할 때 | Custom |
| `[Appboy] [Custom Event] click_booking_cta` | `property_id`, `property_name`, `category_id`, `category_name`, `subcategory` | 엔터 티켓 예약 확인 화면에 진입할 때 | Custom |
| `[Appboy] [Custom Event] click_flight_orderintro` | `departure_date`, `cust_count` | 항공 예약 확인 화면에 진입할 때 | Custom |
| `[Appboy] [Custom Event] composition_order_complete` / `composite_order_complete` / `composite_tna_ordercomplete` / `composite_enter_ordercomplete` / `composite_flight_ordercomplete` | 해당 이벤트에 정의된 `composite_order_id`, `item_id`, `item_name`, `paid_amount`, `cust_count`, `check_in_date` 중 실제 목업에 있는 값만 | 로컬 예약 완료 버튼으로 예약이 확정될 때. 복합 장바구니는 상품별로 해당 카테고리 이벤트를 한 번씩 기록 | Custom |
| `[Appboy] [Custom Event] signup_done` | `join_date` | 로컬 회원가입 검증과 저장이 완료될 때 | Custom |
| `[Amplitude] Page Viewed`, 세션 이벤트 | SDK 자동 속성 | SDK 활성화 후 실제 페이지 로드·세션에서 자동 수집 | Autocapture |

모든 커스텀 이벤트에는 프로젝트에 존재하는 `platform: web` 속성을 더한다. 속성 표의 짧은 이름은 실제 코드에서 `[Custom event property] ` 접두사를 붙인다. 값이 없는 필드는 보내지 않는다. 목업의 상품 ID, 카테고리명, 예약번호, 가격은 시뮬레이션 값이므로 실서비스 값으로 해석하지 않는다.

장바구니 상품 **추가**, 일반 상품 **찜 취소**, 일반 **쿠폰 받기**, 티켓 장르 필터에는 의미가 맞는 기존 수집 이벤트가 없어 태깅하지 않는다. `download_membership_coupon`은 멤버십 쿠폰 전용이므로 일반 쿠폰에 사용하지 않는다. Braze 캠페인 발송·노출·오픈·전환, 푸시, Canvas, 앱 세션 이벤트는 이 웹 목업에서 생성하지 않는다. 실제 결제 단계가 없으므로 항공 `click_flight_payment`도 생성하지 않는다.

SDK는 현재 로컬과 GitHub Pages에서 꺼져 있다. PoC 시나리오 제어판의 최근 행동 태깅 미리보기는 이 탭의 메모리에만 최대 20건을 보관하며 새로고침하면 사라진다. 태깅 호출은 코드에 연결되어 있으나 이벤트 전송이나 수집 검증은 아직 하지 않았다.
