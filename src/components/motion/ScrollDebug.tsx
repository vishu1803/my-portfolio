'use client';
import { useEffect, useState } from 'react';
import { loadScrollTrigger } from '../../hooks/useScrollScene';
import { isLowPowerDevice } from '../../lib/motionQuality';
import useMotionPreference from '../../hooks/useMotionPreference';
import './ScrollDebug.css';

/** Opt-in diagnostics only. Production UI has no extra steps or debug content. */
export default function ScrollDebug() {
  const [enabled, setEnabled] = useState(false);
  const [reading, setReading] = useState('Waiting for scroll initialization…');
  const reduced = useMotionPreference();
  useEffect(() => {setEnabled(new URLSearchParams(location.search).get('debug') === 'scroll');}, []);
  useEffect(() => {
    if (!enabled) return;
    let live = true;
    let timer = 0;
    let dispose = () => {};
    loadScrollTrigger().then(plugin => {
      if (!live) return;
      const sample = () => {
        const triggers = plugin.getAll();
        const ids = triggers.map(trigger => trigger.vars.id).filter(Boolean);
        const duplicates = [...new Set(ids.filter((id,index) => ids.indexOf(id) !== index))];
        const active = triggers.filter(trigger => trigger.isActive);
        setReading([
          `Viewport: ${innerWidth} × ${innerHeight}`,
          `Low-power/data-saver: ${isLowPowerDevice() ? 'on' : 'off'}`,
          `Triggers: ${triggers.length} / active: ${active.length}`,
          `Pin spacers: ${document.querySelectorAll('.pin-spacer').length}`,
          `Duplicate explicit IDs: ${duplicates.join(', ') || 'none'}`,
          ...active.map(trigger => `${trigger.vars.id || trigger.trigger?.id || trigger.trigger?.classList[0] || 'scene'}: ${Math.round(trigger.progress * 100)}% [${Math.round(trigger.start)}–${Math.round(trigger.end)}]`),
        ].join('\n'));
      };
      const report = () => {
        sample();
        console.table(plugin.getAll().map(trigger => ({id:trigger.vars.id || trigger.trigger?.id || 'scene', active:trigger.isActive, start:trigger.start, end:trigger.end})));
      };
      sample();
      timer = window.setInterval(sample, 1000);
      plugin.addEventListener('refresh', report);
      dispose = () => plugin.removeEventListener('refresh', report);
    });
    return () => {live = false; clearInterval(timer); dispose();};
  }, [enabled]);
  if (!enabled) return null;
  return <aside className="scroll-debug" aria-label="Scroll diagnostics" data-lenis-prevent>
    <strong>SCROLL / DEVELOPER VIEW</strong>
    <pre>{`Reduced / manually paused: ${reduced ? 'on' : 'off'}\n${reading}`}</pre>
  </aside>;
}
