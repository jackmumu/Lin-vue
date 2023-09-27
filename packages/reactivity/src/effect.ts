import { isArray } from "@lin-vue/shared";
export let activeEffect:any = undefined;
export let shouldTrack = true;
let effectTrackDepth = 0
let maxMarkerBits = 30
export function triggerEffects(dep:any,debuggerEventExtraInfo?:any){
    const effects = isArray(dep) ? [...dep] : [...dep]
    for(const effect of effects){
        if(effect.computed){
            triggerEffect(effect,debuggerEventExtraInfo);
        }
    }
    for(const effect of effects){
        if(!effect.computed){
            triggerEffect(effect,debuggerEventExtraInfo);
        }
    }
}
export function triggerEffect(effect:any,debuggerEventExtraInfo?:any){
    if(effect !== activeEffect || effect.allowRecurse){
       if(effect.scheduler){
        effect.scheduler();
       }else{
        effect.run();
       }
    }
}
export function trackEffects(dep:any,debuggerEventExtraInf?:any){
  let shouldTrack = false;
  if(effectTrackDepth <= maxMarkerBits){

  }
}