import React from 'react';
import styles from './Experience.module.css';

const Experience = ({ history }) => {
    return (
        <div className={styles.experience}>
            <h2>Experience</h2>
            <ul className={styles.historyList}>
                {history.map((historyItem, index) => {
                    return (
                        <li key={index} className={styles.historyItem}>
                            <div className={styles.historyItemDetails}>
                                <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                                <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                                <ul>
                                    {historyItem.experiences.map((experience, expIndex) => {
                                        return <li key={expIndex}>{experience}</li>
                                    })}
                                </ul>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Experience;