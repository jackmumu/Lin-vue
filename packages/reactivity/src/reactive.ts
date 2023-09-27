export function isReadonly(value: unknown): boolean {
    return !!(value && (value as any)["__v_isReadonly"]);
}
export function isShallow(value: unknown) :boolean{
    return !!(value && (value as any)["__v_isShallow"]);
}