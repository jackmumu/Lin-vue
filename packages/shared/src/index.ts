export const hasChanged = (val:any, newVal:any)=>{
    return !Object.is(val, newVal)
}
export * from './general'