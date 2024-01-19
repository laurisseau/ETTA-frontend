import React, { useState } from 'react';
//import { MdOutlineEmail } from 'react-icons/md';
import { useRef } from 'react';
//import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();

  const [sent, setSent] = useState('');

  const sendEmail = async (e) => {
    try {
      e.preventDefault();
      console.log('email');
      /*
        emailjs.sendForm(
          'service_rtugql8',
          'template_5jw9u4k',
          form.current,
          'NiaXoFFBYSoYQ4e4z'
        );
  
        e.target.reset();
  
        setSent('Message Sent');
        */
    } catch (err) {
      //setSent(err);
    }
  };

  return (
    <section id="contact" style={{ backgroundColor: 'white' }}>
      <h5 className="text-center pt-3">Get In Touch</h5>
      <h2 className="text-center pb-3">Contact Us</h2>

      <div className="container contact__container w-50">
        <div className="contact__options ">
          <article className="contact__option mb-4">
            {/*<MdOutlineEmail className="contact__option-icon" />*/}
            
              <h4>Email</h4>
              <h5 >earlytransitiontotech@gmail.com</h5>
            
            <a
              href="mailto:earlytransitiontotech@gmail.com"
              rel="noreferrer"
              target="_blank"
            >
              Send a message
            </a>
          </article>
        </div>
        {/* END OF CONTACT OPTIONS */}
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <input
            className="contact-input"
            type="text"
            name="from_name"
            placeholder="Your Full Name"
            required
          />
          <input
            className="contact-input"
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <textarea
            className="contact-input"
            name="message"
            rows="7"
            placeholder="Your Message"
            required
          ></textarea>
          <button
            type="submit"
            className="btn btn-lg btn-primary"
            style={{ backgroundColor: '#ff4f5a', border: 'none' }}
          >
            Send Message
          </button>
          <div>{sent}</div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
