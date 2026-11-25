// Demo-only cohort. Replace these IDs with the audited top-10 property list before launch.
export const demoTopHotelIds = new Set([
  'jeju-ocean', 'seoul-hotel', 'busan-bay',
  'demo-hotel-0', 'demo-hotel-1', 'demo-hotel-2', 'demo-hotel-3',
  'demo-hotel-4', 'demo-hotel-5', 'demo-hotel-6',
]);

// The web PoC shows the treatment on ordinary browsers too. The iOS option is
// an explicit preview of the original Android-only targeting, not UA detection.
export const isDemoHotelEligible = (product, previewPlatform = 'auto') =>
  product?.category === 'hotel' && demoTopHotelIds.has(product.id) && previewPlatform !== 'ios';

export const resolveRoomVariant = (mode, previewVariant, remoteVariant, remoteEnabled) =>
  mode === 'local' ? (previewVariant || 'control') : (remoteEnabled && remoteVariant === 'treatment' ? 'treatment' : 'control');

export const normalizeRoomFlagValue = value => {
  if (value === 'on' || value === 'treatment') return 'treatment';
  if (value === 'off' || value === 'control') return 'control';
  return null;
};

// The repository has no availability API. These options exist only to demonstrate layout and fallback.
export function demoRooms(product, guests) {
  if (!product || product.category !== 'hotel') return [];
  return [
    {id: 'standard', name: '스탠다드', price: product.price, capacity: 2, cancellation: '취소 조건 확인 필요', available: true},
    {id: 'deluxe', name: '디럭스', price: product.price + 28000, capacity: 3, cancellation: '취소 조건 확인 필요', available: true},
    {id: 'family', name: '패밀리', price: product.price + 62000, capacity: 4, cancellation: '취소 조건 확인 필요', available: true},
  ].map(room => ({...room, eligible: room.available && guests <= room.capacity}));
}

export function lowestEligibleRoom(rooms) {
  return rooms.filter(room => room.eligible).sort((a, b) => a.price - b.price)[0] || null;
}
