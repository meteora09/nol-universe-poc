import React, {useEffect,useState} from 'react';
import {ChevronLeft,ChevronRight,ChevronDown,Pause,Play,Ticket,Star} from 'lucide-react';
import {money,products} from './data';
import './ticket.css';

export const ticketGenres=[
 {id:'all',label:'전체',emoji:'🎟️'},
 {id:'musical',label:'뮤지컬',emoji:'🎭'},
 {id:'concert',label:'콘서트',emoji:'🎤'},
 {id:'sports',label:'스포츠',emoji:'⚾'},
 {id:'exhibition',label:'전시/행사',emoji:'🖼️'},
 {id:'classical',label:'클래식/무용',emoji:'🎻'},
 {id:'family',label:'아동/가족',emoji:'🎈'},
 {id:'play',label:'연극',emoji:'🎬'},
];
const ticketItems=products.filter(product=>product.category==='ticket');
const slides=[
 {eyebrow:'NOL TICKET SPECIAL',title:'공연이 시작되는 순간,\n일상이 특별해져요',detail:'뮤지컬부터 콘서트까지 설레는 순간을 예약하세요',image:'photo-1503095396549-807759245b35.jpg',tone:'red',productId:'musical'},
 {eyebrow:'WEEKEND LIVE',title:'가까이서 만나는\n라이브의 열기',detail:'지금 가장 뜨거운 콘서트와 페스티벌',image:'photo-1459749411175-04bf5292ceea.jpg',tone:'gold',productId:'concert'},
 {eyebrow:'EXHIBITION PICK',title:'새로운 영감이\n기다리는 하루',detail:'전시와 공연 사이, 나에게 맞는 즐거움을 찾아보세요',image:'photo-1490750967868-88aa4486c946.jpg',tone:'garden',productId:'art-garden'},
 {eyebrow:'NOL ONLY',title:'놓치면 아쉬운\n오늘의 티켓 특가',detail:'지금 예매하면 더 가벼운 공연 나들이',image:'photo-1507676184212-d03ab07a01bf.jpg',tone:'blue',productId:'blue-note'},
];
const upcomingIds=['curtain-call','jazz-room','moonlight-musical','summer-sound','family-magic','museum-night','orchestra-star'];
function TicketPoster({item}){return <span className={`ticket-poster art-${item.art||'city'}`} style={{'--poster-photo':`url('${item.image}')`}}><span className="poster-top">NOL TICKET</span><span className="poster-main">{item.title}</span><span className="poster-bottom">놀라운 순간을 만나다</span></span>}
function TicketCard({item,onOpen,onWish,wished,rank}){return <article className="ticket-card"><button className="ticket-card-open" onClick={()=>onOpen(item)} aria-label={`${item.title} 상세 보기`}><TicketPoster item={item}/>{rank&&<b className="ticket-rank">{rank}</b>}</button><div className="ticket-card-copy"><span>{item.badge}</span><button onClick={()=>onOpen(item)}>{item.title}</button><small>{item.subtitle}</small><div className="ticket-card-price"><em>{item.discount}%</em><strong>{money(item.price)}</strong></div><div className="ticket-card-rating"><Star size={12} fill="currentColor"/> {item.rating} <span>({item.reviews.toLocaleString()})</span><button onClick={()=>onWish(item.id)} aria-label={wished?`${item.title} 찜 해제`:`${item.title} 찜하기`}>{wished?'♥':'♡'}</button></div></div></article>}

