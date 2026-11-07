
import type { ReactNode } from "react";

export function OrdersHeader({title, subtitle, children,}: {title: string; subtitle?: string; children?: ReactNode;}) {
  return (
    <div className="orders_header">
      <div className="orders_header__left">
        <div className="text text_xl weight_600">{title}</div>
        {subtitle && <div className="text text_sm">{subtitle}</div>}
      </div>
      {children && <div className="orders_header__actions">{children}</div>}
    </div>
  );
}