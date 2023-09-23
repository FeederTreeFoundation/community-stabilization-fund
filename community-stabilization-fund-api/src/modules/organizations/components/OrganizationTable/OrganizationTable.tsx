import { useState } from 'react';

import type { OrganizationDTO } from '../../../../db/models';

import { BasicTable } from '../../../../components';
import OrganizationService from '../../../../services/organization';
import { createHeaders, createRows } from '../../../../utils';

import styles from '../../styles/OrganizationTable.module.css';

interface OrganizationTableProps {
  organizations: OrganizationDTO[];
}

const OrganizationTable = ({ organizations }: OrganizationTableProps) => { 
  const [filteredIds, setFilteredIds] = useState<string[]>([]);
  const filteredOrganizations = organizations.filter((org) => !filteredIds.includes(`${org.id}`));

  const headers = createHeaders<OrganizationDTO>(organizations[0]);
  const rows = createRows<OrganizationDTO>(filteredOrganizations, "id");

  return (
    <div className={styles.organization_table}>
      <BasicTable headers={headers} rows={rows} handleDelete={deleteOrganization} />
    </div>
  );

  function deleteOrganization(rows: OrganizationDTO[]) {
    const ids = rows.map((row) => `${row.id}`);
    OrganizationService.delete(ids)
      .then(() => {
        setFilteredIds([...filteredIds, ...ids]);
      })
      .catch(err => console.error('deleteOrganizationError: ', err));
  }
};

export { OrganizationTable };