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
  {id:'musical', category:'ticket', genre:'musical', title:'뮤지컬 〈미드나잇〉', subtitle:'서울 대학로 · 잊지 못할 무대', price:66000, original:88000, discount:25, rating:4.9, reviews:870, badge:'단독 특가', image:import.meta.env.BASE_URL+'media/photo-1507676184212-d03ab07a01bf.jpg', tags:['지정 좌석','모바일 티켓'], region:'서울',art:'midnight'},
  {id:'concert', category:'ticket', genre:'concert', title:'시티 나이트 콘서트', subtitle:'서울 올림픽공원 · 겨울밤 라이브', price:89000, original:110000, discount:19, rating:4.8, reviews:513, badge:'오픈 예정', image:import.meta.env.BASE_URL+'media/photo-1459749411175-04bf5292ceea.jpg', tags:['지정 좌석','한정 수량'], region:'서울',art:'city'},
  {id:'tokyo-stay', category:'global', title:'도쿄 어반 스테이', subtitle:'일본 도쿄 · 여행의 중심에서', price:142000, original:189000, discount:25, rating:4.7, reviews:634, badge:'해외 특가', image:import.meta.env.BASE_URL+'media/photo-1542314831-068cd1dbfeeb.jpg', tags:['무료 취소','중심가'], region:'도쿄'},
  {id:'jeju-flight', category:'flight', title:'제주 왕복 항공권', subtitle:'김포 ↔ 제주 · 원하는 일정 선택', price:75900, original:105000, discount:28, rating:4.8, reviews:322, badge:'오늘 출발가', image:import.meta.env.BASE_URL+'media/photo-1436491865332-7a61a109cc05.jpg', tags:['편도/왕복','일정 선택'], region:'제주'},
  {id:'osaka-tour', category:'tour', title:'오사카 시티 패스', subtitle:'일본 오사카 · 도시를 자유롭게', price:38000, original:49000, discount:22, rating:4.8, reviews:1102, badge:'베스트', image:import.meta.env.BASE_URL+'media/photo-1590559899731-a382839e5549.jpg', tags:['즉시 발권','자유 여행'], region:'오사카'},
  {id:'train', category:'transport', title:'서울–부산 고속열차', subtitle:'전국 이동 · 빠르고 편안하게', price:59800, original:68000, discount:12, rating:4.7, reviews:271, badge:'수수료 0원', image:import.meta.env.BASE_URL+'media/photo-1474487548417-781cb71495f3.jpg', tags:['모바일 승차권','좌석 선택'], region:'부산'},
  {id:'moonlight-musical',category:'ticket',genre:'musical',title:'뮤지컬 〈문라이트〉',subtitle:'서울 종로 · 별빛을 따라가는 이야기',price:59000,original:84000,discount:30,rating:4.8,reviews:741,badge:'인기',image:import.meta.env.BASE_URL+'media/photo-1503095396549-807759245b35.jpg',tags:['지정 좌석','모바일 티켓'],region:'서울',art:'moonlight'},
  {id:'curtain-call',category:'ticket',genre:'musical',title:'뮤지컬 〈커튼콜〉',subtitle:'서울 강남 · 무대 뒤의 찬란한 순간',price:72000,original:96000,discount:25,rating:4.9,reviews:619,badge:'단독 판매',image:import.meta.env.BASE_URL+'media/photo-1503095396549-807759245b35.jpg',tags:['지정 좌석','모바일 티켓'],region:'서울',art:'curtain'},
  {id:'blue-note',category:'ticket',genre:'concert',title:'블루 노트 라이브',subtitle:'서울 마포 · 감성을 채우는 밤',price:54000,original:72000,discount:25,rating:4.8,reviews:458,badge:'티켓 오픈',image:import.meta.env.BASE_URL+'media/photo-1507676184212-d03ab07a01bf.jpg',tags:['지정 좌석','한정 수량'],region:'서울',art:'blue'},
  {id:'summer-sound',category:'ticket',genre:'concert',title:'썸머 사운드 페스티벌',subtitle:'인천 송도 · 음악으로 가득한 주말',price:99000,original:132000,discount:25,rating:4.7,reviews:1102,badge:'얼리버드',image:import.meta.env.BASE_URL+'media/photo-1459749411175-04bf5292ceea.jpg',tags:['모바일 티켓','야외 공연'],region:'인천',art:'summer'},
  {id:'art-garden',category:'ticket',genre:'exhibition',title:'빛의 정원 특별전',subtitle:'서울 성수 · 색으로 만나는 새로운 세계',price:19800,original:28000,discount:29,rating:4.8,reviews:2384,badge:'할인 중',image:import.meta.env.BASE_URL+'media/photo-1490750967868-88aa4486c946.jpg',tags:['모바일 입장','당일 사용'],region:'서울',art:'garden'},
  {id:'museum-night',category:'ticket',genre:'exhibition',title:'뮤지엄 나이트',subtitle:'서울 용산 · 밤에 즐기는 전시',price:24000,original:32000,discount:25,rating:4.7,reviews:836,badge:'기간 한정',image:import.meta.env.BASE_URL+'media/photo-1490750967868-88aa4486c946.jpg',tags:['모바일 입장','오디오 가이드'],region:'서울',art:'museum'},
  {id:'home-run',category:'ticket',genre:'sports',title:'서울 홈런 매치',subtitle:'서울 잠실 · 주말 야구 관람',price:34000,original:42000,discount:19,rating:4.8,reviews:1280,badge:'인기 경기',image:import.meta.env.BASE_URL+'media/photo-1459749411175-04bf5292ceea.jpg',tags:['모바일 티켓','지정 좌석'],region:'서울',art:'sports'},
  {id:'orchestra-star',category:'ticket',genre:'classical',title:'별빛 오케스트라',subtitle:'서울 서초 · 선율로 물드는 저녁',price:48000,original:65000,discount:26,rating:4.9,reviews:522,badge:'추천 공연',image:import.meta.env.BASE_URL+'media/photo-1503095396549-807759245b35.jpg',tags:['지정 좌석','모바일 티켓'],region:'서울',art:'orchestra'},
  {id:'family-magic',category:'ticket',genre:'family',title:'가족 뮤지컬 〈마법의 숲〉',subtitle:'경기 고양 · 온 가족이 함께하는 모험',price:32000,original:45000,discount:29,rating:4.8,reviews:1392,badge:'가족 추천',image:import.meta.env.BASE_URL+'media/photo-1490750967868-88aa4486c946.jpg',tags:['가족 관람','모바일 티켓'],region:'경기',art:'magic'},
  {id:'secret-stage',category:'ticket',genre:'play',title:'연극 〈비밀의 무대〉',subtitle:'서울 대학로 · 마지막 장면의 반전',price:28000,original:40000,discount:30,rating:4.7,reviews:963,badge:'타임딜',image:import.meta.env.BASE_URL+'media/photo-1503095396549-807759245b35.jpg',tags:['지정 좌석','모바일 티켓'],region:'서울',art:'secret'},
  {id:'jazz-room',category:'ticket',genre:'concert',title:'재즈룸 라이브',subtitle:'서울 홍대 · 가까이에서 듣는 재즈',price:44000,original:58000,discount:24,rating:4.9,reviews:344,badge:'이번 주 오픈',image:import.meta.env.BASE_URL+'media/photo-1507676184212-d03ab07a01bf.jpg',tags:['지정 좌석','한정 수량'],region:'서울',art:'jazz'},
];

