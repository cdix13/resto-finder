export interface RestoProps {
  R: R;
  apikey: string;
  id: string;
  name: string;
  url: string;
  location: Location;
  switch_to_order_menu: number;
  cuisines: string;
  timings: string;
  average_cost_for_two: number;
  price_range: number;
  currency: string;
  highlights: string[];
  offers: any[];
  opentable_support: number;
  is_zomato_book_res: number;
  mezzo_provider: string;
  is_book_form_web_view: number;
  book_form_web_view_url: string;
  book_again_url: string;
  thumb: string;
  user_rating: UserRating;
  all_reviews_count: number;
  photos_url: string;
  photo_count: number;
  photos: PhotoElement[];
  menu_url: string;
  featured_image: string;
  has_online_delivery: number;
  is_delivering_now: number;
  include_bogo_offers: boolean;
  deeplink: string;
  is_table_reservation_supported: number;
  has_table_booking: number;
  events_url: string;
  phone_numbers: string;
  all_reviews: AllReviews;
  establishment: string[];
  establishment_types: any[];
}

interface R {
  has_menu_status: HasMenuStatus;
  res_id: number;
}

interface HasMenuStatus {
  delivery: number;
  takeaway: number;
}

interface AllReviews {
  reviews: Review[];
}

interface Review {
  review: any[];
}

interface Location {
  address: string;
  locality: string;
  city: string;
  city_id: number;
  latitude: string;
  longitude: string;
  zipcode: string;
  country_id: number;
  locality_verbose: string;
}

export interface PhotoElement {
  photo: PhotoPhoto;
}

interface PhotoPhoto {
  id: string;
  url: string;
  thumb_url: string;
  user: User;
  res_id: number;
  caption: Caption;
  timestamp: number;
  friendly_time: string;
  width: number;
  height: number;
}

export enum Caption {
  Empty = '',
  PesenMinumnyaGampangPadahal = 'pesen minumnya gampang padahal',
  TehTarik = 'Teh Tarik',
}

interface User {
  name: string;
  zomato_handle?: string;
  foodie_level: FoodieLevel;
  foodie_level_num: number;
  foodie_color: FoodieColor;
  profile_url: string;
  profile_image: string;
  profile_deeplink: string;
}

export enum FoodieColor {
  Ffae4F = 'ffae4f',
  Ffd35D = 'ffd35d',
}

export enum FoodieLevel {
  BigFoodie = 'Big Foodie',
  Foodie = 'Foodie',
}

interface UserRating {
  aggregate_rating: string;
  rating_text: string;
  rating_color: string;
  rating_obj: RatingObj;
  votes: string;
}

interface RatingObj {
  title: Title;
  bg_color: BgColor;
}

interface BgColor {
  type: string;
  tint: string;
}

interface Title {
  text: string;
}
