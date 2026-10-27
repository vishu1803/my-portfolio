"use client";
import {useState} from "react";
import {setMotionPaused} from "../../hooks/useMotionPreference";
export default function AnimationToggle(){
 const [paused,setPaused]=useState(false);
 return <button type="button" className="animation-toggle" aria-pressed={paused} onClick={()=>{setPaused(!paused);setMotionPaused(!paused);}}>{paused ? "Resume animations" : "Pause animations"}</button>;
}
