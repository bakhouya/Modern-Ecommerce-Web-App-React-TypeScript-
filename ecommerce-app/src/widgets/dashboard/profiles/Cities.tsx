
import Select from '../../../components/forms/Select';
import { useQuery } from '@tanstack/react-query';
import { ActiveCitiesService } from '../../../services/dashboard/accountService';
import type { CityType } from '../../../types/dashboard/city';


interface CitiesProps {
  value?: string | string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  error?: string;
  multi?: boolean;   
  required?: boolean;
}

export default function Cities({ value, onChange, error, multi = false, required = false }: CitiesProps) {

    const CityQuery = useQuery<CityType[], Error>({
          queryKey    : ['ActiveCity'],
          queryFn     : ActiveCitiesService,
          staleTime   : 5 * 60 * 1000, 
          retry: 1,
    });

    const options = (CityQuery.data ?? []).map((city) => ({
      value: city.id,
      label: city.title,
    }));

    if (CityQuery.isLoading) {return <div className="text_sm text_secondary"> Loading ...</div>;}

    return (
        <Select
          options={options}
          value={value}
          onChange={onChange}
          error={error}
          multiple={multi}
          required={required}
          placeholder={multi ? 'choiser city or more...' : 'choiser city'}
        />
    );
    
}






