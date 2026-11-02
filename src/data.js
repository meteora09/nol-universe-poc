export const personas = [
  { id:'poc-new', email:'new@nol-poc.test', password:'demo1234', name:'신규 탐색 고객', tier:'BASIC', signupDate:'2026-10-28', lifetimeSpend:0, persona:'new', blurb:'첫 탐색 → 첫 예약' },
  { id:'poc-repeat', email:'repeat@nol-poc.test', password:'demo1234', name:'재방문 고객', tier:'SILVER', signupDate:'2025-11-02', lifetimeSpend:480000, persona:'repeat', blurb:'재방문 → 장바구니 → 예약' },
  { id:'poc-vip', email:'vip@nol-poc.test', password:'demo1234', name:'VIP 고객', tier:'GOLD', signupDate:'2023-11-02', lifetimeSpend:5200000, persona:'vip', blurb:'VIP 혜택 → 프리미엄 예약' },
  { id:'poc-dropoff', email:'dropoff@nol-poc.test', password:'demo1234', name:'예약 이탈 고객', tier:'BASIC', signupDate:'2026-09-15', lifetimeSpend:0, persona:'dropoff', blurb:'예약 단계 이탈 실험' },
];
export const categories = [
  {id:'hotel',label:'호텔/리조트',icon:'Building2'}, {id:'pension',label:'펜션/풀빌라',icon:'House'},
  {id:'leisure',label:'국내레저',icon:'FerrisWheel'}, {id:'ticket',label:'NOL 티켓',icon:'Ticket'},
  {id:'flight',label:'항공',icon:'Plane'}, {id:'global',label:'해외숙소',icon:'Globe2'},
  {id:'tour',label:'해외투어티켓',icon:'Camera'}, {id:'transport',label:'국내교통',icon:'TrainFront'},
];
export const products = [
  {id:'jeju-ocean', category:'hotel', title:'제주 오션뷰 스테이', subtitle:'제주 서귀포 · 바다 앞 감성 숙소', price:128000, original:184000, discount:30, rating:4.9, reviews:1284, badge:'오늘의 특가', image:import.meta.env.BASE_URL+'media/photo-1571896349842-33c89424de2d.jpg', tags:['조식 가능','무료 취소'], region:'제주'},
  {id:'seoul-hotel', category:'hotel', title:'서울 시티 호텔', subtitle:'서울 중구 · 도심 속 편안한 휴식', price:96000, original:160000, discount:40, rating:4.8, reviews:986, badge:'인기', image:import.meta.env.BASE_URL+'media/photo-1566073771259-6a8506099945.jpg', tags:['역세권','조식 가능'], region:'서울'},
  {id:'busan-bay', category:'hotel', title:'부산 베이 리조트', subtitle:'부산 해운대 · 파노라마 오션뷰', price:219000, original:310000, discount:29, rating:4.9, reviews:734, badge:'프리미엄', image:import.meta.env.BASE_URL+'media/photo-1582719508461-905c673771fd.jpg', tags:['수영장','오션뷰'], region:'부산'},
  {id:'gangneung-pool', category:'pension', title:'강릉 포레스트 풀빌라', subtitle:'강원 강릉 · 우리만의 프라이빗 풀', price:164000, original:260000, discount:37, rating:4.8, reviews:422, badge:'주말 추천', image:import.meta.env.BASE_URL+'media/photo-1613490493576-7fde63acd811.jpg', tags:['개별 수영장','바비큐'], region:'강릉'},
  {id:'garden-ticket', category:'leisure', title:'가을 정원 입장권', subtitle:'경기 광주 · 계절을 걷는 하루', price:11000, original:14000, discount:21, rating:4.9, reviews:13503, badge:'인기 1위', image:import.meta.env.BASE_URL+'media/photo-1490750967868-88aa4486c946.jpg', tags:['모바일 입장','당일 사용'], region:'경기'},
  {id:'musical', category:'ticket', title:'뮤지컬 〈미드나잇〉', subtitle:'서울 대학로 · 잊지 못할 무대', price:66000, original:88000, discount:25, rating:4.9, reviews:870, badge:'단독 특가', image:import.meta.env.BASE_URL+'media/photo-1507676184212-d03ab07a01bf.jpg', tags:['지정 좌석','모바일 티켓'], region:'서울'},
  {id:'concert', category:'ticket', title:'시티 나이트 콘서트', subtitle:'서울 올림픽공원 · 겨울밤 라이브', price:89000, original:110000, discount:19, rating:4.8, reviews:513, badge:'오픈 예정', image:import.meta.env.BASE_URL+'media/photo-1459749411175-04bf5292ceea.jpg', tags:['지정 좌석','한정 수량'], region:'서울'},
  {id:'tokyo-stay', category:'global', title:'도쿄 어반 스테이', subtitle:'일본 도쿄 · 여행의 중심에서', price:142000, original:189000, discount:25, rating:4.7, reviews:634, badge:'해외 특가', image:import.meta.env.BASE_URL+'media/photo-1542314831-068cd1dbfeeb.jpg', tags:['무료 취소','중심가'], region:'도쿄'},
  {id:'jeju-flight', category:'flight', title:'제주 왕복 항공권', subtitle:'김포 ↔ 제주 · 원하는 일정 선택', price:75900, original:105000, discount:28, rating:4.8, reviews:322, badge:'오늘 출발가', image:import.meta.env.BASE_URL+'media/photo-1436491865332-7a61a109cc05.jpg', tags:['편도/왕복','일정 선택'], region:'제주'},
  {id:'osaka-tour', category:'tour', title:'오사카 시티 패스', subtitle:'일본 오사카 · 도시를 자유롭게', price:38000, original:49000, discount:22, rating:4.8, reviews:1102, badge:'베스트', image:import.meta.env.BASE_URL+'media/photo-1590559899731-a382839e5549.jpg', tags:['즉시 발권','자유 여행'], region:'오사카'},
  {id:'train', category:'transport', title:'서울–부산 고속열차', subtitle:'전국 이동 · 빠르고 편안하게', price:59800, original:68000, discount:12, rating:4.7, reviews:271, badge:'수수료 0원', image:import.meta.env.BASE_URL+'media/photo-1474487548417-781cb71495f3.jpg', tags:['모바일 승차권','좌석 선택'], region:'부산'},
];
export const money = n => n.toLocaleString('ko-KR') + '원';
