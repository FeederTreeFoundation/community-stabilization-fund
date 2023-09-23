import { useEffect, useState } from "react";

import type { OrganizationDTO } from "../../../db";

import OrganizationService from "../../../services/organization";
import { OrganizationTable } from "../components/OrganizationTable";


const OrganizationsContainer = () => {

  const [organizations, setOrganizations] = useState<OrganizationDTO[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      OrganizationService.getAll().then(({ data }) => {

        setOrganizations(data);
      });};
    fetchOrganizations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return <OrganizationTable organizations={organizations} />;
};

export { OrganizationsContainer };
