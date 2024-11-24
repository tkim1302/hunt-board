import fetchSections from "../../../util/fetchSections";
import submitForm from "../../../util/submitForm";
import useLastUpdatedTimeStore from "../store/lastUpdatedTimeStore";
import useModalStore from "../store/modalStore";
import useSectionStore from "../store/sectionStore";

const EditForm: React.FC = () => {
  const { selectedSection, setSectionList } = useSectionStore();
  const { selectedJob, closeModal } = useModalStore();
  const { SetLastUpdated } = useLastUpdatedTimeStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await submitForm(event, "edit");
    fetchSections(setSectionList, SetLastUpdated);
    closeModal();
  };

  return (
    <div className="flex flex-col">
      <h4>Edit!!!!</h4>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="flex flex-col gap-10"
        action="/api/job/editDetail"
        method="POST"
      >
        <input type="hidden" name="_id" value={selectedJob!._id} />
        <input
          name="jobTitle"
          required
          defaultValue={selectedJob!.jobTitle}
          placeholder="Job Title"
        />
        <input
          name="company"
          required
          defaultValue={selectedJob!.company}
          placeholder="Company"
        />
        <input
          name="postURL"
          defaultValue={selectedJob!.postURL}
          placeholder="Post URL"
        />
        <input
          name="salary"
          defaultValue={selectedJob!.salary}
          placeholder="Salary"
        />
        <input
          name="location"
          defaultValue={selectedJob!.location}
          placeholder="Location"
        />
        <input
          type="date"
          name="deadline"
          defaultValue={selectedJob!.deadline}
          placeholder="Deadline"
        />
        <input type="hidden" name="section" value={selectedSection} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditForm;
