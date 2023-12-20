function Contact() {
    return (
      <>
        <header>
          <h1>Contact Us</h1>
        </header>
  
        <section className="content">
          <p>If you have any questions or inquiries, feel free to contact us using the form below.</p>
  
          <form action="#" method="post" className="contact-form">
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="name" required />
  
            <label htmlFor="email">Your Email:</label>
            <input type="email" id="email" name="email" required />
  
            <label htmlFor="message">Your Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
  
            <button type="submit">Submit</button>
          </form>
        </section>
  
        <footer>
          <p>&copy; 2023 Your Website Name. All rights reserved.</p>
        </footer>
      </>
    );
  }

  export default Contact;