import { Container } from 'react-bootstrap';
import Footer from '@/components/Footer';

export default function AboutUs() {
  const imgArr = [
    { id: 1, img: '/images/image6.png', role: 'Founder/CEO' },
    { id: 2, img: '/images/image2.png', role: 'CTO' },
    { id: 3, img: '/images/image1.png', role: 'Intern' },
    { id: 4, img: '/images/image7.jpeg', role: 'Intern' },
    { id: 5, img: '/images/image3.png', role: 'Intern' },
    { id: 6, img: '/images/image4.png', role: 'Intern' },
  ];

  return (
    <>
      <Container>
        <div className="mt-5 text-center">
          <h1 className="hacker-font" style={{ fontWeight: '700' }}>
            About Us
          </h1>

          <h3 className="mt-4 hacker-font">
            Empowering Tomorrow's Innovators Today
          </h3>
          <div className="mt-4">
            <p>
              Early Transition in Tech Association 501(c)(3) Nonprofit -
              Bridging the Digital Divide, Building Bright Futures. Our Edtech
              nonprofit brings technology education and robotics to underserved
              communities, igniting a passion for innovation among grades 9-12
              and College Students. Together, we unlock their potential,
              equipping them with essential tech skills and creating meaningful
              career pathways. Join us on this journey of knowledge and
              transformation, where we open doors to a world of possibilities,
              ensuring no talent is left behind. Together, we build a future
              that thrives on inclusion, diversity, and endless opportunities.
              Ecosystems thrive when they begin with nurturing the young minds
              of today. By imparting knowledge and education to the youth, we
              lay the foundation for tomorrow's innovators. Equipping them with
              a comprehensive understanding of various fields, encouraging
              critical thinking, and fostering a spirit of curiosity pave the
              way for groundbreaking advancements. These future innovators will
              carry forward the torch of progress, shaping technologies,
              industries, and solutions that will drive our world forward.
              Through education, we empower them to envision, create, and
              sustain the intricate web of interconnected ideas that constitute
              thriving ecosystems.
            </p>
          </div>
          <h1 className="mt-4 mb-3 hacker-font">Meet Our Team</h1>
          <div className="d-flex flex-wrap justify-content-center mb-4">
            {imgArr.map((img) => (
              <div>
                <div
                  key={img.id}
                  className="rounded-circle ms-3 me-3 mt-4"
                  style={{
                    width: '200px',
                    height: '200px',
                    overflow: 'hidden',
                    borderRadius: '50%',
                  }}
                >
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    src={img.img}
                    alt="profile Image"
                  />
                </div>
                <div>
                  <p className="mt-2 align-center">{img.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
