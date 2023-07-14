import Image from 'next/image';

import { BasicLayout } from '../../../components';

import styles from '../styles/about-us.module.css';

interface AboutUsProps {
  org: {
    title: string;
    desc: string;
    email: string | null;
    link: string | null;
    img_url: string | null;
  };
}

const AboutUs = ({ org }: AboutUsProps) => (
  <main className={styles.container}>
    <div className={styles.header}>
      {org.img_url && (
        <Image
          src={org.img_url}
          className={styles.logo}
          alt={`${org.title} logo`}
          width={1200}
          height={100}
        />
      )}
      <div>
        <h1 className={styles.title}>{org.title}</h1>
        <p>{org.desc}</p>
      </div>
    </div>

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
  </main>
);

export { AboutUs };
