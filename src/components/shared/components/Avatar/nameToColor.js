const letterToColor = {
  '': '#D1D1D1',
  '0': '#EAEAEA',
  '1': '#DFDACD',
  '2': '#D4DFCC',
  '3': '#CCDFD1',
  '4': '#CCDFDC',
  '5': '#CCD5DF',
  '6': '#CCCFDF',
  '7': '#DBCCDF',
  '8': '#DFCCCE',
  '9': '#D7D7D7',
  A: '#FFA2A2',
  B: '#E7ECAA',
  C: '#C0E29E',
  D: '#9ECAE2',
  E: '#A89EE2',
  F: '#9EE2AD',
  G: '#E2BB9E',
  H: '#BFDCEC',
  I: '#E2CF9E',
  J: '#BAE781',
  K: '#C8AEB7',
  L: '#7ADADA',
  M: '#EFC24E',
  N: '#97ACF7',
  O: '#D86F6F',
  P: '#F2A4FF',
  Q: '#FDE3A0',
  R: '#85EEA9',
  S: '#F9A272',
  T: '#B2F0E5',
  U: '#C6F3C2',
  V: '#F7EACB',
  W: '#8DA9D6',
  X: '#DAC6ED',
  Y: '#E7EF8B',
  Z: '#D6A5A5',
}

function nameToColor(name) {
  const letter = (name[0] || '').toUpperCase()
  let color = letterToColor[letter] || ''
  if (!color) {
    const code = letter.charCodeAt(0)
    return `hsl(${((code << 5) - code) % 360}, 60%, 80%)`
  }

  return color
}

export default nameToColor
