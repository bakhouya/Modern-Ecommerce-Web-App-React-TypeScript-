



import type { ServiceTypes } from "../../../../types/serviceTypes";
import ServiceCard from "./ServiceCard";

// const services = [
//   {
//     id: 1,
//     variant: "green",
//     title: "Livraison gratuite",
//     subtitle: "Pour toute commande supérieure à 10 $",
//     emoji: "🚚",
//   },
//   {
//     id: 2,
//     variant: "pink",
//     title: "Protection de l’acheteur",
//     subtitle: "Garantie satisfait ou remboursé",
//     emoji: "🛡️",
//   },
//   {
//     id: 3,
//     variant: "blue",
//     title: "Sélection de qualité",
//     subtitle: "Des articles sélectionnés avec soin",
//     emoji: "✨",
//   },
// ];

interface ServicesProps {
  services: ServiceTypes[];
}

const ServicesHome = ({ services }: ServicesProps) => {
  return (
    <section className="home_services web_container">
      <div className="home_services__grid">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index}/>
        ))}
      </div>
    </section>
  );
};

export default ServicesHome;