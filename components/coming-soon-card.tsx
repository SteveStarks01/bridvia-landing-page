"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import { IoMdCheckmark } from "react-icons/io";
import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";

type ComingSoonCardProps = {
  delay?: number;
  title?: string;
  subtitle?: string;
};

const ComingSoonCard = ({
  delay = 5000,
  title = "Join Bridvia",
  subtitle = "Coming Soon",
}: ComingSoonCardProps) => {
  const [animationKey, setAnimationKey] = useState(0);
  const delayTime = Math.max(delay, 5000);
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, delayTime);

    return () => clearInterval(interval);
  }, [delayTime]);

  return <ComingSoonCardInner title={title} subtitle={subtitle} key={animationKey} />;
};
export default ComingSoonCard;

const ComingSoonCardInner = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "flex h-[27rem] w-full max-w-[350px] items-center justify-center",
        "rounded-md border border-neutral-300 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900",
        "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]",
      )}
    >
      <InfiniteScrambler />
      <ContainerMask />
      <div
        className={cn(
          "absolute bottom-0 h-1/2 w-[150%] rounded-t-[60%]",
          "bg-gradient-to-b from-[#106861]/20 to-[#0a3d35]/10 shadow-[0_0_900px_rgba(16,104,97,0.3)]",
          "dark:from-[#106861]/30 dark:to-[#0a3d35]/20 dark:shadow-[0_0_900px_rgba(16,104,97,0.4)]",
        )}
      />
      <div className="absolute top-[70%] flex h-12 w-full flex-col items-center justify-center gap-1">
        <div className="flex items-center justify-center text-xs text-[#106861]">
          <motion.p
            initial={{
              x: 8,
            }}
            animate={{
              x: -2,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
              delay: 1.8,
            }}
          >
            {title}
          </motion.p>
          <ComingSoonIcon />
        </div>
        <div className="text-[10px] text-neutral-500">{subtitle}</div>
      </div>
      <div className="relative rounded-[2px] bg-neutral-300/50 px-[3px] py-[3.2px] dark:bg-neutral-950/50">
        <div className="relative h-32 w-24 rounded-[2px] bg-gradient-to-br from-[#106861]/20 to-[#0a3d35]/30 dark:from-[#106861]/30 dark:to-[#0a3d35]/40">
          <BridviaIcon />
        </div>
      </div>
      <div className="absolute left-0 top-0 hidden h-[200px] w-full [background-image:linear-gradient(to_bottom,rgb(23,23,23)_30%,transparent_100%)] dark:block" />
      <div className="absolute left-0 top-0 block h-[200px] w-full [background-image:linear-gradient(to_bottom,rgb(245,245,245)_30%,transparent_100%)] dark:hidden" />
      <div className="absolute left-0 top-4 w-full px-3">
        <h3 className="text-sm font-semibold text-[#106861]">
          Registration Opening Soon
        </h3>
        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
          We're preparing to launch our platform where students and professionals 
          can join our future workforce development program.
        </p>
      </div>
    </div>
  );
};

const BridviaIcon = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 80 96"
        fill="none"
        className="h-16 w-16"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <motion.circle
          cx="40"
          cy="35"
          r="20"
          className="animate-draw-outline stroke-[#106861] [filter:drop-shadow(0_0_6px_#106861)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />
        <motion.path
          d="M25 35 L35 45 L55 25"
          className="animate-draw stroke-[#106861] [filter:drop-shadow(0_0_6px_#106861)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />
        <motion.text
          x="40"
          y="70"
          textAnchor="middle"
          className="fill-[#106861] text-xs font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
        >
          Bridvia
        </motion.text>
      </svg>
    </div>
  );
};

const ComingSoonIcon = () => {
  return (
    <div className="relative">
      <svg width="18" height="18">
        <motion.circle
          cx="9"
          cy="9"
          r="6"
          fill="#106861"
          className="rounded-full [filter:drop-shadow(0_0_1px_#106861)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 2.3,
          }}
        />
      </svg>
      <motion.div
        className="absolute left-[5px] top-[5px] flex items-center justify-center text-white dark:text-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: 2.4,
        }}
      >
        <Clock className="size-2" />
      </motion.div>
    </div>
  );
};

