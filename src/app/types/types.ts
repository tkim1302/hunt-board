export interface Job {
  jobTitle: string;
  company: string;
  postURL?: string;
  salary?: string;
  location?: string;
  deadline?: Date;
}

export interface Section {
  title: string;
  jobs?: Job[];
}

export interface Collection {
  email: string;
  sections: Section[];
}
