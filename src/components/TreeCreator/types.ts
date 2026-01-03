export interface Unterlage {
  id: string;
  name: string;
  typ: 'Apfel' | 'Birne' | 'Kirsche';
  beschreibung: string;
  link: string;
}

export interface Edelreis {
  id: string;
  name: string;
  fruchtart: string;
  beschreibung: string;
  link: string;
}

export interface Veredelungsart {
  id: string;
  name: string;
  kategorie: string;
  beschreibung: string;
  link: string;
}

export type PflegeStatus =
  | 'Gesund'
  | 'Schnitt fällig'
  | 'Bewässerung nötig'
  | 'Krankheit'
  | 'Schädlingsbefall'
  | 'Winterruhe';

export interface TreeEntry {
  id: string;
  unterlageId: string;
  edelreisId: string;
  veredelungsartId: string;
  pflanzjahr: number;
  standort: string;
  pflegeStatus: PflegeStatus;
  notizen?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventarData {
  version: string;
  lastUpdated: string | null;
  trees: TreeEntry[];
}
