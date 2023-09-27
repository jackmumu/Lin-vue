import { hasChanged } from '@lin-vue/shared';
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
    console.log(ref)
    document.getElementById('text')!.innerHTML += '1'
}
function triggerRefValue(ref:any){
    console.log(ref+ '收集')
}
export class RefImpl<T> {
    private _rawValue: T
    private _value: T
    constructor(rawValue:T, public readonly __v_isShallow:boolean){
        this._rawValue = __v_isShallow ? rawValue : toRaw(rawValue)
        this._value = __v_isShallow ? rawValue : toReactive(rawValue)
    }
    get value(){
        // 收集依赖
        triggerRefValue(this);
        return this._value
    }
    set value(newValue){
        if(newValue !== this._rawValue){
            this._value = newValue
            this._rawValue = newValue
            trackRefValue(this);
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