// PoC inventory. These are example products for exercising region and booking journeys.
const photo=(id)=>import.meta.env.BASE_URL+`media/${id}.jpg`;
const pics={hotel:['photo-1566073771259-6a8506099945','photo-1571896349842-33c89424de2d','photo-1582719508461-905c673771fd','photo-1533105079780-92b9be482077'],pension:['photo-1613490493576-7fde63acd811','photo-1476514525535-07fb3b4ae5f1'],leisure:['photo-1490750967868-88aa4486c946','photo-1476514525535-07fb3b4ae5f1'],flight:['photo-1436491865332-7a61a109cc05'],global:['photo-1542314831-068cd1dbfeeb','photo-1566073771259-6a8506099945'],tour:['photo-1590559899731-a382839e5549','photo-1490750967868-88aa4486c946'],transport:['photo-1474487548417-781cb71495f3']};
const inventory=[
 ['hotel','서울','강남/역삼/삼성','강남 어반 스위트',139000],['hotel','서울','홍대/합정/마포','홍대 디자인 호텔',119000],
 ['hotel','부산','해운대','해운대 블루 오션 호텔',156000],['hotel','부산','광안리','광안리 마리나 스테이',132000],
 ['hotel','제주','서귀포','서귀포 가든 리조트',178000],['hotel','제주','제주시','제주 공항 시티 호텔',99000],
 ['hotel','경기','가평/양평','가평 레이크 리조트',167000],['hotel','경기','수원/용인','용인 포레스트 호텔',109000],
 ['hotel','인천','송도','송도 파크 호텔',134000],['hotel','인천','영종도','영종도 선셋 리조트',149000],
 ['hotel','강원','속초','속초 비치 호텔',142000],['hotel','강원','강릉','강릉 경포 리조트',159000],
 ['hotel','경상','경주','경주 한옥 호텔',119000],['hotel','경상','통영/거제','통영 마리나 리조트',173000],
 ['hotel','전라','여수','여수 오션 호텔',148000],['hotel','전라','전주','전주 한옥 스테이',99000],
 ['hotel','충청','대전','대전 시티 호텔',105000],['hotel','충청','부여/공주','부여 힐링 리조트',169000],
 ['pension','강원','속초','속초 오션뷰 풀빌라',189000],['pension','강원','양양','양양 서프 하우스',149000],
 ['pension','경기','가평','가평 프라이빗 풀빌라',219000],['pension','경기','양평','양평 숲속 독채 펜션',159000],
 ['pension','제주','서귀포','서귀포 돌담 풀빌라',198000],['pension','제주','애월','애월 바람 스테이',172000],
 ['pension','경상','경주','경주 감성 한옥 펜션',139000],['pension','경상','남해','남해 바다 정원 펜션',164000],
 ['leisure','경기','용인','용인 테마파크 종일권',39000],['leisure','경기','가평','가평 수상레저 패스',49000],
 ['leisure','서울','잠실','잠실 어드벤처 이용권',42000],['leisure','서울','성수','성수 아트 체험 티켓',24000],
 ['leisure','부산','해운대','해운대 아쿠아리움',29000],['leisure','부산','기장','부산 해안 스카이라인',35000],
 ['leisure','제주','서귀포','제주 자연 체험 패스',22000],['leisure','제주','애월','애월 액티비티 패키지',59000],
 ['flight','제주','제주','김포 → 제주 편도 항공권',42900],['flight','제주','제주','부산 → 제주 편도 항공권',38900],
 ['flight','부산','김해','김포 → 부산 편도 항공권',49900],['flight','부산','김해','제주 → 부산 편도 항공권',45900],
 ['flight','강원','양양','김포 → 양양 편도 항공권',55900],['flight','전라','여수','김포 → 여수 편도 항공권',52900],
 ['global','일본','오사카','오사카 난바 호텔',136000],['global','일본','후쿠오카','후쿠오카 하카타 스테이',117000],
 ['global','대만','타이베이','타이베이 센트럴 호텔',128000],['global','대만','가오슝','가오슝 하버 스테이',109000],
 ['global','태국','방콕','방콕 리버사이드 호텔',155000],['global','태국','푸켓','푸켓 비치 리조트',212000],
 ['global','베트남','다낭','다낭 오션 리조트',179000],['global','베트남','나트랑','나트랑 베이 호텔',143000],
 ['tour','일본','도쿄','도쿄 전망대 입장권',29000],['tour','일본','교토','교토 시내 투어',49000],
 ['tour','대만','타이베이','타이베이 시티 패스',38000],['tour','대만','지우펀','지우펀 야경 투어',54000],
 ['tour','태국','방콕','방콕 리버 크루즈',45000],['tour','태국','푸켓','푸켓 아일랜드 투어',73000],
 ['tour','베트남','다낭','다낭 바나힐 입장권',42000],['tour','베트남','호이안','호이안 야경 투어',33000],
 ['transport','부산','부산역','서울 → 부산 고속버스',27800],['transport','부산','부산역','부산 시내 렌터카',49000],
 ['transport','강원','강릉','서울 → 강릉 고속열차',29900],['transport','강원','속초','서울 → 속초 고속버스',24000],
 ['transport','전라','여수','서울 → 여수 고속열차',47800],['transport','전라','전주','서울 → 전주 고속버스',21500],
 ['transport','경상','경주','서울 → 경주 고속열차',49800],['transport','경상','포항','서울 → 포항 고속열차',53900],
];
inventory.forEach(([category,area,district,title,price],i)=>{
 const original=Math.round(price*1.32/1000)*1000;
 products.push({id:`demo-${category}-${i}`,category,area,district,region:district,title,subtitle:`${area} ${district} · ${category==='flight'||category==='transport'?'편리한 이동':'여행을 즐기는 하루'}`,price,original,discount:Math.round((original-price)/original*100),rating:[4.9,4.8,4.7,4.9][i%4],reviews:180+i*23,badge:['인기','NOL 특가','추천','주말 인기'][i%4],image:photo(pics[category][i%pics[category].length]),tags:category==='flight'||category==='transport'?['일정 선택','모바일 예약']:[(i%7===0?'애견동반':i%7===1?'키즈 호텔':i%7===2?'오션뷰':i%7===3?'가족여행':i%7===4?'스파펜션':'인기 상품'),'모바일 예약']});
});

