import { Checkbox } from "./Checkbox";

interface FieldItem {
    key: string;
    label: string;
    desc: string;
}

interface CheckboxField {
    value: boolean;
    error: string;
    onChange: (value: boolean) => void;
}

interface PropsTypes {
    title: string;
    fields: FieldItem[];
    checkboxes: Record<string, CheckboxField>;
}

export const CheckboxGroup = ({
    title,
    fields,
    checkboxes,
}: PropsTypes) => {
    return (
        <div className="p_15 border radius_8 my_15">
            <div className="text text_xl weight_500">{title}</div>
            <div className="divider my_12"></div>

            {fields.map((item) => (
                <div key={item.key} className="my_start_12">
                    <Checkbox
                        label={item.label}
                        desc={item.desc}
                        checked={checkboxes[item.key]?.value ?? false}
                        onChange={checkboxes[item.key]?.onChange ?? (() => {})}
                        error={checkboxes[item.key]?.error ?? ''}
                    />
                </div>
            ))}
        </div>
    );
};