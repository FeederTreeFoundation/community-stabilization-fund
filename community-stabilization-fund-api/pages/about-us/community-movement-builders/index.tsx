import BasicLayout from "../../../src/components/BasicLayout";

import styles from "./community-movement-builders.module.css";

const CommunityMovementBuilders = () => (
  <BasicLayout>
    <h1>Community Movement Builders</h1>
    <p>
        COMMUNITY MOVEMENT BUILDERS is a 501(c)(3) member-based collective of
        black people building sustainable, self-determining communities through
        cooperative economic platforms and collective community organizing.
    </p>
    <div className={styles.contact}>
      <h2>Contact Us</h2>
      <a href='mailto:info@communitymovementbuilders.org'>
          info@communitymovementbuilders.org
      </a>
    </div>
  </BasicLayout>
);

export default CommunityMovementBuilders;
