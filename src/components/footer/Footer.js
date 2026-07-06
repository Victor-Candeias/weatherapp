import classes from "./Footer.module.css";

const Footer = () => (
  <footer className={classes.footer}>
    <span />
    <div className={classes.credits}>
      Dados: <a href="https://api.ipma.pt" target="_blank" rel="noreferrer">IPMA</a>
    </div>
  </footer>
);

export default Footer;
