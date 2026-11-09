// Exact ingested names from the PoC project's Braze event taxonomy.
const event = name => `[Appboy] [Custom Event] ${name}`;
const property = name => `[Custom event property] ${name}`;
const categoryNames = {
  hotel: '호텔/리조트', pension: '펜션/풀빌라', leisure: '국내레저',
  ticket: 'NOL 티켓', flight: '항공', global: '해외숙소',
  tour: '해외투어티켓', transport: '국내교통',
};
const present = fields => Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined && value !== null && value !== ''));
const wrap = (name, fields = {}) => ({eventType: event(name), properties: present(Object.fromEntries(Object.entries(fields).map(([key, value]) => [property(key), value])))});
const baseProduct = product => ({
  property_id: product.id,
  property_name: product.title,
  category_id: product.category,
  category_name: categoryNames[product.category],
  city_name: product.region,
});

export function searchTag(keyword, category) {
  if (!keyword?.trim()) return null;
  return wrap('Search', {keyword: keyword.trim(), category_name: categoryNames[category]});
}

export function detailTag(product) {
  if (product.category === 'flight') return wrap('click_flight_detail');
  if (product.category === 'transport') return wrap('click_trans_detail', {
    category_id: product.category,
    category_name: categoryNames[product.category],
    property_price: product.price,
  });
  return wrap('click_product_detail', {
    ...baseProduct(product),
    property_price: product.price,
    subcategory: product.genre,
  });
}

export function favoriteTag(product, wasFavorite) {
  if (product.category === 'ticket') {
    return wasFavorite
      ? wrap('undo_add_to_favorite_enter', {property_id: product.id, property_name: product.title})
      : wrap('add_to_favorite_enter', {...baseProduct(product), subcategory: product.genre});
  }
  if (wasFavorite || ['flight', 'transport'].includes(product.category)) return null;
  return wrap('add_to_favorite', baseProduct(product));
}

export function cartIntroTag(items) {
  const distinctCategories = [...new Set(items.map(item => item.category))];
  return wrap('click_cart_Intro', {
    cart_amount: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    cart_category: distinctCategories.length === 1 ? categoryNames[distinctCategories[0]] : undefined,
    cart_category_cnt: distinctCategories.length,
  });
}

export function checkoutIntroTags(items, date, guests) {
  return items.filter(Boolean).map(item => {
    if (item.category === 'flight') return wrap('click_flight_orderintro', {departure_date: date, cust_count: guests});
    if (item.category === 'ticket') return wrap('click_booking_cta', {
      ...baseProduct(item), check_in_date: date, subcategory: item.genre,
    });
    return wrap('click_order_Intro', {
      item_id: item.id,
      item_name: item.title,
      category_id: item.category,
      reserve_price: item.price * item.quantity,
      check_in_date: date,
    });
  });
}

export function bookingCompleteTags(items, booking) {
  const names = {
    global: 'composite_order_complete',
    tour: 'composite_tna_ordercomplete',
    ticket: 'composite_enter_ordercomplete',
    flight: 'composite_flight_ordercomplete',
  };
  return items.filter(Boolean).map(item => {
    const common = {
      composite_order_id: booking.id,
      paid_amount: item.price * item.quantity,
      cust_count: booking.guests,
    };
    if (item.category === 'flight') return wrap(names.flight, {...common, departure_date: booking.date});
    return wrap(names[item.category] || 'composition_order_complete', {
      ...common,
      item_id: item.id,
      item_name: item.title,
      check_in_date: booking.date,
    });
  });
}

export function signupTag(joinDate) {
  return wrap('signup_done', {join_date: joinDate});
}
