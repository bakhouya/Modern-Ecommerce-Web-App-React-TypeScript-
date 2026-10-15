


import type { ServiceTypes } from "../../../types/serviceTypes";

interface ServicesProps {
  services: ServiceTypes[];
}

const Services = ({ services }: ServicesProps) => {
  return (
    <section className="services web_container">

        <div className="section-header">
            <div className="">
                <div className="text text_xxl weight_600 text_center">  Professional Electrical <span className="text_secondary">Services</span> </div>
                <div className="text text_sm text_center text_white"> Reliable electrical solutions for homes, businesses, and professional installations.</div>
                <span className="header-line"></span>
            </div>
        </div>

        <div className="services__list web_container">
            {services.slice(0, 4).map((service) => (

            <article className="service_card" key={service.id}>
                <div className="service_card__image">
                    <img src={service.image} alt={service.title} loading="lazy"/>
                </div>

                <div className="service_card__content">
                    <h3 className="text text_lg"> {service.title}</h3>
                    <div className="text text_sm p_limit_2">{service.description}</div>
                </div>
            </article>

            ))}
        </div>
    </section>
  );
};

export default Services;