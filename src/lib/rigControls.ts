export type RigControls = {
  aim: (x:number, y:number) => void;
  hover: (value:boolean) => void;
  drag: (pixels:number) => void;
  pause: (value:boolean) => void;
};

/** User intent survives lazy loading, static-mode teardown and rig reconstruction. */
export function createRigControls() {
  let active: RigControls | null = null;
  const intent = {aim:[0,0],hover:false,drag:0,paused:false};
  const controls: RigControls = {
    aim: (x,y) => {intent.aim=[x,y];active?.aim(x,y);},
    hover: value => {intent.hover=value;active?.hover(value);},
    drag: value => {intent.drag=value;active?.drag(value);},
    pause: value => {intent.paused=value;active?.pause(value);},
  };
  return {controls,intent,connect(next:RigControls|null) {
    active=next;
    if (!next) return;
    next.aim(intent.aim[0],intent.aim[1]);
    next.hover(intent.hover);next.drag(intent.drag);next.pause(intent.paused);
  }};
}
