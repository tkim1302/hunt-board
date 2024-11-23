import fetchSections from "../../../util/fetchSections";
import submitForm from "../../../util/submitForm";
import useLastUpdatedTimeStore from "../store/lastUpdatedTimeStore";
import useSectionStore from "../store/sectionStore";

const AddForm: React.FC = () => {
  const { selectedSection } = useSectionStore();
  const { setSectionList } = useSectionStore();
  const { SetLastUpdated } = useLastUpdatedTimeStore();

  return (
    <div className="flex flex-col">
      <h4>Details</h4>
      <form
        onSubmit={async (event) => {
          await submitForm(event, "add");
          fetchSections(setSectionList, SetLastUpdated);
        }}
        className="flex flex-col gap-10"
        action="/api/job/new"
        method="POST"
      >
        <input name="jobTitle" placeholder="Job Title" />
        <input name="company" placeholder="Company" />
        <input name="postURL" placeholder="Post URL" />
        <input name="salary" placeholder="Salary" />
        <input name="location" placeholder="Location" />
        <input type="date" name="deadline" placeholder="Deadline" />
        <input type="hidden" name="section" value={selectedSection} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddForm;
