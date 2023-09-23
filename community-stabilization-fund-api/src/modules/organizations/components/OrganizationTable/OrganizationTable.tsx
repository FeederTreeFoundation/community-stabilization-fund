import type { OrganizationDTO } from '../../../../db/models';

import { BasicTable } from '../../../../components';

import { createHeaders, createRows } from '../../../../utils';

import styles from '../../styles/OrganizationTable.module.css';

interface OrganizationTableProps {
  organizations: OrganizationDTO[];
}

const OrganizationTable = ({ organizations }: OrganizationTableProps) => { 
  const headers = createHeaders<OrganizationDTO>(organizations[0]);
  const rows = createRows<OrganizationDTO>(organizations, "id");

  return (
    <div className={styles.organization_table}>
      <BasicTable headers={headers} rows={rows} />
    </div>
  );
  
};

export { OrganizationTable };