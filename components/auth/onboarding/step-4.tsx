import { Option } from "@/components/ui/multi-select";
import { calculateAge } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export default function Step4() {
  const form = useFormContext();

  const allData = form.watch();
  return (
    <div className="w-full ">
      <div className="space-y-2 text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Review & Submit
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Review all the details you entered so far and submit.
        </p>
      </div>

      <pre className="w-full text-xs bg-gray-100 mt-2 rounded-lg dark:bg-neutral-800">
        {JSON.stringify(
          [allData].map((data) => {
            if (data.age) {
              const calculatedAge = calculateAge(data.age);
              data.age = `${calculatedAge.days} days, ${calculatedAge.months} months, ${calculatedAge.years} years`;
            }
            if (data.traits) {
              data.traits = data.traits.map((item: Option) => item.label);
            }
            if (data.interests) {
              data.interests = data.interests.map((item: Option) => item.label);
            }
            delete data.photos;
            return data;
          }),
          null,
          2
        )}
      </pre>
    </div>
  );
}
