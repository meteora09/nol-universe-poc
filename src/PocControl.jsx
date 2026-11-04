import React, {useState} from 'react';
import {Check, ClipboardCopy, Info, RotateCcw, UserRound, WandSparkles} from 'lucide-react';
import {personas} from './data';
import './poc-control.css';

export default function PocControl({db,user,page,amplitudeConfig,onFeatureChange,onStart,onResetCurrent,onResetAll,onCopy}){
  const [externalId,setExternalId]=useState('');
  const [personaId,setPersonaId]=useState(user?.sourcePersonaId || personas[0].id);
  const [fresh,setFresh]=useState(true);
  const [error,setError]=useState('');
  const [copied,setCopied]=useState(false);
  const effectiveId=user?.amplitudeUserId || user?.id || '없음';
  const sdkReady=amplitudeConfig.enabled && Boolean(amplitudeConfig.apiKey);
  const currentBookings=db.bookings.filter(booking=>booking.userId===user?.id).length;
  const currentCoupons=(db.couponsByUser?.[user?.id]||[]).length;
  const start=e=>{
    e.preventDefault();
    const id=externalId.trim();
    if(!id){setError('Amplitude User ID를 입력해주세요.');return}
    if(id.length>256 || /[\u0000-\u001f\u007f]/.test(id)){setError('제어 문자 없이 256자 이내로 입력해주세요.');return}
    setError('');
    onStart(id,personaId,fresh);
  };
  const copy=async()=>{try{await onCopy();setCopied(true);window.setTimeout(()=>setCopied(false),2400)}catch{setError('복사할 수 없어요. 브라우저의 클립보드 권한을 확인해주세요.')}};
  return <section className="poc-control shell" aria-label="PoC 시나리오 제어판">
    <div className="poc-control-heading"><div><span className="eyebrow">AMPLITUDE POC LAB</span><h2>시나리오 제어판</h2><p>Amplitude User ID를 붙여넣어 해당 ID의 로컬 여정을 시작하세요. {sdkReady?'SDK가 활성화된 경우 이 ID로 수집과 타게팅이 진행됩니다.':'현재 데이터 전송은 꺼져 있습니다.'}</p></div><span className={`poc-sdk-badge ${sdkReady?'enabled':''}`}>{sdkReady?'SDK 활성':'이벤트 전송 꺼짐'}</span></div>
    <div className="poc-control-grid"><form className="poc-identity-form" onSubmit={start}>
      <div className="poc-form-title"><UserRound size={20}/><strong>Amplitude 사용자로 시작</strong></div>
      <label htmlFor="poc-amplitude-id">Amplitude User ID</label>
      <input id="poc-amplitude-id" autoComplete="off" value={externalId} onChange={e=>{setExternalId(e.target.value);setError('')}} placeholder="Amplitude의 User ID를 붙여넣기" />
      <label htmlFor="poc-persona">목업 화면에 적용할 데모 시나리오</label>
      <select id="poc-persona" value={personaId} onChange={e=>setPersonaId(e.target.value)}>{personas.map(persona=><option key={persona.id} value={persona.id}>{persona.name} · {persona.blurb}</option>)}</select>
      <label className="poc-check"><input type="checkbox" checked={fresh} onChange={e=>setFresh(e.target.checked)}/> 장바구니·찜·최근 본 상품을 비우고 시작</label>
      {error&&<p className="poc-error" role="alert">{error}</p>}
      <button className="poc-start" type="submit"><WandSparkles size={17}/> 이 ID로 여정 시작</button>
      <p className="poc-form-note"><Info size={15}/> 붙여넣은 ID와 목업의 행동 데이터는 이 브라우저에만 저장됩니다. Amplitude ID 숫자값이 아닌 User ID를 사용하세요. 실제 프로필은 가져오지 않습니다.</p>
    </form><div className="poc-debug-card"><div className="poc-form-title"><Info size={20}/><strong>현재 디버그 상태</strong></div>
      <dl><div><dt>적용 User ID</dt><dd className="poc-mono" title={effectiveId}>{effectiveId}</dd></div><div><dt>연결 방식</dt><dd>{user?.amplitudeUserId?'Amplitude ID 연결':user?'PoC 데모 계정':'방문자'}</dd></div><div><dt>SDK</dt><dd>{sdkReady?'활성화':'비활성 · 이벤트 미전송'}</dd></div><div><dt>현재 화면</dt><dd>{page}</dd></div><div><dt>현재 여정</dt><dd>예약 {currentBookings} · 쿠폰 {currentCoupons} · 찜 {db.wishes.length} · 장바구니 {db.cart.length}</dd></div></dl>
      <div className="poc-debug-actions"><button onClick={copy}><ClipboardCopy size={16}/>{copied?<><Check size={14}/> 복사됨</>:'디버그 정보 복사'}</button><button onClick={onResetCurrent} disabled={!user}><RotateCcw size={16}/> 현재 사용자 여정 초기화</button></div>
    </div></div>
    <div className="poc-feature-row"><label>실험 화면 <select value={db.feature.variant} onChange={e=>onFeatureChange({variant:e.target.value})}><option value="control">Control · 기본 예약 버튼</option><option value="treatment">Treatment · 혜택 강조 버튼</option></select></label><label className="poc-toggle"><input type="checkbox" checked={db.feature.guide} onChange={e=>onFeatureChange({guide:e.target.checked})}/> 가이드 미리보기</label><label className="poc-toggle"><input type="checkbox" checked={db.feature.survey} onChange={e=>onFeatureChange({survey:e.target.checked})}/> 설문 미리보기</label><button onClick={onResetAll}><RotateCcw size={15}/> 전체 PoC 데이터 초기화</button></div>
  </section>;
}
