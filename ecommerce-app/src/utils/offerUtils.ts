



export type OfferStatus = | "active" | "upcoming" | "expired" | "unknown";

export function formatOfferPrice(value: string | number): string {
  return `${Number(value).toLocaleString("fr-FR", {maximumFractionDigits: 2})} DH`;
}
export function formatOfferDate(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("fr-FR", {day: "numeric",month: "long",year: "numeric"}).format(date);
}
export function getOfferStatus(startDate?: string | null,endDate?: string | null): OfferStatus {
    const now = Date.now();
    const start = startDate ? new Date(startDate).getTime() : NaN;
    const end = endDate ? new Date(endDate).getTime() : NaN;
    if ((startDate && !Number.isFinite(start)) || (endDate && !Number.isFinite(end))) {return "unknown";}
    if (Number.isFinite(start) && now < start) {return "upcoming";}
    if (Number.isFinite(end) && now > end) {return "expired";}
    return "active";
}
export function getDiscountLabel(fixedAmount?: string | number | null, percentage?: string | number | null): string | null {
  
  if (percentage !== null && percentage !== undefined && percentage !== "") {
    const value = Number(percentage);
    if (Number.isFinite(value)) {return `−${value}%`;}
  }

  if ( fixedAmount !== null && fixedAmount !== undefined && fixedAmount !== "") {
    const value = Number(fixedAmount);
    if (Number.isFinite(value)) {return `−${formatOfferPrice(value)}`;}
  }

  return null;
}


