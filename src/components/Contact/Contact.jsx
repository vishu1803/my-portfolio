import React from "react";
import { getImageUrl } from "../../utils/imageHelper";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img
            src={getImageUrl("contact/linkedinIcon.png")}
            alt="LinkedIn icon"
          />
          <a href="https://www.linkedin.com/in/your-profile">linkedin.com/your-profile</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
          <a href="https://www.github.com/your-username">github.com/your-username</a>
        </li>
      </ul>
    </footer>
  );
};

export default Contact;