import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { getError } from '@/app/utils';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    try {
      e.preventDefault();
      /*
      emailjs.sendForm(
        'service_rtugql8',
        'template_5jw9u4k',
        form.current,
        'NiaXoFFBYSoYQ4e4z'
      );
      */

      emailjs.sendForm(
        'service_angte9b', // service id
        'template_otwjkpa', // template id
        form.current,
        'J7uTZgmEaW62qYxl0' // public key
      );

      e.target.reset();
      toast.success('Message Sent');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <section id="contact" style={{ backgroundColor: 'white' }}>
      <h5 className="text-center pt-3">Get In Touch</h5>
      <h2 className="text-center pb-3">Contact Us</h2>

      <div className="container contact__container w-50">
        <div className="contact__options ">
          <article className="contact__option mb-4">
            <FontAwesomeIcon style={{ fontSize: '40px' }} icon={faEnvelope} />

            <h5>Email</h5>
            <h5>earlytransitiontotech@gmail.com</h5>

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
        <form className="contact-form mb-5" ref={form} onSubmit={sendEmail}>
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
        </form>
      </div>
    </section>
  );
};

export default Contact;
