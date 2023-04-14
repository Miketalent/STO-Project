export interface IGetAllDocuments {
  isFetchAllDocuments: boolean;
  allDocuments: string[];
}

export interface IGetDocument {
  documentName: string;
  documentData: IDocument;
}

export interface ISetDocument {
  documentName: string;
  documentUrl: string;
  documentHash: string;
}

export interface IRemoveDocument {
  documentName: string;
}

export interface IDocument {
  docUri: string;
  docHash: string;
  docTimestamp: number;
}