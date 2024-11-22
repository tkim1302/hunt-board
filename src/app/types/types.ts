export interface Job {
  _id: string;
  jobTitle: string;
  company: string;
  postURL?: string;
  salary?: string;
  location?: string;
  deadline?: string;
}

export interface Section {
  _id: string;
  title: string;
  jobs?: Job[];
}

export interface Collection {
  email: string;
  sections: Section[];
}
