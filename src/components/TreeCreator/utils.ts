import type {Unterlage, Edelreis} from './types';

// Generate Tree ID in format: Unterlage:Edelreis:Pflanzjahr:Counter
export function generateTreeId(
  unterlageId: string,
  edelreisId: string,
  pflanzjahr: number,
  existingIds: string[],
): string {
  const baseId = `${unterlageId}:${edelreisId}:${pflanzjahr}`;

  // Find existing IDs with same base
  const existingCounters = existingIds
    .filter((id) => id.startsWith(baseId + ':'))
    .map((id) => parseInt(id.split(':')[3], 10))
    .filter((n) => !isNaN(n));

  const nextCounter =
    existingCounters.length > 0 ? Math.max(...existingCounters) + 1 : 1;

  return `${baseId}:${nextCounter.toString().padStart(2, '0')}`;
}

// Map fruchtart to compatible unterlage typ
const FRUCHTART_TO_TYP: Record<string, string> = {
  Apfel: 'Apfel',
  Birne: 'Birne',
  Kirsche: 'Kirsche',
  Mirabelle: 'Kirsche',
  Pflaume: 'Kirsche',
  Pfirsich: 'Kirsche',
};

// Filter compatible Unterlagen for a given Edelreis fruchtart
export function getCompatibleUnterlagen(
  unterlagen: Unterlage[],
  edelreis: Edelreis | null,
): Unterlage[] {
  if (!edelreis) return unterlagen;

  const compatibleTyp = FRUCHTART_TO_TYP[edelreis.fruchtart];
  if (!compatibleTyp) return unterlagen;

  return unterlagen.filter((u) => u.typ === compatibleTyp);
}

// Format date for display (German format)
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format short date for table display
export function formatShortDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('de-DE');
}
