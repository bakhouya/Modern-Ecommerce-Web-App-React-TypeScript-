
import Select from '../../../components/forms/Select';
import { useCategoryParent } from '../../../controllers/useCategory';


interface Props {
    value?      : string | string[];
    onChange: (value: string | string[]) => void;
    error?      : string;
    multi?      : boolean;   
    required?   : boolean;
}

export default function CtaegoryParentSelect({ value, onChange, error, multi = false, required = false }: Props) {

    const { data: categoryParent } = useCategoryParent();

    const options = (categoryParent ?? []).map((city) => ({
        value: city.id,
        label: city.title,
    }));

    // if (categoryParent.isLoading) {return <div className="text_sm text_secondary"> Loading ...</div>;}

    return (
        <Select
          options={options}
          value={value}
          onChange={onChange}
          error={error}
          multiple={multi}
          required={required}
          placeholder={multi ? 'choiser Category or more...' : 'choiser Category'}
        />
    );
    
}






