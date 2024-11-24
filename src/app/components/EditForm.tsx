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
          className="text-6xl"
          name="jobTitle"
          required
          defaultValue={selectedJob!.jobTitle}
          placeholder="Job Title (Required)"
        />
        <input
          className="text-3xl"
          name="company"
          required
          defaultValue={selectedJob!.company}
          placeholder="Company (Required)"
        />
        <div className="mt-10 flex flex-col gap-10 text-lg">
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
        </div>
        <input type="hidden" name="section" value={selectedSection} />
        <div className="flex justify-center">
          <button
            className="mt-20 h-12 w-20 rounded-xl bg-blue-500 text-2xl text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
