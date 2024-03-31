import { SelectOptions } from "@/components/Forms/FormMultiSelectField";

export const lastWhitSpaceTrim = (str: string) => {
  return str.replace(/((\s*\S+)*)\s*/, "$1");
};

export const convertDataToFormSelectOptions = (
  data: Record<string, any>
): SelectOptions[] => {
  let options: SelectOptions[] = [];
  if (!data.length) {
    options = data.forEach((dt: { id: number | string; title: string }) => ({
      value: dt.id,
      label: dt.title,
    }));
  }
  return options;
};
