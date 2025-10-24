import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// Data for the footer sections
const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Support", href: "/support" },
      { name: "API Status", href: "/api-status" },
      { name: "Tutorials", href: "/tutorials" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  },
];

const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section: Logo, Newsletter, and Primary Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-gray-700 pb-10">
          {/* Column 1: Logo and Tagline */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold text-indigo-400">YourApp</h3>
            <p className="text-gray-400 text-sm">
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Column 2, 3, 4: Navigation Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-indigo-500 transition duration-150 text-md"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5 (or dedicated space): Newsletter/Action */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-3">
              Join our newsletter for weekly updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full p-2 border border-gray-300 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white p-3 text-sm font-semibold rounded-r-md hover:bg-indigo-700 transition duration-150"
              >
                Go
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright and Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className="text-gray-400 text-lg hover:text-indigo-400 transition duration-150">
            &copy; {new Date().getFullYear()} YourApp, Inc. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-700  transition duration-150"
                aria-label={link.label}
              >
                <link.icon className="w-8 h-8" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
