import React, {useEffect,useState} from 'react';
import {ChevronLeft,ChevronRight,Pause,Play,Ticket,Star} from 'lucide-react';
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
export default function TicketPage({genre,onGenreChange,onOpen,onWish,wishes,onAll}){
 const [slide,setSlide]=useState(0);const [playing,setPlaying]=useState(true);const [upcomingOffset,setUpcomingOffset]=useState(0);
 useEffect(()=>{if(!playing)return;const timer=window.setInterval(()=>setSlide(i=>(i+1)%slides.length),5500);return()=>window.clearInterval(timer)},[playing]);
 const active=slides[slide];const ranking=(genre==='all'?ticketItems:ticketItems.filter(item=>item.genre===genre)).slice(0,5);
 const upcoming=upcomingIds.map(id=>ticketItems.find(item=>item.id===id)).filter(Boolean);
 const visibleUpcoming=[...upcoming.slice(upcomingOffset),...upcoming.slice(0,upcomingOffset)].slice(0,5);
 const discounted=[...ticketItems].sort((a,b)=>b.discount-a.discount).slice(0,6);
 return <div className="ticket-page">
  <section className="ticket-hero-wrap"><div className={`ticket-hero shell tone-${active.tone}`} style={{'--ticket-hero-photo':`url('${import.meta.env.BASE_URL}media/${active.image}')`}}><div className="ticket-hero-copy"><span>{active.eyebrow}</span><h1>{active.title}</h1><p>{active.detail}</p><button onClick={()=>onOpen(ticketItems.find(item=>item.id===active.productId))}>지금 예매하기 <ChevronRight size={18}/></button></div><button className="ticket-hero-arrow previous" onClick={()=>setSlide(i=>(i+slides.length-1)%slides.length)} aria-label="이전 배너"><ChevronLeft size={25}/></button><button className="ticket-hero-arrow next" onClick={()=>setSlide(i=>(i+1)%slides.length)} aria-label="다음 배너"><ChevronRight size={25}/></button><div className="ticket-hero-controls"><button onClick={()=>setPlaying(v=>!v)} aria-label={playing?'자동재생 일시정지':'자동재생 시작'}>{playing?<Pause size={13}/>:<Play size={13}/>}</button><button onClick={onAll}>{slide+1} / {slides.length} <span>전체보기</span></button></div></div></section>
  <div className="shell ticket-main"><div className="ticket-notice"><span>공지</span> NOL Universe PoC 티켓은 예시 상품이며 실제 예매가 진행되지 않습니다.</div>
   <div className="ticket-genre-row" aria-label="티켓 장르">{ticketGenres.slice(1).map(g=><button key={g.id} onClick={()=>onGenreChange(g.id)} className={genre===g.id?'active':''}><span>{g.emoji}</span>{g.label}</button>)}</div>
   <section className="ticket-section"><div className="ticket-section-title"><div><h2>오픈 예정</h2><p>곧 예매가 시작될 공연을 미리 만나보세요</p></div><button onClick={onAll}>전체보기 <ChevronRight size={18}/></button></div><div className="ticket-upcoming-wrap"><div className="ticket-card-grid upcoming">{visibleUpcoming.map(item=><TicketCard key={item.id} item={item} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div><button className="ticket-list-next" onClick={()=>setUpcomingOffset(i=>(i+1)%upcoming.length)} aria-label="오픈 예정 다음 상품"><ChevronRight size={24}/></button></div></section>
   <section className="ticket-section ticket-ranking"><div className="ticket-section-title"><div><h2>티켓 장르별 랭킹</h2><p>지금 가장 사랑받는 공연과 전시</p></div><button onClick={onAll}>전체보기 <ChevronRight size={18}/></button></div><div className="ticket-ranking-tabs" role="tablist" aria-label="티켓 장르별 랭킹">{ticketGenres.map(g=><button role="tab" aria-selected={genre===g.id} className={genre===g.id?'active':''} key={g.id} onClick={()=>onGenreChange(g.id)}>{g.label}</button>)}</div><div className="ticket-card-grid ranking">{ranking.map((item,index)=><TicketCard key={item.id} item={item} rank={index+1} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div></section>
   <section className="ticket-mid-banner"><div><span>NOL TICKET</span><h2>보고 싶던 공연,<br/>지금 더 가볍게</h2><p>마음에 담아둔 무대와 전시를 만나보세요</p><button onClick={onAll}>티켓 전체보기 <ChevronRight size={17}/></button></div><Ticket size={105} strokeWidth={1.2}/></section>
   <section className="ticket-section"><div className="ticket-section-title"><div><h2>할인 중인 티켓</h2><p>놓치기 아쉬운 가격으로 즐겨보세요</p></div><button onClick={onAll}>전체보기 <ChevronRight size={18}/></button></div><div className="ticket-card-grid discounted">{discounted.map(item=><TicketCard key={item.id} item={item} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div></section>
   <section className="ticket-section"><div className="ticket-section-title"><div><h2>취향대로 골라보는 공연·전시</h2><p>뮤지컬, 콘서트, 연극부터 전시까지</p></div><button onClick={onAll}>전체보기 <ChevronRight size={18}/></button></div><div className="ticket-card-grid more">{ticketItems.slice(0,10).map(item=><TicketCard key={item.id} item={item} onOpen={onOpen} onWish={onWish} wished={wishes.includes(item.id)}/>)}</div></section>
  </div>
 </div>
}
