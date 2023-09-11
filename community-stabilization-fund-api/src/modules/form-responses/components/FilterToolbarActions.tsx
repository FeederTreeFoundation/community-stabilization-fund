import {Checkbox} from 'carbon-components-react';

import type {ChangeEvent} from 'react';

import styles from '../styles/form-responses.module.css';

interface FilterToolbarActionProps {
  filterState: string[];
  handleFilter: Function;
}

const FilterToolbarActions = ({
  filterState,
  handleFilter,
}: FilterToolbarActionProps) => {
  function onFilter(e: ChangeEvent) {
    if (!handleFilter) return;

    const {value} = e.target as HTMLInputElement;
    handleFilter(value);
  }
  return (
    <div className={`${styles.table_toolbar_action}`}>
      <Checkbox
        labelText={`Is not Black?`}
        id='checkbox-label-1'
        value='is_black'
        checked={filterState.includes('is_black')}
        onChange={onFilter}
        className={`${styles.filter_checkbox}`}
      />
      <Checkbox
        labelText={`Is Local?`}
        id='checkbox-label-2'
        value='is_local'
        checked={filterState.includes('is_local')}
        onChange={onFilter}
        className={`${styles.filter_checkbox}`}
      />
      <Checkbox
        labelText={`Lives in south side Atlanta?`}
        id='checkbox-label-3'
        value='live_in_southside_atlanta'
        checked={filterState.includes('live_in_southside_atlanta')}
        onChange={onFilter}
        className={`${styles.filter_checkbox}`}
      />
      <Checkbox
        labelText={`Lives in Pittsburgh Atlanta?`}
        id='checkbox-label-4'
        value='live_in_pittsburgh_atlanta'
        checked={filterState.includes('live_in_pittsburgh_atlanta')}
        onChange={onFilter}
        className={`${styles.filter_checkbox}`}
      />
    </div>
  );
};

export {FilterToolbarActions};
