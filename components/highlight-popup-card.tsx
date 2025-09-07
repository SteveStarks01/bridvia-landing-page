"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2 } from "lucide-react";
import HighlightCard from "./highlight-card";

type HighlightPopupCardProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HighlightPopupCard = ({
  isOpen,
  onClose,
}: HighlightPopupCardProps) => {
  const opportunityContent = {
    title: "Premium Opportunities",
    description: [
      "We are currently partnering with leading companies",
      "to bring you the most valuable internship and career opportunities.",
      "Our curated opportunities will be available soon."
    ],
    icon: <Building2 className="w-8 h-8 text-white" />
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
            
            <HighlightCard
              title={opportunityContent.title}
              description={opportunityContent.description}
              icon={opportunityContent.icon}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HighlightPopupCard;