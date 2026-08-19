import React from "react";
import {
  FaBolt,
  FaBookOpen,
  FaBell,
  FaChartLine,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import heroimage from "../../assets/heroimage.png";
import { useLanguage } from "../context/LanguageContext";

const LandingPage = () => {
  const { language, setLanguage, t } = useLanguage();

  const features = [
    {
      icon: FaBookOpen,
      title: t.feature1Title,
      description: t.feature1Description,
    },
    {
      icon: FaBell,
      title: t.feature2Title,
      description: t.feature2Description,
    },
    {
      icon: FaChartLine,
      title: t.feature3Title,
      description: t.feature3Description,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#101010] text-white">
      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="border-b border-[#303030] bg-[#101010]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between sm:h-[72px]">
            {/* Logo */}

            <Link to="/" className="group flex items-center gap-2">
              <div className="flex items-center justify-center">
                <FaBolt
                  className="
                    text-lg
                    text-[#c6ff00]
                    transition-transform
                    group-hover:rotate-12
                    sm:text-xl
                  "
                />
              </div>

              <span
                className="
                  text-xl
                  font-extrabold
                  tracking-tight
                  sm:text-2xl
                "
              >
                IronPulse
              </span>
            </Link>

            {/* Desktop navigation */}

            <div className="hidden items-center gap-3 md:flex">
              {/* Language Selector */}

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="
                  rounded-xl
                  border
                  border-[#404040]
                  bg-[#171717]
                  px-3
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  outline-none
                  transition-all
                  focus:border-[#c6ff00]
                "
              >
                <option value="en">English</option>
                <option value="fa">فارسی</option>
                <option value="ps">پښتو</option>
              </select>

              <Link
                to="/login"
                className="
                  rounded-xl
                  border
                  border-[#404040]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  hover:border-[#c6ff00]
                  hover:text-[#c6ff00]
                "
              >
                {t.login}
              </Link>

              <Link
                to="/signup"
                className="
                  rounded-xl
                  bg-[#c6ff00]
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-black
                  transition-all
                  hover:bg-[#d5ff38]
                "
              >
                {t.getStarted}
              </Link>
            </div>

            {/* Mobile navigation */}

            <div className="flex items-center gap-3 md:hidden">
              {/* Mobile Language Selector */}

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="
                  rounded-lg
                  border
                  border-[#404040]
                  bg-[#171717]
                  px-2
                  py-1.5
                  text-xs
                  font-semibold
                  text-white
                  outline-none
                "
              >
                <option value="en">EN</option>
                <option value="fa">FA</option>
                <option value="ps">PS</option>
              </select>

              <Link
                to="/login"
                className="
                  text-sm
                  font-semibold
                  text-[#c6ff00]
                "
              >
                {t.login}
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main>
        {/* =========================================================
            HERO SECTION
        ========================================================= */}

        <section
          className="
            relative
            overflow-hidden
            border-b
            border-[#292929]
          "
        >
          {/* Background glow */}

          <div
            className="
              pointer-events-none
              absolute
              -top-32
              left-1/2
              h-[300px]
              w-[500px]
              -translate-x-1/2
              rounded-full
              bg-[#c6ff00]/[0.07]
              blur-[100px]
            "
          />

          <div
            className="
              relative
              mx-auto
              max-w-7xl
              px-4
              py-10
              sm:px-6
              sm:py-14
              lg:px-8
              lg:py-20
            "
          >
            <div
              className="
                grid
                grid-cols-1
                items-center
                gap-10
                lg:grid-cols-2
                lg:gap-16
              "
            >
              {/* =================================================
                  HERO CONTENT
              ================================================= */}

              <div className="text-center lg:text-left">
                {/* Small badge */}

                <div
                  className="
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#3d461b]
                    bg-[#1b210b]
                    px-3
                    py-1.5
                  "
                >
                  <FaCheckCircle className="text-xs text-[#c6ff00]" />

                  <span
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-[#c6ff00]
                      sm:text-xs
                    "
                  >
                    {t.builtForTrainers}
                  </span>
                </div>

                {/* Heading */}

                <h1
                  className="
                    mx-auto
                    max-w-3xl
                    text-4xl
                    font-extrabold
                    leading-[1.05]
                    tracking-tight
                    sm:text-5xl
                    lg:mx-0
                    lg:text-6xl
                    xl:text-7xl
                  "
                >
                  {t.heroTitle1}{" "}
                  <span className="text-[#c6ff00]">{t.heroTitleHighlight}</span>{" "}
                  {t.heroTitle2}
                </h1>

                {/* Description */}

                <p
                  className="
                    mx-auto
                    mt-5
                    max-w-xl
                    text-base
                    leading-7
                    text-[#b9bd9e]
                    sm:text-lg
                    lg:mx-0
                  "
                >
                  {t.heroDescription}
                </p>

                {/* Buttons */}

                <div
                  className="
                    mt-7
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-3
                    sm:flex-row
                    lg:justify-start
                  "
                >
                  <Link
                    to="/signup"
                    className="
                      flex
                      w-full
                      min-w-[150px]
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#c6ff00]
                      px-6
                      py-3.5
                      text-sm
                      font-bold
                      text-black
                      transition-all
                      hover:bg-[#d5ff38]
                      sm:w-auto
                    "
                  >
                    {t.getStarted}

                    <FaArrowRight className="text-xs" />
                  </Link>

                  <Link
                    to="/login"
                    className="
                      flex
                      w-full
                      min-w-[150px]
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#444]
                      px-6
                      py-3.5
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      hover:border-[#c6ff00]
                      hover:text-[#c6ff00]
                      sm:w-auto
                    "
                  >
                    {t.login}
                  </Link>
                </div>
              </div>

              {/* =================================================
                  HERO IMAGE
              ================================================= */}

              <div
                className="
                  relative
                  mx-auto
                  w-full
                  max-w-[620px]
                  lg:mx-0
                "
              >
                {/* Image glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-full
                    bg-[#c6ff00]/10
                    blur-[70px]
                  "
                />

                {/* Image container */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#3b3b3b]
                    bg-[#171717]
                    shadow-[0_25px_70px_rgba(0,0,0,0.5)]
                  "
                >
                  <img
                    src={heroimage}
                    alt="IronPulse gym management dashboard"
                    className="
                      block
                      h-auto
                      w-full
                      object-contain
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FEATURES
        ========================================================= */}

        <section className="border-b border-[#292929]">
          <div
            className="
              mx-auto
              max-w-7xl
              px-4
              py-10
              sm:px-6
              sm:py-14
              lg:px-8
              lg:py-16
            "
          >
            {/* Section heading */}

            <div className="text-center">
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#c6ff00]
                  sm:text-sm
                "
              >
                {t.featuresLabel}
              </p>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-extrabold
                  sm:text-3xl
                  lg:text-4xl
                "
              >
                {t.featuresTitle}
              </h2>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-[#999]
                  sm:text-base
                "
              >
                {t.featuresDescription}
              </p>
            </div>

            {/* Feature cards */}

            <div
              className="
                mt-8
                grid
                grid-cols-1
                gap-4
                sm:mt-10
                md:grid-cols-3
                lg:gap-5
              "
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="
                      group
                      rounded-2xl
                      border
                      border-[#343434]
                      bg-[#1d1d1d]
                      p-5
                      transition-all
                      hover:border-[#4b571d]
                      hover:bg-[#202020]
                      sm:p-6
                    "
                  >
                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#303030]
                        transition-all
                        group-hover:bg-[#c6ff00]
                        sm:h-11
                        sm:w-11
                      "
                    >
                      <Icon
                        className="
                          text-base
                          text-[#c6ff00]
                          transition-colors
                          group-hover:text-black
                        "
                      />
                    </div>

                    {/* Title */}

                    <h3
                      className="
                        mt-5
                        text-lg
                        font-extrabold
                        leading-tight
                        sm:text-xl
                      "
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-[#b9bd9e]
                        sm:text-base
                      "
                    >
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            CTA
        ========================================================= */}

        <section className="border-b border-[#303030] bg-[#1b1b1b]">
          <div
            className="
              mx-auto
              max-w-4xl
              px-4
              py-12
              text-center
              sm:px-6
              sm:py-16
              lg:py-20
            "
          >
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#2a2a2a]
              "
            >
              <FaBolt className="text-[#c6ff00]" />
            </div>

            <h2
              className="
                mt-5
                text-2xl
                font-extrabold
                sm:text-3xl
                lg:text-4xl
              "
            >
              {t.ctaTitle}
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-lg
                text-sm
                leading-6
                text-[#b9bd9e]
                sm:text-base
              "
            >
              {t.ctaDescription}
            </p>

            <Link
              to="/signup"
              className="
                mt-7
                inline-flex
                w-full
                min-w-[210px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#c6ff00]
                px-7
                py-3.5
                text-sm
                font-bold
                text-black
                transition-all
                hover:bg-[#d5ff38]
                sm:w-auto
              "
            >
              {t.getStartedNow}

              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#101010]">
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            py-8
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              gap-5
            "
          >
            {/* Footer logo */}

            <Link to="/" className="flex items-center gap-2">
              <FaBolt className="text-sm text-[#c6ff00]" />

              <span className="text-sm font-bold">IronPulse</span>
            </Link>

            {/* Footer links */}

            <div className="flex items-center gap-5">
              <Link
                to="/privacy"
                className="
                  text-xs
                  text-[#aaa]
                  transition-colors
                  hover:text-[#c6ff00]
                  sm:text-sm
                "
              >
                {t.privacy}
              </Link>

              <Link
                to="/terms"
                className="
                  text-xs
                  text-[#aaa]
                  transition-colors
                  hover:text-[#c6ff00]
                  sm:text-sm
                "
              >
                {t.terms}
              </Link>

              <Link
                to="/contact"
                className="
                  text-xs
                  text-[#aaa]
                  transition-colors
                  hover:text-[#c6ff00]
                  sm:text-sm
                "
              >
                {t.contact}
              </Link>
            </div>

            {/* Copyright */}

            <p className="text-xs text-[#666]">{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
