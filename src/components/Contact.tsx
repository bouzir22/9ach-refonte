import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-[#001e28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about an item or need help with your order? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f4a622] rounded-full flex items-center justify-center">
                <Mail className="text-[#001e28]" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Email Support</h3>
                <p className="text-gray-300">support@9ach.com</p>
                <p className="text-sm text-gray-400">We respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f4a622] rounded-full flex items-center justify-center">
                <MessageCircle className="text-[#001e28]" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Live Chat</h3>
                <p className="text-gray-300">Available 9 AM - 6 PM EST</p>
                <p className="text-sm text-gray-400">Get instant help with your questions</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f4a622] rounded-full flex items-center justify-center">
                <Phone className="text-[#001e28]" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Phone</h3>
                <p className="text-gray-300">+1 (555) 9ACH-SHOP</p>
                <p className="text-sm text-gray-400">Monday - Friday, 9 AM - 6 PM EST</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f4a622] rounded-full flex items-center justify-center">
                <Clock className="text-[#001e28]" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Business Hours</h3>
                <p className="text-gray-300">Monday - Friday: 9 AM - 6 PM EST</p>
                <p className="text-gray-300">Saturday: 10 AM - 4 PM EST</p>
                <p className="text-gray-300">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#001e28]/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4a622] transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#001e28]/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4a622] transition-colors duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#001e28]/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-[#f4a622] transition-colors duration-300"
                required
              >
                <option value="">Select a subject</option>
                <option value="order">Order Inquiry</option>
                <option value="return">Return/Exchange</option>
                <option value="selling">Selling Items</option>
                <option value="technical">Technical Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#001e28]/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4a622] transition-colors duration-300 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#f4a622] text-[#001e28] px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
            >
              Send Message
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;