import BasicLayout from '../BasicLayout';

import styles from './about-us.module.css';

interface AboutUsProps {
  org: {
    title: string;
    desc: string;
    email: string | null;
    link: string | null;
  };
}

const AboutUs = ({ org }: AboutUsProps) => (
  <BasicLayout>
    <h1 className={styles.title}>{org.title}</h1>
    <p>{org.desc}</p>

    <div className={styles.contact}>
      <h2>Contact Us</h2>
      {org.email && (
        <a
          href={`mailto:${org.email}`}
          className={styles.link}
        >{`${org.email}`}</a>
      )}
      {org.link && (
        <a href={org.link} className={styles.link}>
          {org.title}
        </a>
      )}
    </div>
  </BasicLayout>
);

export default AboutUs;
