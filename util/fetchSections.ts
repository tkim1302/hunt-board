import { Section } from "@/app/types/types";

const fetchSections = async (
  setSections: (sections: Section[]) => void,
  SetLastUpdated: (lastUpdated: Date) => void,
) => {
  try {
    const response = await fetch("/api/section/get");
    if (!response.ok) {
      throw new Error("Failed to fetch sections data");
    }
    const result = await response.json();
    setSections(result.sections);
    SetLastUpdated(result.lastUpdated);
  } catch {
    alert("Error fetching data. Please try again later");
  }
};

export default fetchSections;
