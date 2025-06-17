"use client";

import config from "@/config/site.config";
import styles from "@/styles/modules/Style.module.scss";
import { ValidationError, useForm } from "@formspree/react";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "../essential/SocialLinks";

const Footer = () => {
  const logoWhite = config.logoWhite;
  const logoText = config.logoText;

  const phoneNumberTel = config.footerWidgets.phone
    .replace(/\s/g, "")
    .replace("(", "")
    .replace(")", "")
    .replace(/-/g, "");

  const [state, handleSubmit, reset] = useForm(config.subscriptionFormspreeID);

  if (state.succeeded) {
    document.querySelector('[aria-label="subscribe-form"]').reset();
    setTimeout(() => {
      reset();
    }, 4000);
  }

  return (
    <footer
      className={`${styles.darkBgTwo} mt-auto pt-16 sm:pt-20 pb-8 text-white`}
    >
      <div className="container">
        <div className="row justify-between mb-16 sm:mb-20 gy-6">
          <div className="lg:col-3">
            {/* logo */}
            <Link href="/" className="inline-block mb-8">
              {logoWhite ? (
                <Image
                  src={logoWhite}
                  alt={logoText}
                  width={143}
                  height={30}
                  priority={true}
                />
              ) : (
                <span className="text-3xl text-black">{logoText}</span>
              )}
            </Link>

            <div className="flex flex-wrap gap-3 mt-6 xl:mt-12">
              {config.footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="uppercase bg-white/10 border border-white/50 rounded-md px-3 py-1 text-sm block text-[#AFAFAF] hover:text-black hover:bg-white transition-all duration-300"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-3">
            <div className="row gy-4">
              <div className="sm:col-5 md:col-4 lg:col-12">
                <h3 className="text-white text-2xl sm:text-3xl mb-4">
                  Contact
                </h3>
                <p className="uppercase">
                  <Link
                    href={`tel:${phoneNumberTel}`}
                    className="has-line-link-white"
                  >
                    <span className="line-link-el">
                      {config.footerWidgets.phone}
                    </span>
                  </Link>
                </p>
              </div>
              <div className="sm:col-5 md:col-4 lg:col-12">
                <h3 className="text-white text-2xl sm:text-3xl mb-4">Email</h3>
                <p className="uppercase">
                  <Link
                    href={`mailto:${config.footerWidgets.email}`}
                    className="has-line-link-white"
                  >
                    <span className="line-link-el">
                      {config.footerWidgets.email}
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-[#2F2F2F] mb-7 md:mb-8"></div>

        <div className="row gy-1 items-center">
          <div className="md:col-6">
            <div className="-ml-2">
              <SocialLinks dark isFooter />
            </div>
          </div>
          <div className="md:col-6 text-start md:text-right">
            <p>{config.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
