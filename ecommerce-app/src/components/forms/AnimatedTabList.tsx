import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface TabItem<T extends string | number> {id: T;label: string;icon?: ReactNode;}
interface TabListBlockProps<T extends string | number> { items: TabItem<T>[]; activeItem: T; onChange: (id: T) => void; className?: string;}

export default function TabListBlock<T extends string | number>({ items, activeItem, onChange, className = ""}: TabListBlockProps<T>) {
  return (
    <div className={className} style={{ position: "relative" }}>
      {items.map((item) => (
        <motion.div key={item.id} className="link_item flex_between_center"
          onClick={() => onChange(item.id)}
          style={{cursor: "pointer", position: "relative",  zIndex: 2}}>
            
          <div className="flex_start_center gap_12 link_item__content">
            {item.icon}
            <span className="text text_md">{item.label}</span>
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
        </motion.div>
      ))}
    </div>
  );
}