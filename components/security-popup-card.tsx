"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SecurityCard from "./security-card";

type SecurityPopupCardProps = {
  actionType: 'login' | 'register' | 'apply';
  isOpen: boolean;
  onClose: () => void;
};

const SecurityPopupCard = ({
  actionType,
  isOpen,
  onClose,
}: SecurityPopupCardProps) => {
  const getActionContent = () => {
    switch (actionType) {
      case 'login':
        return {
          name: "Login Portal",
          email: "Login access coming soon"
        };
      case 'register':
        return {
          name: "Registration Portal",
          email: "Sign up access coming soon"
        };
      case 'apply':
        return {
          name: "Application Portal",
          email: "Apply access coming soon"
        };
      default:
        return {
          name: "Access Portal",
          email: "Access coming soon"
        };
    }
  };

  const content = getActionContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[400px] flex items-center justify-center"
          >
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-10 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            <SecurityCard
              name={content.name}
              email={content.email}
              delay={10000}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecurityPopupCard;