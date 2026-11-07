import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  iconVariant: "blue" | "green" | "red" | "orange" | "purple";
  label: string;
  value: string | number;
  sub?: ReactNode;
  footer?: ReactNode;
}

const StatCard = ({
  icon,
  iconVariant,
  label,
  value,
  sub,
  footer,
}: Props) => {
  return (
    <article className="stat_card">
      <div className={`stat_card__icon stat_card__icon--${iconVariant}`}>{icon}</div>
      <div className="stat_card__content">
        <span className="text text_sm">{label}</span>
        <div className="stat_card__value_row">
          <div className="text text_xl text_primary weight_600">{value}</div> {sub}
        </div>
        {footer && <div className="stat_card__footer">{footer}</div>}
      </div>
    </article>
  );
};

export default StatCard;