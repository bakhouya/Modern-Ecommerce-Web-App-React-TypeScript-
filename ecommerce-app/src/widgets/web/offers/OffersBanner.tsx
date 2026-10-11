import { useState, useEffect } from 'react';
import type { OfferTypes } from '../../../types/offersTypes';



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
        <div key={offer.id} className={`col_2 index_category_item ${index === 0 ? 'offer_1_card' : 'offer_2_card'}`}>
          <img src={offer.image} alt={offer.title}/>

          {/* <div className="content_z_index">
            <div>

              <div className="text text_xl weight_600 text_primary p_limit_1">50% { offer.title }</div>
              <div className="text text_sm white p_limit_2">{ offer.description }</div> 

            </div>
          </div> */}
          
        </div>
      ))}
    </section>
  );
}