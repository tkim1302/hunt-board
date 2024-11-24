import fetchSections from "../../../util/fetchSections";
import submitForm from "../../../util/submitForm";
import useLastUpdatedTimeStore from "../store/lastUpdatedTimeStore";
import useModalStore from "../store/modalStore";
import useSectionStore from "../store/sectionStore";

const AddForm: React.FC = () => {
  const { selectedSection, setSectionList } = useSectionStore();
  const { SetLastUpdated } = useLastUpdatedTimeStore();
  const { closeModal } = useModalStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await submitForm(event, "add");
    fetchSections(setSectionList, SetLastUpdated);
    closeModal();
  };

  return (
    <div className="flex flex-col">
      <h4 className="mb-6 text-2xl font-semibold">Add Job</h4>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className="flex flex-col gap-10"
        action="/api/job/new"
        method="POST"
      >
        <input name="jobTitle" required placeholder="Job Title (Required)" />
        <input name="company" required placeholder="Company (Required)" />
        <input name="postURL" placeholder="Post URL" />
        <input name="salary" placeholder="Salary" />
        <input name="location" placeholder="Location" />
        <input type="date" name="deadline" placeholder="Deadline" />
        <input type="hidden" name="section" value={selectedSection} />
        <div className="flex justify-center">
          <button
            className="mt-8 h-12 w-20 rounded-xl bg-blue-500 text-2xl text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
