"use client";
import { useTransition } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toggleHabit } from "@/app/actions";
export function HabitCheck({id,done}:{id:string;done:boolean}) { const [pending,start]=useTransition(); return <motion.button whileTap={{scale:.84}} aria-label={`Mark habit as ${done?'incomplete':'complete'}`} disabled={pending} onClick={()=>start(()=>toggleHabit(id,!done))} className={`grid h-7 w-7 shrink-0 place-items-center border transition ${done?"border-[#58ffbd] bg-[#58ffbd]/15 text-[#58ffbd] shadow-[0_0_14px_rgba(88,255,189,.25)]":"border-[#54ffcd]/35 text-transparent hover:border-[#4eeaff]"}`}>{done&&<Check size={15}/>}</motion.button> }
