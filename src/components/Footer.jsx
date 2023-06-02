/** @format */

import {
  InstagramIcon,
  FacebookIcon,
  TiktokIcon,
  InfoIcon,
  PhoneIcon,
  MailIcon,
} from './Icons'

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-title-container">
          <p className="footer-title">BESOIN D'AIDE ?</p>
        </div>
        <div className="footer-item">
          <PhoneIcon />
          <ul>
            <li>Contactez nous directement</li>
            <li>0621 777 113 </li>
          </ul>
        </div>
        <div className="footer-item">
          <MailIcon />
          <p>contact@abroad.com</p>
        </div>
        <div className="footer-item">
          <InfoIcon />
          <p>Any questions ?</p>
        </div>
        <div className="footer-social">
          <InstagramIcon />
          <FacebookIcon />
          <TiktokIcon />
        </div>
        <div className="footer-item">
          <p>
            ABROAD, association made by students for students, connect,
            experience, discover, enjoy your year
          </p>
        </div>
      </div>
    </>
  )
}

export default Footer
