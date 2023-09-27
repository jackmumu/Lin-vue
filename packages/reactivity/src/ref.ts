import { hasChanged} from '@lin-vue/shared';
import { Dep } from './dep';
import { isReadonly, isShallow } from './reactive';
import { triggerEffects, shouldTrack, activeEffect } from './effect'
function toRaw(observed: any): any {
    return (observed && toRaw(observed["__v_raw"])) || observed
}
function isObject(value: any): boolean {
    return value !== null && typeof value === "object"
}
function createReactiveObject(target: any) {
    
}
function reactive(target: any) {
    return createReactiveObject(target)
}
function toReactive(value: any): any {
    return isObject(value) ? reactive(value) : value
}
function trackRefValue(ref:any){
    if(shouldTrack && activeEffect){
        ref = toRaw(ref)
        trackEffects(ref.dep || (ref.dep = []))
    }
    console.log(ref)
}
export function triggerRefValue(ref:any, newVal?:any){
    ref = toRaw(ref)
    const dep = ref.dep
    if(dep){
        triggerEffects(dep)
    }
    document.getElementById('text')!.innerHTML += '1'
}
export class RefImpl<T> {
    // 储存原始值 方便和新值比较
    private _rawValue: T
    // 储存新值 方便和旧值比较
    private _value: T
    // 储存依赖的数组 用于收集依赖和触发依赖
    public dep?: Dep = undefined
    // 构造器 初始化值
    constructor(rawValue:T, public readonly __v_isShallow:boolean){
        // 判断是否是浅响应式， 如果是浅响应式的话，那么就不需要用reactive包裹一下
        this._rawValue = __v_isShallow ? rawValue : toRaw(rawValue)
        this._value = __v_isShallow ? rawValue : toReactive(rawValue)
    }
    get value(){
        // 收集依赖
        trackRefValue(this);
        return this._value
    }
    set value(newValue){
        const useDirectValue = this.__v_isShallow || isShallow(newValue) || isReadonly(newValue)
        newValue = useDirectValue ? newValue : toRaw(newValue)
        if(hasChanged(newValue, this._rawValue)){
            this._value = newValue
            this._rawValue = useDirectValue ? newValue : toReactive(newValue)
            // 触发依赖
            triggerRefValue(this);
        }
    }
}
function createRef(rawValue:any, shallow:boolean = false) {
   return new RefImpl(rawValue, shallow)
}
// export function ref<T>(value:T){
//     return createRef(value)
// }
export function ref(value:any){
    return createRef(value)
}