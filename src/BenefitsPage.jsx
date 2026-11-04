import React, {useState} from 'react';
import {ArrowDownToLine, ArrowRight, Check, ChevronRight, CirclePercent, Clock3, CreditCard, Gift, Globe2, Hotel, MapPin, Plane, Sparkles, Ticket, TrainFront, Wallet} from 'lucide-react';
import {products} from './data';
import './benefits.css';

const groups = [
  {id:'domestic', label:'국내여행', kicker:'최근 본 국내여행', allLabel:'국내여행 혜택 전체보기', rows:[
    {id:'stay-pack',title:'국내숙소 10만원 쿠폰팩',desc:'가을 여행에 맞춘 숙소 할인',image:products[0].image,claim:true},
    {id:'gangwon-deal',title:'강원도 호텔 특가',desc:'이번 주 인기 호텔을 특별한 가격에',image:products[3].image,category:'hotel'},
    {id:'winter-pension',title:'겨울 여행도 부담 없이!',desc:'10만원대 펜션 모아보기',image:products[1].image,category:'pension'},
  ]},
  {id:'oversea', label:'해외여행', kicker:'다른 사람들이 받아간 해외여행 혜택', allLabel:'해외여행 혜택 전체보기', rows:[
    {id:'flight-pack',title:'해외 항공 쿠폰 혜택',desc:'여행 준비를 가볍게 시작하세요',icon:Plane,tone:'sky',claim:true},
    {id:'global-stay',title:'해외숙소 추가 3% 쿠폰',desc:'숙소 예약에 한 번 더 할인',icon:Hotel,tone:'blue',claim:true},
    {id:'tour-ticket',title:'해외투어·티켓 5% 할인',desc:'여행지의 즐거움까지 준비',icon:Globe2,tone:'mint',claim:true},
  ]},
  {id:'ticket', label:'티켓', kicker:'다른 사람들이 받아간 엔터티켓 혜택', allLabel:'엔터티켓 혜택 전체보기', rows:[
    {id:'ticket-deal',title:'티켓 기간한정 특가',desc:'이번 주 놓치기 아쉬운 공연',icon:Ticket,tone:'purple',category:'ticket'},
    {id:'culture-pass',title:'공연예술 관람 혜택',desc:'좋아하는 무대를 더 가깝게',icon:Sparkles,tone:'pink',claim:true},
    {id:'family-show',title:'가족 공연 모아보기',desc:'함께 즐기는 주말의 무대',image:products[5].image,category:'ticket'},
  ]},
];
const tabs=[{id:'all',label:'둘러보기',emoji:'🎁'},{id:'domestic',label:'국내여행',emoji:'🧳'},{id:'oversea',label:'해외여행',emoji:'✈️'},{id:'ticket',label:'티켓',emoji:'🎟️'}];
const quick=[
 {id:'leisure-sale',title:'이번 주 국내레저 할인',desc:'가까운 곳에서 즐거운 하루를 보내세요',icon:Gift,tone:'blue',category:'leisure'},
 {id:'ticket-sale',title:'공연·전시 기간한정 특가',desc:'지금 즐기기 좋은 티켓을 만나보세요',icon:Clock3,tone:'purple',category:'ticket'},
];
const payments=[
 {title:'NOL 머니 결제 혜택',desc:'결제할 때 포인트 적립',icon:Wallet,tone:'blue'},
 {title:'간편결제 추가 할인',desc:'결제수단에 따라 추가 혜택',icon:CreditCard,tone:'mint'},
 {title:'카드 결제 혜택',desc:'내 카드의 할인 혜택 확인',icon:CirclePercent,tone:'orange'},
];
function OfferThumb({offer}){const Icon=offer.icon;return <span className={`benefit-thumb ${offer.tone||''}`}>{offer.image?<img src={offer.image} alt=""/>:<Icon size={27} strokeWidth={1.8}/>}</span>}
function OfferRow({offer,onClaim,onExplore,claimed,compact=false}){return <button className={`benefit-offer ${compact?'compact':''}`} onClick={()=>offer.claim?onClaim(offer.id):onExplore(offer.category||'all')}><OfferThumb offer={offer}/><span className="benefit-offer-copy"><strong>{offer.title}</strong><small>{offer.desc}</small></span>{offer.claim?<span className={`benefit-offer-action ${claimed?'received':''}`}>{claimed?<Check size={19}/>:<ArrowDownToLine size={19}/>}</span>:<ChevronRight className="benefit-chevron" size={20}/>}</button>}
function BenefitGroup({group,onClaim,onExplore,claimed,onSelect}){return <article className="benefit-group"><span className="benefit-kicker">{group.kicker}</span><div className="benefit-group-list">{group.rows.map(row=><OfferRow key={row.id} offer={row} onClaim={onClaim} onExplore={onExplore} claimed={claimed.includes(row.id)}/>)}</div><button className="benefit-group-footer" onClick={()=>onSelect(group.id)}>{group.allLabel} <ChevronRight size={16}/></button></article>}
export default function BenefitsPage({claimedCoupons,onClaim,onExplore}){
 const [active,setActive]=useState('all');
 const select=(tab)=>{setActive(tab);window.scrollTo({top:0,behavior:'smooth'})};
 const activeGroup=groups.find(g=>g.id===active);
 return <div className="benefits-page"><div className="benefit-tabs-wrap"><div className="shell benefit-tabs" role="tablist" aria-label="혜택 종류">{tabs.map(tab=><button key={tab.id} role="tab" aria-selected={active===tab.id} className={active===tab.id?'active':''} onClick={()=>select(tab.id)}><span>{tab.emoji}</span>{tab.label}</button>)}<span className="benefit-coupon-count">받은 쿠폰 <b>{claimedCoupons.length}</b></span></div></div>
 {active==='all'?<>
  <div className="benefit-top-area"><div className="shell"><div className="benefit-lead"><h1>관심 있을 만한 혜택을 모아봤어요</h1><div className="benefit-gift-art" aria-hidden="true"><span className="gift-lid"/><span className="gift-box"><Gift size={43} strokeWidth={1.4}/></span><i className="sparkle one">✦</i><i className="sparkle two">✦</i></div></div><div className="benefit-groups">{groups.map(group=><BenefitGroup key={group.id} group={group} onClaim={onClaim} onExplore={onExplore} claimed={claimedCoupons} onSelect={select}/>)}</div></div></div>
  <div className="shell benefit-lower"><section className="benefit-section"><h2>오직 NOL에서만</h2><div className="benefit-exclusive"><article className="exclusive-card orange"><div className="exclusive-head"><span>처음이라면 10% 할인</span><strong>첫 여행의 기분 좋은 시작</strong><Gift size={62}/></div><div className="exclusive-body"><p>· 신규회원 전용 할인 쿠폰</p><p>· 첫 예약을 위한 특별한 가격</p><button onClick={()=>onClaim('welcome-10')}>{claimedCoupons.includes('welcome-10')?'받은 혜택 확인':'가입하고 혜택받기'} <ArrowRight size={16}/></button></div></article><article className="exclusive-card indigo"><div className="exclusive-head"><span>NOL PASS</span><strong>예약할수록 커지는 즐거움</strong><Clock3 size={62}/></div><div className="exclusive-body"><p>· 자주 여행하는 분을 위한 혜택</p><p>· 인기 상품 먼저 둘러보기</p><button onClick={()=>onExplore('hotel')}>멤버십 혜택 보기 <ArrowRight size={16}/></button></div></article><article className="exclusive-card navy"><div className="exclusive-head"><span>NOL 카드</span><strong>놀수록 놀라운 혜택</strong><CreditCard size={62}/></div><div className="exclusive-body"><p>· 카드와 함께하는 여행 혜택</p><p>· 결제할 때 한 번 더 할인</p><button onClick={()=>document.getElementById('payment-benefits')?.scrollIntoView({behavior:'smooth'})}>결제 혜택 보기 <ArrowRight size={16}/></button></div></article></div></section>
  <section className="benefit-section"><h2>지금 놓치면 아까운 혜택</h2><div className="benefit-quick-grid">{quick.map(offer=><OfferRow key={offer.id} offer={offer} onClaim={onClaim} onExplore={onExplore} claimed={false} compact/>)}</div></section>
  <section className="benefit-section" id="payment-benefits"><div className="benefit-section-heading"><h2>결제할 때, 한번 더 할인!</h2><button onClick={()=>onExplore('all')}>결제 혜택 전체보기 <ChevronRight size={17}/></button></div><div className="benefit-payment-grid">{payments.map(offer=><button key={offer.title} onClick={()=>onExplore('all')}><OfferThumb offer={offer}/><span><strong>{offer.title}</strong><small>{offer.desc}</small></span><ChevronRight size={18}/></button>)}</div></section></div>
 </>:<div className="shell benefit-category-page"><div className={`benefit-category-hero ${active}`}><span>{activeGroup.label} 혜택</span><h1>{active==='domestic'?'여행을 떠나기 좋은 이유':active==='oversea'?'멀리 떠나는 설렘을 더 가볍게':'좋아하는 무대를 더 가까이'}</h1><p>지금 받을 수 있는 혜택을 살펴보세요.</p><div className="category-hero-icon">{active==='domestic'?<MapPin size={70}/>:active==='oversea'?<Plane size={70}/>:<Ticket size={70}/>}</div></div><div className="benefit-category-title"><h2>{activeGroup.label} 혜택 모아보기</h2><p>받은 쿠폰은 이 브라우저에 저장됩니다.</p></div><div className="benefit-category-list">{activeGroup.rows.map(row=><OfferRow key={row.id} offer={row} onClaim={onClaim} onExplore={onExplore} claimed={claimedCoupons.includes(row.id)}/>)}</div><button className="benefit-back" onClick={()=>select('all')}>← 전체 혜택 둘러보기</button></div>}
 </div>
}
