import { useState, useEffect } from 'react';
import type { OfferTypes } from '../../../types/offersTypes';
import { Link } from 'react-router-dom';
import WEBROUTES from '../../../routers/web/path';



interface OffersBannerProps {
  offers: OfferTypes[];              
  autoRotate?: boolean;    
  interval?: number;       
}

export default function OffersBanner({ offers, autoRotate = true, interval = 10000}: OffersBannerProps) {

  const [selectedOffers, setSelectedOffers] = useState<OfferTypes[]>([]);

  const pickTwoRandom = (list: OfferTypes[]): OfferTypes[] => {
    if (!list || list.length === 0) return [];
    if (list.length === 1) return [list[0], list[0]];
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };


  useEffect(() => {
    if (offers && offers.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedOffers(pickTwoRandom(offers));
    } else {
      setSelectedOffers([]);
    }
  }, [offers]);


  useEffect(() => {
    if (!autoRotate || !offers || offers.length < 2) return;
    const timer = setInterval(() => { setSelectedOffers(pickTwoRandom(offers));}, interval);
    return () => clearInterval(timer);
  }, [offers, autoRotate, interval]);




  return (
    <section className="category_index row web_container">
      {selectedOffers.map((offer, index) => (
        <Link to={WEBROUTES.PRODUCTSOFFER(offer.id)} key={offer.id} 
          className={`col_2 index_category_item ${index === 0 ? 'offer_1_card' : 'offer_2_card'}`}
          data-aos="fade-in" data-aos-delay={100*index}>
          <img src={offer?.image || ""} alt={offer.title} loading="lazy"/>         
        </Link>
      ))}
    </section>
  );
}