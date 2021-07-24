const a = {};
a.foo = '-_-?';
a.bar = '-_-;;';
console.log(a);

const key = 'foo';
// console.log(a.key); // 이건 아님!
console.log(a[key]); // 배열틱하지 않나요?

const b = [1, 2, 3, 4];
console.log(b[0]); // 닮았네요?