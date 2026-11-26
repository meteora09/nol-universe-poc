import test from 'node:test';
import assert from 'node:assert/strict';
import {demoRooms, isDemoHotelEligible, lowestEligibleRoom, normalizeRoomFlagValue, resolveRoomVariant} from '../src/hotelRoomExperiment.js';
import {bookingCompleteTags} from '../src/tagging.js';

const hotel = {id: 'jeju-ocean', category: 'hotel', price: 128000};

test('ordinary web includes the explicit hotel demo cohort', () => {
  assert.equal(isDemoHotelEligible(hotel), true);
  assert.equal(isDemoHotelEligible({...hotel, id: 'demo-hotel-7'}), false);
  assert.equal(isDemoHotelEligible({...hotel, category: 'pension'}), false);
});

test('summary selects the cheapest eligible room and falls back when none fit', () => {
  assert.equal(lowestEligibleRoom(demoRooms(hotel, 3))?.id, 'deluxe');
  assert.equal(lowestEligibleRoom(demoRooms(hotel, 5)), null);
});

test('web card requires a live treatment flag and otherwise fails closed', () => {
  assert.equal(normalizeRoomFlagValue('on'), 'treatment');
  assert.equal(normalizeRoomFlagValue('control'), 'control');
  assert.equal(normalizeRoomFlagValue(undefined), null);
  assert.equal(resolveRoomVariant(null, true), 'control');
  assert.equal(resolveRoomVariant('control', true), 'control');
  assert.equal(resolveRoomVariant('treatment', false), 'control');
  assert.equal(resolveRoomVariant('treatment', true), 'treatment');
});

test('existing hotel booking completion still produces one dedicated event', () => {
  const tags = bookingCompleteTags([{...hotel, title: '제주 오션뷰 스테이', quantity: 1}], {id: 'NOL123', guests: 2, date: '2026-12-01'});
  assert.equal(tags.length, 1);
  assert.equal(tags[0].eventType, '[Appboy] [Custom Event] composition_order_complete');
});
