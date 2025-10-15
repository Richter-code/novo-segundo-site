/**
 * Converte string de moeda BRL para número decimal
 * Ex: "R$ 12,66" → 12.66
 * Ex: "R$1.234,56" → 1234.56
 */
export function parseCurrencyBRL(value: string): number {
  const cleaned = value
    .replace(/R\$\s?/gi, '')
    .replace(/\./g, '') // remove separador de milhar
    .replace(',', '.') // vírgula decimal vira ponto
    .trim();

  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}