const ticketInventory=[
 ['musical','서울','대학로','뮤지컬 〈별이 내리는 밤〉',59000,'창작뮤지컬'],['musical','부산','드림씨어터','뮤지컬 〈바다의 노래〉',68000,'라이선스'],['musical','대전','예술의전당','뮤지컬 〈다시, 봄〉',52000,'창작뮤지컬'],['musical','광주','문화예술회관','뮤지컬 〈시간의 문〉',48000,'오리지널/내한'],['musical','강원','춘천','뮤지컬 〈숲속의 편지〉',42000,'창작뮤지컬'],
 ['concert','서울','올림픽홀','라이트업 라이브 콘서트',79000,'발라드'],['concert','부산','벡스코','부산 웨이브 콘서트',84000,'페스티벌'],['concert','대전','예술의전당','재즈 인 더 시티',55000,'재즈/소울'],['concert','광주','김대중컨벤션센터','광주 뮤직 페스티벌',69000,'페스티벌'],['concert','강원','춘천','레이크사이드 어쿠스틱 라이브',48000,'인디'],['concert','서울','마포','록 나이트 라이브',58000,'락/메탈'],
 ['sports','서울','잠실','서울 야구 주말 경기',32000,'야구'],['sports','부산','사직','부산 야구 홈경기',30000,'야구'],['sports','대전','월드컵경기장','대전 축구 홈경기',28000,'축구'],['sports','광주','기아챔피언스필드','광주 야구 홈경기',29000,'야구'],['sports','강원','춘천','강원 농구 주말 경기',26000,'농구'],
 ['exhibition','서울','성수','빛과 색의 미디어아트',22000,'미디어아트'],['exhibition','부산','영도','부산 바다 사진전',18000,'전시'],['exhibition','대전','엑스포','우주 탐험 특별전',24000,'체험'],['exhibition','광주','비엔날레','현대미술 산책',21000,'전시'],['exhibition','강원','강릉','커피와 디자인 전시',16000,'전시'],
 ['classical','서울','예술의전당','가을밤 클래식 콘서트',45000,'오케스트라'],['classical','부산','문화회관','부산 필하모닉의 밤',48000,'오케스트라'],['classical','대전','예술의전당','피아노 리사이틀',39000,'독주회'],['classical','광주','문화예술회관','발레 〈달빛 호수〉',52000,'무용'],['classical','강원','춘천','숲속 실내악 콘서트',36000,'실내악'],
 ['family','서울','광진','가족 뮤지컬 〈구름 기차〉',34000,'아동극'],['family','부산','센텀','키즈 매직 라이브',29000,'마술'],['family','대전','엑스포','공룡 탐험 가족 공연',32000,'아동극'],['family','광주','문화예술회관','어린이 음악극 〈숲의 친구들〉',28000,'음악극'],['family','강원','춘천','가족 인형극 〈달토끼〉',24000,'인형극'],
 ['play','서울','대학로','연극 〈우리의 계절〉',35000,'로맨스'],['play','부산','서면','연극 〈두 번째 편지〉',33000,'드라마'],['play','대전','소극장','연극 〈문을 열면〉',30000,'추리'],['play','광주','충장로','연극 〈웃음의 온도〉',29000,'코미디'],['play','강원','춘천','연극 〈강가의 집〉',27000,'드라마'],
];
ticketInventory.forEach(([genre,region,venue,title,price,subgenre],i)=>{
 const original=Math.round(price*1.3/1000)*1000;
 products.push({id:`demo-ticket-${genre}-${i}`,category:'ticket',genre,subgenre,region,title,subtitle:`${region} ${venue} · 공연/행사`,price,original,discount:Math.round((original-price)/original*100),rating:[4.9,4.8,4.7][i%3],reviews:125+i*19,badge:['단독 특가','오픈 예정','추천'][i%3],image:photo(['photo-1503095396549-807759245b35','photo-1459749411175-04bf5292ceea','photo-1507676184212-d03ab07a01bf','photo-1490750967868-88aa4486c946'][i%4]),tags:['모바일 티켓','지정 좌석'],art:['midnight','city','blue','garden'][i%4]});
});
export const money = n => n.toLocaleString('ko-KR') + '원';
