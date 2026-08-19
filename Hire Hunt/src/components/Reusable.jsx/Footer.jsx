import React from "react";
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from "react-icons/hi2";

const Footer = ({ className = "" }) => {
  return (
    <footer className={`bg-gray-900 text-gray-400 border-t border-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center md:items-start text-center md:text-left">
          {/* Logo / Name */}
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-2xl font-extrabold text-[#E0C163] tracking-tight">
                Hire Hunt
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm">
              Connecting top talent with high-impact career opportunities across modern tech.
            </p>
          </div>

          {/* App Download Links */}
          <div className="space-y-3 flex flex-col items-center">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Get the Mobile App
            </h3>
            <p className="text-xs text-gray-400">Search and manage jobs on the go</p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://apps.apple.com/app/id1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-105"
              >
                <img
                  src="/ios-app_v1.png"
                  alt="Download on App Store"
                  className="h-10 object-contain rounded-lg border border-gray-800"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.example.app"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-105"
              >
                <img
                  src="/android-app_v1.png"
                  alt="Get it on Google Play"
                  className="h-10 object-contain rounded-lg border border-gray-800"
                />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 flex flex-col items-center md:items-end text-sm">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-1">
              Contact & Support
            </h3>
            <div className="flex items-center space-x-2 text-gray-400">
              <HiOutlineEnvelope className="h-4 w-4 text-[#E0C163]" />
              <span>hirehunt@support.com</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <HiOutlinePhone className="h-4 w-4 text-[#E0C163]" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <HiOutlineMapPin className="h-4 w-4 text-[#E0C163]" />
              <span>Dehradun, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Hire Hunt. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