const genreSubtypes={musical:['전체','오리지널/내한','라이선스','창작뮤지컬'],concert:['전체','발라드','락/메탈','재즈/소울','페스티벌','인디'],sports:['전체','야구','축구','농구'],exhibition:['전체','전시','미디어아트','체험'],classical:['전체','오케스트라','독주회','무용','실내악'],family:['전체','아동극','음악극','마술','인형극'],play:['전체','드라마','코미디','추리','로맨스']};
const regionTabs=[['서울/경기',['서울','경기','인천']],['부산/경남',['부산','경상']],['대전/충청',['대전','충청']],['광주/전라',['광주','전라']],['강원/제주',['강원','제주']]];
const themeTitles={musical:['가족과 함께 보는 공연','화려한 무대, 눈호강하고 싶다면','BEST 대학로 공연'],concert:['지금 가장 뜨거운 라이브','주말에 만나는 페스티벌','감성을 채우는 무대'],sports:['주말에 즐기는 경기','함께 응원하는 순간','가족과 가는 스포츠'],exhibition:['새로운 영감을 만나는 하루','아이와 함께하는 전시','이번 주 인기 전시'],classical:['가을밤의 오케스트라','고요한 피아노 선율','무대 위의 아름다운 움직임'],family:['온 가족이 함께','아이의 첫 공연','주말 가족 나들이'],play:['대학로 인기 연극','가볍게 웃는 하루','마음에 남는 이야기']};
const jumpTo=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
function GenreTicketPage({genre,onGenreChange,onOpen,onWish,wishes,onAll}){
 const items=ticketItems.filter(item=>item.genre===genre);
 const label=ticketGenres.find(g=>g.id===genre)?.label||'티켓';
 const [slide,setSlide]=useState(0),[playing,setPlaying]=useState(true),[region,setRegion]=useState(regionTabs[0][0]),[theme,setTheme]=useState(0),[subtype,setSubtype]=useState('NOL’s Pick'),[showAll,setShowAll]=useState(false),[upcomingOffset,setUpcomingOffset]=useState(0);
 useEffect(()=>{setSlide(0);setRegion(regionTabs[0][0]);setTheme(0);setSubtype('NOL’s Pick');setShowAll(false);setUpcomingOffset(0)},[genre]);
 useEffect(()=>{if(!playing||items.length<2)return;const timer=window.setInterval(()=>setSlide(i=>(i+1)%items.length),5500);return()=>window.clearInterval(timer)},[playing,genre,items.length]);
 const active=items[slide%items.length];
 const upcoming=items.filter(item=>item.badge.includes('오픈'));
 const rotated=[...upcoming.slice(upcomingOffset),...upcoming.slice(0,upcomingOffset)].slice(0,5);
 const ranking=[...items].sort((a,b)=>b.reviews-a.reviews).slice(0,5);
 const currentRegions=regionTabs.find(([name])=>name===region)?.[1]||[];
 const regional=items.filter(item=>currentRegions.includes(item.region)).slice(0,5);
 const subtypes=genreSubtypes[genre]||['전체'];
 const browse=subtype==='NOL’s Pick'||subtype==='전체'?items:items.filter(item=>item.subgenre===subtype);
 const themeItems=[items.slice(0,5),[...items].reverse().slice(0,5),[...items].sort((a,b)=>b.rating-a.rating).slice(0,5)];
 return <div className="genre-page">
  <nav className="genre-top-nav shell" aria-label="티켓 장르">{ticketGenres.slice(1).map(g=><button key={g.id} className={genre===g.id?'active':''} onClick={()=>onGenreChange(g.id)}>{g.label}</button>)}</nav>
  <section className="genre-carousel" aria-label={`${label} 추천 배너`}><div className="genre-carousel-track"><div className="genre-side-banner" style={{backgroundImage:`linear-gradient(90deg,#151323b3,#15132378),url('${items[(slide+items.length-1)%items.length].image}')`}}/><button className="genre-main-banner" onClick={()=>onOpen(active)} style={{backgroundImage:`linear-gradient(90deg,#10101de0 0%,#20223a8a 57%,#10101d15),url('${active.image}')`}}><span className="genre-banner-copy"><small>NOL TICKET · {label}</small><strong>{active.title}</strong><span>{active.subtitle}</span><em>{money(active.price)}부터</em></span><span className="genre-banner-poster"><TicketPoster item={active}/></span></button><div className="genre-side-banner" style={{backgroundImage:`linear-gradient(90deg,#151323b3,#15132378),url('${items[(slide+1)%items.length].image}')`}}/></div><button className="genre-arrow prev" aria-label="이전 배너" onClick={()=>setSlide(i=>(i+items.length-1)%items.length)}><ChevronLeft/></button><button className="genre-arrow next" aria-label="다음 배너" onClick={()=>setSlide(i=>(i+1)%items.length)}><ChevronRight/></button><div className="genre-carousel-controls"><button onClick={()=>setPlaying(v=>!v)} aria-label={playing?'일시정지':'재생'}>{playing?<Pause size={13}/>:<Play size={13}/>}</button><span>{String(slide+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span></div></section>
  <nav className="genre-anchor-nav" aria-label="페이지 섹션"><div className="shell">{[['오픈 예정','genre-upcoming'],['할인중','genre-discount'],['랭킹','genre-ranking'],['지역추천','genre-regions'],['테마','genre-themes'],['둘러보기','genre-browse']].map(([text,id])=><button key={id} onClick={()=>jumpTo(id)}>{text}</button>)}</div></nav>
  <main className="shell genre-main"><section id="genre-upcoming" className="genre-section"><div className="genre-section-heading"><h2>오픈 예정</h2><button onClick={()=>jumpTo('genre-browse')}>전체보기 <ChevronRight size={18}/></button></div><div className="genre-cards-scroll">{rotated.map((item,i)=><div key={item.id} className="genre-upcoming-card"><button onClick={()=>onOpen(item)}><TicketPoster item={item}/><span className="genre-open-time">예매 오픈 예정</span><strong>{item.title}</strong><small>{item.badge}</small></button></div>)}<button className="genre-cards-next" aria-label="다음 오픈 예정" onClick={()=>setUpcomingOffset(i=>(i+1)%upcoming.length)}><ChevronRight/></button></div></section>
  <div className="genre-mini-promo"><div><span>NOL TICKET SPECIAL</span><strong>{label}, 더 설레는 순간을 만나다</strong><small>좋아하는 무대와 즐거움을 가까이에서</small></div><button onClick={()=>jumpTo('genre-browse')}>둘러보기 <ChevronRight size={17}/></button></div>
  <section id="genre-discount" className="genre-section"><div className="genre-section-heading"><h2>지금 할인중</h2><button onClick={()=>jumpTo('genre-browse')}>전체보기 <ChevronRight size={18}/></button></div><div className="genre-card-grid">{[...items].sort((a,b)=>b.discount-a.discount).slice(0,5).map(item=><TicketCard key={item.id} item={item} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div></section>
  <section id="genre-ranking" className="genre-section"><div className="genre-section-heading"><h2>일간 랭킹</h2><button onClick={()=>jumpTo('genre-browse')}>전체보기 <ChevronRight size={18}/></button></div><div className="genre-card-grid">{ranking.map((item,i)=><TicketCard key={item.id} item={item} rank={i+1} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div></section>
  <section id="genre-regions" className="genre-section"><div className="genre-section-heading"><h2>지역 추천</h2></div><div className="genre-region-tabs" role="tablist" aria-label="지역 선택">{regionTabs.map(([name])=><button key={name} role="tab" aria-selected={region===name} className={region===name?'active':''} onClick={()=>setRegion(name)}>{name}</button>)}</div><div className="genre-card-grid">{regional.length?regional.map(item=><TicketCard key={item.id} item={item} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>):<p className="genre-empty">이 지역의 {label} 상품을 준비하고 있어요.</p>}</div></section>
  <section id="genre-themes" className="genre-section"><div className="genre-section-heading"><h2>테마</h2></div><div className="genre-theme-buttons">{(themeTitles[genre]||[]).map((title,i)=><button key={title} className={theme===i?'active':''} aria-expanded={theme===i} onClick={()=>setTheme(i)}><span>{title}</span><ChevronDown size={18}/></button>)}</div><div className="genre-card-grid">{themeItems[theme].map(item=><TicketCard key={item.id} item={item} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div></section>
  <section id="genre-browse" className="genre-section"><div className="genre-section-heading"><h2>둘러보기</h2><span>{browse.length}개 상품</span></div><div className="genre-browse-tabs" role="tablist" aria-label="세부 장르">{['NOL’s Pick',...subtypes].map(name=><button key={name} role="tab" aria-selected={subtype===name} className={subtype===name?'active':''} onClick={()=>{setSubtype(name);setShowAll(false)}}>{name}</button>)}</div><div className="genre-browse-grid">{(showAll?browse:browse.slice(0,10)).map(item=><TicketCard key={item.id} item={item} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div>{browse.length>10&&<button className="genre-more-button" onClick={()=>setShowAll(v=>!v)}>{showAll?'접기':`${browse.length-10}개 더보기`} <ChevronDown size={16}/></button>}</section></main>
 </div>
}
export default function TicketPage({genre,onGenreChange,onOpen,onWish,wishes,onAll}){
 const [slide,setSlide]=useState(0);const [playing,setPlaying]=useState(true);const [upcomingOffset,setUpcomingOffset]=useState(0);const [rankGenre,setRankGenre]=useState('musical');
 useEffect(()=>{if(!playing)return;const timer=window.setInterval(()=>setSlide(i=>(i+1)%slides.length),5500);return()=>window.clearInterval(timer)},[playing]);
 if(genre!=='all')return <GenreTicketPage genre={genre} onGenreChange={onGenreChange} onOpen={onOpen} onWish={onWish} wishes={wishes} onAll={onAll}/>;
 const active=slides[slide];const ranking=ticketItems.filter(item=>item.genre===rankGenre).slice(0,5);
 const upcoming=upcomingIds.map(id=>ticketItems.find(item=>item.id===id)).filter(Boolean);
 const visibleUpcoming=[...upcoming.slice(upcomingOffset),...upcoming.slice(0,upcomingOffset)].slice(0,5);
 const discounted=[...ticketItems].sort((a,b)=>b.discount-a.discount).slice(0,6);
 return <div className="ticket-page">
  <section className="ticket-hero-wrap"><div className={`ticket-hero shell tone-${active.tone}`} style={{'--ticket-hero-photo':`url('${import.meta.env.BASE_URL}media/${active.image}')`}}><div className="ticket-hero-copy"><span>{active.eyebrow}</span><h1>{active.title}</h1><p>{active.detail}</p><button onClick={()=>onOpen(ticketItems.find(item=>item.id===active.productId))}>지금 예매하기 <ChevronRight size={18}/></button></div><button className="ticket-hero-arrow previous" onClick={()=>setSlide(i=>(i+slides.length-1)%slides.length)} aria-label="이전 배너"><ChevronLeft size={25}/></button><button className="ticket-hero-arrow next" onClick={()=>setSlide(i=>(i+1)%slides.length)} aria-label="다음 배너"><ChevronRight size={25}/></button><div className="ticket-hero-controls"><button onClick={()=>setPlaying(v=>!v)} aria-label={playing?'자동재생 일시정지':'자동재생 시작'}>{playing?<Pause size={13}/>:<Play size={13}/>}</button><button onClick={onAll}>{slide+1} / {slides.length} <span>전체보기</span></button></div></div></section>
  <div className="shell ticket-main"><div className="ticket-notice"><span>공지</span> NOL Universe PoC 티켓은 예시 상품이며 실제 예매가 진행되지 않습니다.</div>
   <div className="ticket-genre-row" aria-label="티켓 장르">{ticketGenres.slice(1).map(g=><button key={g.id} onClick={()=>onGenreChange(g.id)} className={genre===g.id?'active':''}><span>{g.emoji}</span>{g.label}</button>)}</div>
   <section className="ticket-section"><div className="ticket-section-title"><div><h2>오픈 예정</h2><p>곧 예매가 시작될 공연을 미리 만나보세요</p></div><button onClick={onAll}>전체보기 <ChevronRight size={18}/></button></div><div className="ticket-upcoming-wrap"><div className="ticket-card-grid upcoming">{visibleUpcoming.map(item=><TicketCard key={item.id} item={item} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div><button className="ticket-list-next" onClick={()=>setUpcomingOffset(i=>(i+1)%upcoming.length)} aria-label="오픈 예정 다음 상품"><ChevronRight size={24}/></button></div></section>
   <section className="ticket-section ticket-ranking"><div className="ticket-section-title"><div><h2>티켓 장르별 랭킹</h2><p>지금 가장 사랑받는 공연과 전시</p></div><button onClick={onAll}>전체보기 <ChevronRight size={18}/></button></div><div className="ticket-ranking-tabs" role="tablist" aria-label="티켓 장르별 랭킹">{ticketGenres.slice(1).map(g=><button role="tab" aria-selected={rankGenre===g.id} className={rankGenre===g.id?'active':''} key={g.id} onClick={()=>setRankGenre(g.id)}>{g.label}</button>)}</div><div className="ticket-card-grid ranking">{ranking.map((item,index)=><TicketCard key={item.id} item={item} rank={index+1} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div></section>
   <section className="ticket-mid-banner"><div><span>NOL TICKET</span><h2>보고 싶던 공연,<br/>지금 더 가볍게</h2><p>마음에 담아둔 무대와 전시를 만나보세요</p><button onClick={onAll}>티켓 전체보기 <ChevronRight size={17}/></button></div><Ticket size={105} strokeWidth={1.2}/></section>
   <section className="ticket-section"><div className="ticket-section-title"><div><h2>할인 중인 티켓</h2><p>놓치기 아쉬운 가격으로 즐겨보세요</p></div><button onClick={onAll}>전체보기 <ChevronRight size={18}/></button></div><div className="ticket-card-grid discounted">{discounted.map(item=><TicketCard key={item.id} item={item} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div></section>
   <section className="ticket-section"><div className="ticket-section-title"><div><h2>취향대로 골라보는 공연·전시</h2><p>뮤지컬, 콘서트, 연극부터 전시까지</p></div><button onClick={onAll}>전체보기 <ChevronRight size={18}/></button></div><div className="ticket-card-grid more">{ticketItems.slice(0,10).map(item=><TicketCard key={item.id} item={item} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div></section>
  </div>
 </div>
}
