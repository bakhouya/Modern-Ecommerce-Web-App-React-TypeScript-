

import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  items: string[];
  onSelect: (q: string) => void;
  onRemove: (q: string) => void;
  onClear: () => void;
}

export default function SearchHistory({ items, onSelect, onRemove, onClear }: Props) {
  if (items.length === 0) {
    return (
      <div className="search-state">
        <p className="text text_lg">What are you looking for?</p>
        <p className="text text_sm">Type a product, a brand or a category and press Search.</p>
      </div>
    );
  }

  return (
    <section className="search-history">
      <div className="search-history__head">
        <h2 className="text text_lg">Recent searches</h2>
        <button className="text text_sm text_primary" onClick={onClear}>Clear all</button>
      </div>

      <Swiper className="search-history__list" slidesPerView={2} spaceBetween={10} grabCursor={true} >
        {items.slice(0, 3).map((q) => (
            <SwiperSlide key={q} className="search-history__slide">
                <li className="chip" onClick={() => onSelect(q)}>
                    <button className="text text_sm p_limit_1">{q}</button>
                    <button className="text text_sm" onClick={() => onRemove(q)} aria-label={`Remove ${q}`}> <X size={17}/> </button>
                </li>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}