import BasicLayout from "../../../src/components/BasicLayout";
import styles from "./pittsburgh-collaborative.module.css";

const PittsburghCollaborative = () => {
  return (
    <BasicLayout>
      <h1>Pittsburgh Collaborative</h1>
      <p>
        The Pittsburgh Collaborative is committed to the preservation of the
        history and culture of the Pittsburgh community and the enrichment of
        its residents through a proactive and progressive intergenerational
        approach that will empower them to thrive, protect and secure the
        community, reinforce, educate and enable residents, and serve as a
        sustainable economic foundation upon which to stand.
      </p>
      <div className={styles.contact}>
        <h2>Contact Us</h2>
        <a href='mailto:pittsburghcollaborativeinc@gmail.com'>
          pittsburghcollaborativeinc@gmail.com
        </a>
      </div>
    </BasicLayout>
  );
};

export default PittsburghCollaborative;
