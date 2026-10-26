import { FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./Contact.module.css";

export default function Contact() {
  return <footer className={styles.footer}><ul className={styles.links}>
    <li className={styles.link}><FaLinkedin aria-hidden="true" /><a href="https://linkedin.com/in/vishwanath-nishad">LinkedIn</a></li>
    <li className={styles.link}><FaGithub aria-hidden="true" /><a href="https://github.com/vishu1803">GitHub</a></li>
  </ul></footer>;
}
