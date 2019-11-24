const a = [0, 0, 1, 1, 1, 2, 3, 2, 3, 4, 5, 4, 4, 4, 4, 3, 3, 4, 5, 4, 5, 6, 6, 7, 6, 7, 8, 9, 10, 11, 12, 12, 12, 11, 11, 11, 11, 11, 10, 11, 10, 9, 8, 7, 8, 7, 7, 6, 6, 5, 5, 4, 3, 3, 4, 3, 2, 3, 4, 4, 4, 5, 5, 6]
const b = [1, 1, 2, 3, 2, 3, 2, 3, 4, 4, 4, 5, 5, 4, 3, 4, 4, 4, 4, 4, 3, 4, 5, 4, 5, 5, 5, 5, 6, 6, 5, 4, 3, 3, 4, 3, 2, 3, 3, 3, 3, 4, 3, 2, 1, 1, 2, 1, 0, -1, 0, 0, 1, 1, 2, 3, 2, 1, 0, 0, 1, 1, 0, 0]

console.log(a.length, b.length)
// 64 64

const ternToDec = t =>
  BigInt(t[t.length - 1]) + (
    t.length === 1
      ? 0n
      : 3n * ternToDec(t.slice(0, t.length - 1))
      )

console.log(String.fromCharCode(ternToDec(a).toString()))
// 199763627121872093202573630792
console.log(ternToDec(b))
// 1955758479814127324608301847573

const da = a.slice(1).map((el, i) => a[i + 1] - a[i])
const db = b.slice(1).map((el, i) => b[i + 1] - b[i])
const ternMaps = [
  { '-1': 0, 0: 1, 1: 2 },
  { '-1': 0, 0: 2, 1: 1 },
  { '-1': 1, 0: 0, 1: 1 },
  { '-1': 1, 0: 2, 1: 0 },
  { '-1': 2, 0: 0, 1: 2 },
  { '-1': 2, 0: 1, 1: 0 }]
for (map of ternMaps) console.log(ternToDec(da.map(el => map[el])))
// 705456388130000142911357268743
// 1009795853605706114523625584142
// 134235530354948052064343548366
// 876620102191124719055243163612
// 268471060709896104128687096732
// 439104885300837351974592427683
for (map of ternMaps) console.log(ternToDec(db.map(el => map[el])))
// 731558349827332802295893050168
// 938179400733242144897538721034
// 190680486169034918276580050913
// 778901687621328090044620519079
// 381360972338069836553160101826
// 413002923603504692590056646258

const scalarProduct = (v, w) =>
  v.length === w.length
    ? v.map((el, i) => v[i] * w[i])
    : undefined
for (map of ternMaps) console.log(ternToDec(scalarProduct(da, db).map(el => map[el])))
// 702238757833877250896071384432
// 1008303357137635513049695503227
// 134157984568287489041868307539
// 878345236019177009596598967008
// 268315969136574978083736615078
// 442322515596960243989878311994
