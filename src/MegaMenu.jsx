import React from 'react';
import {ChevronRight} from 'lucide-react';
import './mega-menu.css';

const columns=[
 {title:'NOL 티켓',emoji:'🎟️',items:[['뮤지컬','ticket:musical'],['콘서트','ticket:concert'],['스포츠','ticket:sports'],['전시/행사','ticket:exhibition'],['클래식/무용','ticket:classical'],['아동/가족','ticket:family'],['연극','ticket:play']]},
 {title:'국내여행',emoji:'🧳',items:[['호텔/리조트','category:hotel'],['펜션/풀빌라','category:pension'],['국내레저','category:leisure'],['국내항공','category:flight'],['국내교통','category:transport']]},
 {title:'해외여행',emoji:'🌐',items:[['해외숙소','category:global'],['해외투어티켓','category:tour'],['해외항공','category:flight']]},
 {title:'서비스',emoji:'🎁',items:[['NOL 특가','page:promo'],['NOL 쿠폰/혜택','page:benefits'],['전체 상품','category:all']]},
];
export default function MegaMenu({onSelect}){return <div className="shell mega-menu-wrap"><div className="mega-menu" id="mega-menu" aria-label="전체 카테고리">{columns.map(column=><div className="mega-column" key={column.title}><h3><span>{column.emoji}</span>{column.title}{column.title==='NOL 티켓'&&<ChevronRight size={18}/>}</h3>{column.items.map(([label,target])=><button key={label} onClick={()=>onSelect(target)}>{label}</button>)}</div>)}</div></div>}
