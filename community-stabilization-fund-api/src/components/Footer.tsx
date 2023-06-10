import { Link, Grid, Column } from 'carbon-components-react';

import styles from '../../styles/Home.module.css';

const Footer = () => {


    return (
        <div className={styles.footer}>
            <div className={styles.footer_heading}>
                <Grid>
                    <Column lg={4} md={4} sm={4}><h4>Bought To you by:</h4></Column>
                </Grid>
            </div>
            <div className={styles.footer_content}>
                <Grid>
                    <Column lg={4} md={4} sm={4}><Link href="https://thepittsburghcollaborative.com/">The Pittsburgh Collective.</Link></Column>
                    <Column lg={4} md={4} sm={4}><Link href="http://www.communitymovementbuilders.org/">Community Movement Builders.</Link></Column>
                    <Column lg={4} md={4} sm={4}><Link href="https://www.swopedreams.com/">Swope Dreams.</Link></Column>
                </Grid>
            </div>
        </div>
        
    );
};

export { Footer };