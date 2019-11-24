const main = () => {
  const a = [0, 0, 1, 1, 1, 2, 3, 2, 3, 4, 5, 4, 4, 4, 4, 3, 3, 4, 5, 4, 5, 6, 6, 7, 6, 7, 8, 9, 10, 11, 12, 12, 12, 11, 11, 11, 11, 11, 10, 11, 10, 9, 8, 7, 8, 7, 7, 6, 6, 5, 5, 4, 3, 3, 4, 3, 2, 3, 4, 4, 4, 5, 5, 6]
  const b = [1, 1, 2, 3, 2, 3, 2, 3, 4, 4, 4, 5, 5, 4, 3, 4, 4, 4, 4, 4, 3, 4, 5, 4, 5, 5, 5, 5, 6, 6, 5, 4, 3, 3, 4, 3, 2, 3, 3, 3, 3, 4, 3, 2, 1, 1, 2, 1, 0, -1, 0, 0, 1, 1, 2, 3, 2, 1, 0, 0, 1, 1, 0, 0]
  const side = 15
  const slope = 1 / 3
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('height', side * (8 + b.length - 1 + slope * (Math.max(...a) - Math.min(...a))))
  svg.setAttribute('width',  side * (8 + a.length - 1 + slope * (Math.max(...b) - Math.min(...b))))
  svg.appendChild(lines(a, b, 1, 0, side, slope))
  svg.appendChild(lines(a, b, 0, 1, side, slope))
  document.body.appendChild(svg)

  console.log(a.length, b.length)
  // 64 64 (=4^3)
  console.log(ternaryToDecimal(a), ternaryToDecimal(b))
  // 199763627121872093202573630792
  // 1955758479814127324608301847573
  const da = a.slice(1).map((el, i) => a[i + 1] - a[i])
  const db = b.slice(1).map((el, i) => b[i + 1] - b[i])
  const ternaryMaps = [
    {'-1': 0, 0: 1, 1: 2},
    {'-1': 0, 0: 2, 1: 1},
    {'-1': 1, 0: 0, 1: 1},
    {'-1': 1, 0: 2, 1: 0},
    {'-1': 2, 0: 0, 1: 2},
    {'-1': 2, 0: 1, 1: 0}]
  for (map of ternaryMaps) console.log(ternaryToDecimal(da.map(el => map[el])))
  // 705456388130000142911357268743
  // 1009795853605706114523625584142
  // 134235530354948052064343548366
  // 876620102191124719055243163612
  // 268471060709896104128687096732
  // 439104885300837351974592427683
  for (map of ternaryMaps) console.log(ternaryToDecimal(db.map(el => map[el])))
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
  for (map of ternaryMaps) console.log(ternaryToDecimal(scalarProduct(da, db).map(el => map[el])))
  // 702238757833877250896071384432
  // 1008303357137635513049695503227
  // 134157984568287489041868307539
  // 878345236019177009596598967008
  // 268315969136574978083736615078
  // 442322515596960243989878311994
}

const lines = (a, b, stepX, stepY, side, diff) => {
  let g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  for (let x in a.slice(stepX, a.length + 1)) {
    for (let y in b.slice(stepY, a.length + 1)) {
      y = parseInt(y)
      x = parseInt(x)
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const y1 = y - diff * a[x]
      const y2 = y - diff * a[x + stepX] + stepY
      const x1 = x - diff * b[y]
      const x2 = x - diff * b[y + stepY] + stepX
      line.setAttribute('y1', side * (4 + diff * Math.max(...a) + y1))
      line.setAttribute('y2', side * (4 + diff * Math.max(...a) + y2))
      line.setAttribute('x1', side * (4 + diff * Math.max(...b) + x1))
      line.setAttribute('x2', side * (4 + diff * Math.max(...b) + x2))
      line.setAttribute('stroke', 'black')
      g.appendChild(line)
    }
  }
  return g
}

ternaryToDecimal = t =>
  BigInt(t[t.length - 1]) + (t.length === 1 ? 0n : 3n * ternaryToDecimal(t.slice(0, t.length - 1)))
