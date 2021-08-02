1. object.values 오류 해결 설명 
const a = {};
const a2 = Object.values(a);
console.log(a2);

const b = undefined;
if (b > '') { // truthy == false
    const b2 = Object.values(b);
    console.log(b2);

} else {
    console.log('b is not ready yet');
}

// const c = 1;
const c = {};
// if (c > '') {
if (typeof c == 'object') {
    const c2 = Object.values(c);
    console.log(c2);

} else {
    console.log('c is not ready');
    // 나름대로 고객에게 화면으로 현재 상황을 알려줘야 한다.
    // 혹은, 그렇지 못하더라도.. 최소한 앱이 죽으면 안 된다.
}