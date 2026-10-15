

import { useTranslation } from "react-i18next";
import {ChevronRight, X, ChevronLeft} from "lucide-react";
import type { CategoryTypesParents } from "../../../types/categoryTypes";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import WEBROUTES from "../../../routers/web/path";

interface CategoryMenuProps {isOpen: boolean; onClose: () => void; categories: CategoryTypesParents[]; }

const CategoryMenu = ({ categories, isOpen, onClose }: CategoryMenuProps) => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState<CategoryTypesParents | null>(null);
    const categoryMenuRef = useRef<HTMLDivElement>(null);

    const Onclose = () =>  {onClose() ; setActiveCategory(null) ;} 
    if (!isOpen) return null;

    return (

        <div className="overlay_menu">
            <div className="category_dropdown" ref={categoryMenuRef}>

                <div className="category_dropdown__parents">
                    <div className="children_header flex_between_center">
                        <div className="text text_lg weight_600"> {t("store.drops.catalogMenu")} </div>
                        <button className="btn_icon md" onClick={Onclose}>
                            <X/>
                        </button>
                    </div>

                    {categories?.map((category) => (
                        <div key={category.id} className="category_item flex_between_center" onClick={() => setActiveCategory(category)}>
                            <div className="flex_start_center gap_12">
                                <img src={category.image} alt="" loading="lazy" width="20"/>
                                <span className="text text_sm"> {category.title} </span>
                            </div>
                            {category.children?.length > 0 && ( <ChevronRight size={16} /> )}
                        </div>
                    ))}

                </div>

                {activeCategory &&
                    activeCategory.children?.length > 0 && (
                        <div className="category_dropdown__children">

                            <div className="children_header flex_start_center gap_6">
                                <button type="button" className="btn_icon md border" onClick={() => setActiveCategory(null) }>
                                    <ChevronLeft size={17}/>
                                </button>
                                <div className="text text_lg weight_600"> {activeCategory.title} </div>
                            </div>

                            <div className="children_list">
                            {activeCategory.children.filter((child) => child.status).map((child) => (
                                <Link to={WEBROUTES.CATEGORY(child.id)} key={child.id} className="child_category" onClick={Onclose}>
                                    <div className="text text_center text_sm"> {child.title} </div>
                                </Link>
                            ))}
                            </div>

                        </div>
                    )}

            </div>
        </div>

    );

};

export default CategoryMenu;