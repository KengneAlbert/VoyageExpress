import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs = ({
  tabs,
  activeTab,
  onChange,
  className = "",
}: TabsProps) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2
            ${
              activeTab === tab.id
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
          {tab.badge && (
            <span className="px-2 py-0.5 text-xs bg-orange-600 rounded-full">
              {tab.badge}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
};
