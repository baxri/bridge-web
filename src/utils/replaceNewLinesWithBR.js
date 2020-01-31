export default function replaceNewLinesWithBR(s = '') {
  return (s || '').replace(/(?:\r\n|\r|\n)/g, '<br />')
}