const SCRAMBLED_STRINGS = [
  "BRIDVIA*AFRICA*WORKFORCE*DEVELOPMENT*STUDENTS*COMPANIES*INTERNSHIPS*CAREERS*OPPORTUNITIES*GROWTH*TECHNOLOGY*INNOVATION*FUTURE*TALENT*SKILLS*BRIDVIA*AFRICA*WORKFORCE*DEVELOPMENT*STUDENTS*COMPANIES*INTERNSHIPS*CAREERS*OPPORTUNITIES*GROWTH*TECHNOLOGY*INNOVATION*FUTURE*TALENT*SKILLS*BRIDVIA*AFRICA*WORKFORCE*DEVELOPMENT*STUDENTS*COMPANIES*INTERNSHIPS*CAREERS*OPPORTUNITIES*GROWTH*TECHNOLOGY*INNOVATION*FUTURE*TALENT*SKILLS",
  
  "CONNECTING*TALENT*OPPORTUNITY*PROFESSIONAL*DEVELOPMENT*AFRICA*BRIDVIA*STUDENTS*COMPANIES*GROWTH*CAREERS*FUTURE*WORKFORCE*SKILLS*TECHNOLOGY*INNOVATION*CONNECTING*TALENT*OPPORTUNITY*PROFESSIONAL*DEVELOPMENT*AFRICA*BRIDVIA*STUDENTS*COMPANIES*GROWTH*CAREERS*FUTURE*WORKFORCE*SKILLS*TECHNOLOGY*INNOVATION*CONNECTING*TALENT*OPPORTUNITY*PROFESSIONAL*DEVELOPMENT*AFRICA*BRIDVIA*STUDENTS*COMPANIES*GROWTH*CAREERS*FUTURE*WORKFORCE*SKILLS*TECHNOLOGY*INNOVATION",

  "REGISTRATION*OPENING*SOON*JOIN*BRIDVIA*PLATFORM*AFRICA*FUTURE*WORKFORCE*STUDENTS*PROFESSIONALS*DEVELOPMENT*CAREERS*GROWTH*OPPORTUNITIES*SKILLS*TECHNOLOGY*INNOVATION*REGISTRATION*OPENING*SOON*JOIN*BRIDVIA*PLATFORM*AFRICA*FUTURE*WORKFORCE*STUDENTS*PROFESSIONALS*DEVELOPMENT*CAREERS*GROWTH*OPPORTUNITIES*SKILLS*TECHNOLOGY*INNOVATION*REGISTRATION*OPENING*SOON*JOIN*BRIDVIA*PLATFORM*AFRICA*FUTURE*WORKFORCE*STUDENTS*PROFESSIONALS*DEVELOPMENT*CAREERS*GROWTH*OPPORTUNITIES*SKILLS*TECHNOLOGY*INNOVATION",

  "COMING*SOON*BRIDVIA*CONNECT*LAUNCH*PLATFORM*STUDENTS*COMPANIES*AFRICA*WORKFORCE*DEVELOPMENT*CAREERS*PROFESSIONAL*GROWTH*OPPORTUNITIES*TALENT*SKILLS*TECHNOLOGY*INNOVATION*FUTURE*COMING*SOON*BRIDVIA*CONNECT*LAUNCH*PLATFORM*STUDENTS*COMPANIES*AFRICA*WORKFORCE*DEVELOPMENT*CAREERS*PROFESSIONAL*GROWTH*OPPORTUNITIES*TALENT*SKILLS*TECHNOLOGY*INNOVATION*FUTURE*COMING*SOON*BRIDVIA*CONNECT*LAUNCH*PLATFORM*STUDENTS*COMPANIES*AFRICA*WORKFORCE*DEVELOPMENT*CAREERS*PROFESSIONAL*GROWTH*OPPORTUNITIES*TALENT*SKILLS*TECHNOLOGY*INNOVATION*FUTURE",
];

const InfiniteScrambler = () => {
  const [text, setText] = useState(SCRAMBLED_STRINGS[0]);
  const index = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      index.current = (index.current + 1) % SCRAMBLED_STRINGS.length;
      setText(SCRAMBLED_STRINGS[index.current]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-[15%] max-w-[322px]">
      <p className="leading-2 whitespace-normal break-words font-mono text-[13px] text-neutral-500 opacity-35">
        {text}
      </p>
    </div>
  );
};

const ContainerMask = () => {
  return (
    <>
      <div className="absolute left-0 top-0 hidden h-full w-[80px] [background-image:linear-gradient(to_right,rgb(23,23,23)_20%,transparent_100%)] dark:block" />
      <div className="absolute left-0 top-0 block h-full w-[80px] [background-image:linear-gradient(to_right,rgb(245,245,245)_20%,transparent_100%)] dark:hidden" />
      <div className="absolute right-0 top-0 hidden h-full w-[80px] [background-image:linear-gradient(to_left,rgb(23,23,23)_20%,transparent_100%)] dark:block" />
      <div className="absolute right-0 top-0 block h-full w-[80px] [background-image:linear-gradient(to_left,rgb(245,245,245)_20%,transparent_100%)] dark:hidden" />
    </>
  );
};