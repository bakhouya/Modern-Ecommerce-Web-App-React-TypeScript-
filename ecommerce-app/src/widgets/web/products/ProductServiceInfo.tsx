




import { usePublicServices } from "../../../controllers/useServices";

export default function ProductServiceInfo() {
    const {data: services} = usePublicServices();



    const activeServices = (services ?? []).filter((service) => service.status);

    return (
        <section className="product-service-info">
            {activeServices.length > 0 && (
                <div className="product-service-info__services">
                    {activeServices.slice(0, 3).map((service) => {

                        return (
                            <div className="product-service-info__service" key={service.id ?? service.title}>
                                <div className="product-service-info__icon">
                                    <img src={service.image} alt="" loading="lazy"/>
                                </div>

                                <div className="product-service-info__body">
                                    <div className="text text_sm p_limit_1">{service.title}</div>
                                    {/* <div className="text text_xs p_limit_1">{service.description}</div> */}
                                </div>
                            </div>
                        );

                    })}
                </div>
            )}
        </section>
    );
}

