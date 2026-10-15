import { motion } from "framer-motion";
import { GridIcon, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface TabItem<T extends string | number> {
    id: T;
    label: string;
    option: string;
    icon?: ReactNode;
    subcategories?: { id: string; label: string }[]; 
}

interface TabListBlockProps<T extends string | number> {
    items: TabItem<T>[];
    activeItem: T;
    onChange: (id: T) => void;
    className?: string;
}

export default function HomeCategoriesLink<T extends string | number>({
    items,
    activeItem,
    onChange,
    className = ""
}: TabListBlockProps<T>) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<T | null>(null);

    // Exemple de données – tu peux les remplacer par tes vraies catégories
    const categoriesWithSub = items.map(item => ({
        ...item,
        subcategories: getSubcategoriesFor(item.id) // fonction mockée
    }));

    // Fonction mockée – à adapter avec tes vraies données
    function getSubcategoriesFor(id: T) {
        const map: Record<string, { id: string; label: string }[]> = {
            'electronique': [
                { id: 'tel', label: 'Téléphones' },
                { id: 'ordi', label: 'Ordinateurs' },
                { id: 'tv', label: 'Téléviseurs' }
            ],
            'mode': [
                { id: 'homme', label: 'Homme' },
                { id: 'femme', label: 'Femme' },
                { id: 'enfant', label: 'Enfant' }
            ],
            'maison': [
                { id: 'meuble', label: 'Meubles' },
                { id: 'decoration', label: 'Décoration' }
            ],
            // ... ajoute pour les autres
        };
        return map[String(id)] || [];
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className={className} style={{ position: "relative" }}>

            {/* ===== Bouton Tous Categories ===== */}
            <motion.div
                className="link_item flex_between_center all_menu"
                style={{ cursor: "pointer", position: "relative", zIndex: 2 }}
                onClick={toggleMenu}>
                <div className="flex_start_center gap_7 link_item__content">
                    <GridIcon size={17} />
                    <span className="text text_sm"> Tous Categories </span>
                </div>
            </motion.div>

            {/* ===== Mega Menu ===== */}
            {isMenuOpen && (
                <div className="mega_menu">
                    {/* Colonne gauche : catégories principales */}
                    <div className="mega_menu__categories">
                        {categoriesWithSub.map((cat) => (
                            <div
                                key={String(cat.id)}
                                className={`mega_menu__cat_item ${hoveredCategory === cat.id ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredCategory(cat.id)}
                                onMouseLeave={() => setHoveredCategory(null)}>
                                <span className="text text_sm">{cat.label}</span>
                                <ChevronRight size={14} />
                            </div>
                        ))}
                    </div>

                    {/* Colonne droite : sous-catégories de la catégorie survolée */}
                    <div className="mega_menu__subcategories">
                        {hoveredCategory ? (
                            <>
                                {categoriesWithSub
                                    .find(c => c.id === hoveredCategory)
                                    ?.subcategories?.map(sub => (
                                        <Link key={sub.id} to={`/categories/${hoveredCategory}/${sub.id}`} className="mega_menu__sub_item text text_sm">
                                            {sub.label}
                                        </Link>
                                    ))}
                                {categoriesWithSub.find(c => c.id === hoveredCategory)
                                    ?.subcategories?.length === 0 && (
                                    <span className="text text_sm text_muted">
                                        Aucune sous catégorie
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="text text_sm text_muted">
                                Survole une catégorie pour voir les sous‑catégories
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Le reste des onglets (les autres catégories) */}
            <div className="flex_start_center">
                {items.map((item) => (
                    <Link
                        to={"#"}
                        key={item.id}
                        className="link_item flex_between_center"
                        onClick={() => onChange(item.id)}
                        style={{ cursor: "pointer", position: "relative", zIndex: 2 }}>

                        <div  className={`flex_start_center gap_6 link_item__content ${activeItem === item.id ? "link_active" : ""} `}>
                            {item.icon}
                            <span className="text_sm text">{item.label}</span>
                            {item.option && ( <span className="text_xs text white bg_danger radius_10 px_4 ">{item.option}</span> ) }
                        </div>

                        {activeItem === item.id && (
                            <motion.div
                                layoutId="highlight"
                                className="active_background"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                                style={{ zIndex: 1 }}
                            />
                        )}
                    </Link>
                ))}
            </div>

        </div>
    );
}