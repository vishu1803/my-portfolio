import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ title, description, skills, links }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <ul className={styles.skills}>
                {
                    skills.map((skill, id) => {
                        return <li key={id} className={styles.skill}>{skill}</li>;
                    })
                }
            </ul>
            <div className={styles.links}>
                {
                    links.map((link, id) => {
                        return <a key={id} href={link.url} className={styles.link}>{link.name}</a>;
                    })
                }
            </div>
        </div>
    );
};

export default ProjectCard;