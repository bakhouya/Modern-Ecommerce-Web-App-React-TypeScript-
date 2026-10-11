import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ROUTES from '../../../routers/dashboard/path';
interface Props {
  step: number;
  totalSteps: number;
  stepTitles: string[];
  onStepClick: (step: number) => void;
}

export const StepsNavigation: React.FC<Props> = ({
  step,
  totalSteps,
  stepTitles,
  onStepClick,
}) => {
  return (
    <aside className="nav_container">
      <div className="scroll">
        <div className="flex_start_center gap_12 my_end_12">
          <Link to={ROUTES.OFFERS} className="btn_icon bg_base md">
            <ChevronLeft size={19} />
          </Link>
          <div className="text text_xl">Étapes Création</div>
        </div>

        <div className="divider my_8" />

        <div className="etaps_items">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <button
              key={s}
              type="button"
              className={`etaps_item ${s === step ? 'active' : ''} ${s < step ? 'completed' : ''}`}
              onClick={() => onStepClick(s)}
            >
              <div className="flex_start_center gap_12">
                <span className="etaps_number">{s}</span>
                <div className="text text_md weight_500">{stepTitles[s - 1]}</div>
              </div>
              {s < step && <span className="text text_lg etaps_check">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};