

import { ChevronDown, Clock3, FileText } from "lucide-react";
import type { PolicyTypes } from "../../../types/policyTypes";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {return null;}
  return new Intl.DateTimeFormat("fr-FR", {day: "2-digit",month: "long",year: "numeric"}).format(parsedDate);
};
interface Props { policy: PolicyTypes;  index: number;  expanded: boolean; onToggle: () => void ;}

export default function PolicyCard({ policy, index, expanded, onToggle}: Props) {
    const { t } = useTranslation();
    const date = formatDate(policy.updated_at);



    return (
        <article className={`policy-card ${expanded ? "is-expanded" : ""}`}>
        <button type="button" className="policy-card__trigger" onClick={onToggle} aria-expanded={expanded} aria-controls={`policy-content-${policy.id}`}>
            <span className="policy-card__icon" aria-hidden="true"><FileText size={23} strokeWidth={1.8} /></span>

            <span className="policy-card__heading">
                <span className="policy-card__eyebrow">
                    {t("store.policies.document")}{" "}
                    {String(index + 1).padStart(2, "0")}
                </span>
                <span className="policy-card__title">{policy.title}</span>
                {date && (<span className="policy-card__date"><Clock3 size={14} /> 
                    {t("store.policies.updatedAt", {date})} 
                </span>)}
            </span>

            <span className="policy-card__chevron" aria-hidden="true"><ChevronDown size={20} /></span>
        </button>

        {expanded && (
            <div id={`policy-content-${policy.id}`}className="policy-card__content"> 
                <div className="policy-card__divider" />
                <div className="policy-card__description">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            a: ({ href, children }) => (
                                <a href={href} target="_blank" rel="noopener noreferrer"> {children}</a>
                            ),
                        }}
                    >
                        {policy.description ?? ""}
                    </ReactMarkdown>
                </div>
            </div>
        )}
        </article>
    );
};

