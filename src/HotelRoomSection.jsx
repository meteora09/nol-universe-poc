import React, {useMemo} from 'react';
import {ChevronRight, Info, Users} from 'lucide-react';
import {money} from './data';
import {demoRooms, lowestEligibleRoom} from './hotelRoomExperiment';
import './hotel-room.css';

export default function HotelRoomSection({product, guests, showSummary}) {
  const rooms = useMemo(() => demoRooms(product, guests), [product, guests]);
  const cheapest = lowestEligibleRoom(rooms);
  const jumpToRooms = () => document.getElementById('hotel-room-list')?.scrollIntoView({behavior: 'smooth', block: 'start'});
  return <section className="hotel-rooms" aria-label="객실 선택 예시">
    <div className="hotel-rooms-heading"><div><span className="eyebrow">ROOMS</span><h2>객실 선택</h2></div><span className="hotel-rooms-demo"><Info size={14}/> PoC 예시 · 실시간 재고 아님</span></div>
    {showSummary && cheapest && <div className="hotel-room-summary">
      <div className="hotel-room-summary-copy"><span className="hotel-room-pill">예약 가능 객실 요약 예시</span><h3>{cheapest.name} · {money(cheapest.price)}부터</h3><p><Users size={16}/> 최대 {cheapest.capacity}명 <span>·</span> {cheapest.cancellation}</p><small>실제 예약 가능 여부·가격·취소 규정은 제공되지 않습니다.</small></div>
      <button type="button" onClick={jumpToRooms}>객실 비교하기 <ChevronRight size={17}/></button>
    </div>}
    <div id="hotel-room-list" className="hotel-room-list">
      {rooms.map(room => <article className="hotel-room-option" key={room.id}>
        <div><strong>{room.name}</strong><span>최대 {room.capacity}명 · {room.cancellation}</span></div>
        <div className="hotel-room-option-price"><strong>{money(room.price)}</strong><span>{room.eligible ? '예시 객실' : '선택 인원 초과'}</span></div>
      </article>)}
    </div>
    {!cheapest && <p className="hotel-room-fallback">선택한 인원에 맞는 예시 객실이 없습니다. 인원을 조정하거나 기존 예약 안내를 확인하세요.</p>}
  </section>;
}
