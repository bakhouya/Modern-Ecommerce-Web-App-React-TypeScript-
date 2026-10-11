

import React from 'react';

import type { CategoryTypes } from '../../../types/categoryTypes';
import { Link } from 'react-router-dom';
import WEBROUTES from '../../../routers/web/path';

interface Props {category: CategoryTypes ; index: number}

const CategoryCard: React.FC<Props> = ({ category, index }) => {

  return (

    <Link to={WEBROUTES.CATEGORY(category.id)} className="category-card" style={{"--category-index": index} as React.CSSProperties}>
      <div className="category-card__icon-wrapper">
        <img src={category.image} alt={category.title} className="category-card__icon" loading="lazy"/>
      </div>
      <div className="text text_sm text_center p_limit_1"> {category.title} </div>
    </Link>

  );
  
};

export default CategoryCard;
