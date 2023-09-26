import {reactivity, ref}  from '@lin-vue/reactivity'
reactivity();
let a = ref('111');
declare global {
	interface Window {
		a: any;
	}
}
window.a = a;
console.log(a)