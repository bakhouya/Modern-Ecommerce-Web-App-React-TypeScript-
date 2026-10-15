import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaginationProps { page: number; totalPages: number; onPageChange: (page: number) => void;}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
    const {t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar"; 

    const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
    const NextIcon = isRTL ? ChevronLeft : ChevronRight;

    const getPages = (): (number | string)[] => {
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const pages: (number | string)[] = [];
      const leftSibling = Math.max(page - 1, 2);
      const rightSibling = Math.min(page + 1, totalPages - 1);
      const showLeftDots = leftSibling > 2;
      const showRightDots = rightSibling < totalPages - 1;

      pages.push(1);
      if (showLeftDots) pages.push("...");
      for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);
      if (showRightDots) pages.push("...");
      pages.push(totalPages);

      return pages;
    };

    return (

      <div className="pagination">

        <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="btn_icon md"
            type="button"
            aria-label={t('common.previous')} 
        >
          <PrevIcon size={18} />
        </button>


        {getPages().map((p, index) =>
          p === "..." ? (
            <span key={`dots-${index}`} className="pagination_dots">...</span>
          ) : (
            <button
              key={p}
              className={`btn_icon sm border radius ${p === page ? "bg_2_primary" : ""}`}
              onClick={() => onPageChange(Number(p))}
              type="button"
            >
              <div className="text text_md weight_700">{p}</div>
            </button>
          )
        )}


        <button
            className="btn_icon md"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            type="button"
            aria-label={t('common.next')}
          >
            <NextIcon size={18} />
        </button>
        
      </div>
      
    );


};