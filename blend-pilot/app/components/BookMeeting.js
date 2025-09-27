// /app/components/BookMeeting.js
"use client";

import React from "react";
import { InlineWidget } from "react-calendly";

const BookMeeting = () => {
  return (
    <section id="book-meeting" className="bg-[#040919] py-20 lg:py-32 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance"
            style={{ textShadow: "0 0 10px rgba(0, 205, 2_43, 0.5)" }}
          >
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-400 text-balance">
            {` Schedule a free, no-obligation discovery call with us. Choose a time
            that works for you, and let's discuss how we can bring your vision
            to life.`}
          </p>
        </div>

        <div className="glass-card max-w-4xl mx-auto p-4 md:p-6 rounded-2xl">
        
          <InlineWidget
            url="https://calendly.com/your-username/your-event" 
            styles={{
              height: "700px",
              borderRadius: "1rem",
            }}
            pageSettings={{
              backgroundColor: "transparent",
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: "00cdf3",
              textColor: "ffffff",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BookMeeting;
