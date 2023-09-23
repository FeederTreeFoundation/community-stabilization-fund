import { useUser } from "@auth0/nextjs-auth0";
import { Add } from "@carbon/icons-react";
import { Button } from "@carbon/react";
import { useEffect, useState } from "react";

import type { OrganizationDTO } from "../../../db";

import { useStorage } from "../../../hooks";
import OrganizationService from "../../../services/organization";
import { OrganizationModal } from "../components/OrganizationModal";
import { OrganizationTable } from "../components/OrganizationTable";

import styles from "../styles/organizations.module.css";

const OrganizationsContainer = () => {
  const [organizations, setOrganizations] = useState<OrganizationDTO[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const { user } = useUser();
  const { state } = useStorage('api_user', '');

  useEffect(() => {
    const fetchOrganizations = async () => {
      OrganizationService.getAll()
        .then(({ data }) => {
          setOrganizations([...data]);
        });
    };
    fetchOrganizations();
  }, []);
  
  return (
    <div className={styles.container}>
      <Button size='lg' renderIcon={Add} iconDescription='Add Icon' onClick={toggleOpen}>
        Add Organization
      </Button>
      <OrganizationTable organizations={organizations} />
      <OrganizationModal open={open} handleClose={toggleOpen} onSubmit={submitOrganization} />
    </div>
  );

  function toggleOpen() {
    setOpen(!open);
  }

  function submitOrganization(data: OrganizationDTO) {
    const api_users = [{ id: Number(state) }];
    const submitted_by = user?.email;
    
    OrganizationService.create({...data, api_users, submitted_by: user?.email})
      .then( _resp => {
        setOrganizations([...organizations, { ...data, submitted_by } as OrganizationDTO]);
        toggleOpen();
      })
      .catch(err => console.error('createOrganizationError: ', err));
  }
};

export { OrganizationsContainer };
