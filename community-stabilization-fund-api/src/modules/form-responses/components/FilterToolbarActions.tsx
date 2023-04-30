import { Checkbox } from 'carbon-components-react';

import type { ChangeEvent } from 'react';

import styles from '../styles/form-responses.module.css';

interface FilterToolbarActionProps {
  filterState: string[];
  handleFilter: Function;
}

const FilterToolbarActions = ({
  filterState,
  handleFilter,
}: FilterToolbarActionProps) => (
  <div className={`${styles.table_toolbar_action}`}>
    <Checkbox
      labelText={`Is Black?`}
      id='checkbox-label-1'
      value='is_black'
      checked={filterState.includes('is_black')}
      onChange={(e: ChangeEvent) =>
        handleFilter((e.target as HTMLInputElement).value)
      }
      className={`${styles.filter_checkbox}`}
    />
    <Checkbox
      labelText={`Is Local?`}
      id='checkbox-label-2'
      value='is_local'
      checked={filterState.includes('is_local')}
      onChange={(e: ChangeEvent) =>
        handleFilter((e.target as HTMLInputElement).value)
      }
      className={`${styles.filter_checkbox}`}
    />
  </div>
);

export { FilterToolbarActions };
