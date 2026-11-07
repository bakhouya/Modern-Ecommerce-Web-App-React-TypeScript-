

import type { ServiceTypes } from "../../../../types/serviceTypes";
import getImageUrl from "../../../../utils/etImageUrl";

interface ServiceProps {
  service: ServiceTypes;
  index: number ;
}

const ServiceCard = ({ service, index }: ServiceProps) => {
  return (
    <div className={`home_service_card home_service_card__${index} radius_primary`}>
      <div className="home_service_card__content">
        <h6 className="text text_lg  p_limit_1">{service.title}</h6>
        <p className="text text_base white p_limit_2">{service.description}</p>
      </div>
      <div className="home_service_card__emoji">
        <img src={getImageUrl(service.image)} alt="" loading="lazy"/>
      </div>
    </div>
  );
};

export default ServiceCard;