export interface Projects {
  projects: Project[];
  totalCount: number;
}

export interface Project {
  projectId: number;
  acronym: string;
  title: string;
  primaryTaxonomyNodes: TaxonomyNode[];
  additionalTaxonomyNodes: TaxonomyNode[];
  startTrl: number;
  currentTrl: number;
  endTrl: number;
  benefits: string;
  description: string;
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  statusDescription: "Active" | "Completed" | "Canceled" | "Not Started";
  programDirectors: Contact[];
  programExecutives: Contact[];
  programManagers: Contact[];
  projectManagers: Contact[];
  principalInvestigators: Contact[];
  coInvestigators: Contact[];
  website: string;
  libraryItems: LibraryItem[];
  transitions: [];
  responsibleMd: ResponsibleMd;
  program: {
    acronym: string;
    active: boolean;
    description: string;
    programId: number;
    responsibleMd: ResponsibleMd;
    responsibleMdId: number;
    stockImageFileId: number;
    title: string;
  };
  leadOrganization: Organization;
  supportingOrganizations: Organization[];
  coFundingPartners: Organization[];
  statesWithWork: {
    abbreviation: string;
    country: Country;
    countryId: number;
    name: string;
    stateTerritoryId: number;
  }[];
  lastUpdated: string;
  releaseStatusString: string;
  endDateString: string;
  startDateString: string;
  viewCount: number;
}

export interface Organization {
  acronym: string;
  canUserEdit: boolean;
  city: string;
  country: Country;
  countryId: number;
  external: boolean;
  linkCount: number;
  organizationId: number;
  organizationName: string;
  organizationType: OrganizationType;
  stateTerritory: {
    abbreviation: string;
    countryId: number;
    name: string;
    stateTerritoryId: number;
    country: Country;
  };
  stateTerritoryId: number;
  naorganization: boolean;
  organizationTypePretty: string;
}

export type OrganizationType =
  | "Academia"
  | "Industry"
  | "International Space Agency"
  | "Non-profit Institution"
  | "Other US Government";

interface TaxonomyNode {
  taxonomyNodeId: number;
  taxonomyRootId: number;
  parentNodeId: number;
  level: number;
  code: string;
  title: string;
  definition: string;
  exampleTechnologies: string;
  hasChildren: boolean;
  hasInteriorContent: boolean;
}

interface Contact {
  contactId: number;
  canUserEdit: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  fullNameInverted: string;
  middleInitial: string;
  primaryEmail: string;
  publicEmail: boolean;
  nacontact: boolean;
}

interface LibraryItem {
  files: [];
  id: number;
  title: string;
  description: string;
  libraryItemTypeId: number;
  projectId: number;
  primary: boolean;
  publishedBy: string;
  publishedDateString: string;
  url: string;
  contentType: {
    lkuCodeId: number;
    code: string;
    description: string;
    lkuCodeTypeId: number;
    lkuCodeType: {
      codeType: string;
      description: string;
    };
  };
}

interface ResponsibleMd {
  acronym: string;
  canUserEdit: boolean;
  city: string;
  external: boolean;
  linkCount: number;
  organizationId: number;
  organizationName: string;
  organizationType: string;
  naorganization: boolean;
  organizationTypePretty: string;
}

interface Country {
  abbreviation: string;
  countryId: number;
  name: string;
}

export interface MapData {
  name: string;
  value: number;
}
