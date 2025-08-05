import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaTwitter } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiFlowerFill } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className="bg-[#2e1b38] text-white py-10 px-6">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
                {/* Brand & Slogan */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-wide">MyFlower</h1>
                        <p className="mt-2 text-base flex items-center gap-2 text-gray-300">
                            <RiFlowerFill />
                            Karangan bunga Anda
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="text-sm text-gray-300 flex flex-col gap-2">
                        <p className="flex items-center gap-2">
                            <FaMapMarkerAlt /> Jl. Mawar No. 123, Jakarta
                        </p>
                        <p className="flex items-center gap-2">
                            <FaPhone /> 0812-3456-7890
                        </p>
                        <p className="flex items-center gap-2">
                            <MdEmail /> support@myflower.com
                        </p>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-start md:items-end">
                    <p className="mb-3 text-sm text-gray-300">Follow us:</p>
                    <div className="flex space-x-4 text-lg">
                        <a href="#" className="hover:text-[#b44fd0]">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-[#b44fd0]">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-[#b44fd0]">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 border-t border-gray-600 pt-4 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} MyFlower. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
