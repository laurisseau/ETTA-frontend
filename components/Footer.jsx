import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareFacebook,
  faSquareTwitter,
  faLinkedin,
  faSquareInstagram,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: '#212529', color: 'white', padding: '20px' }}
    >
      <div className="">
        <div>
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h3>Follow Us</h3>
              <div
                className="d-flex justify-content-between mt-3"
                style={{ width: '200px' }}
              >
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={faSquareFacebook}
                    size="2x"
                    color="#ffffff"
                  />
                </Link>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={faSquareTwitter}
                    size="2x"
                    color="#ffffff"
                  />
                </Link>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size="2x"
                    color="#ffffff"
                  />
                </Link>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={faSquareInstagram}
                    size="2x"
                    color="#ffffff"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-us mt-3">
          <div>
            <h3>Contact Us</h3>
            <p>Email: earlytransitiontotech@gmail.com</p>
            <p>Phone: +1 123 456 7890</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; 2023 ETTA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
