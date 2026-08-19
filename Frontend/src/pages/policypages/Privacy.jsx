import { FaBolt, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* HEADER */}
      <header className="border-b border-[#292929]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <FaBolt className="text-[#c6ff00]" />
            IronPulse
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-[#b9bd9e] hover:text-[#c6ff00]"
          >
            <FaArrowLeft />
            {t.backHome}
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="w-14 h-14 rounded-2xl bg-[#292929] flex items-center justify-center">
          <FaShieldAlt className="text-[#c6ff00] text-xl" />
        </div>

        <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold">
          {t.privacyPageTitle}
        </h1>

        <p className="mt-4 text-[#888] text-sm">{t.lastUpdated}</p>

        <p className="mt-6 text-[#b9bd9e] leading-7">{t.privacyIntro}</p>
      </section>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 pb-20">
        <div className="space-y-8">
          <PolicySection title={t.privacySection1}>
            <p>{t.privacySection1Text1}</p>

            <p>{t.privacySection1Text2}</p>
          </PolicySection>

          <PolicySection title={t.privacySection2}>
            <p>{t.privacySection2Text}</p>

            <ul>
              <li>{t.privacySection2Bullet1}</li>
              <li>{t.privacySection2Bullet2}</li>
              <li>{t.privacySection2Bullet3}</li>
              <li>{t.privacySection2Bullet4}</li>
              <li>{t.privacySection2Bullet5}</li>
              <li>{t.privacySection2Bullet6}</li>
            </ul>
          </PolicySection>

          <PolicySection title={t.privacySection3}>
            <p>{t.privacySection3Text1}</p>

            <p>{t.privacySection3Text2}</p>
          </PolicySection>

          <PolicySection title={t.privacySection4}>
            <p>{t.privacySection4Text1}</p>

            <p>{t.privacySection4Text2}</p>
          </PolicySection>

          <PolicySection title={t.privacySection5}>
            <p>{t.privacySection5Text}</p>
          </PolicySection>

          <PolicySection title={t.privacySection6}>
            <p>{t.privacySection6Text}</p>
          </PolicySection>

          <PolicySection title={t.privacySection7}>
            <p>{t.privacySection7Text}</p>
          </PolicySection>

          <PolicySection title={t.privacySection8}>
            <p>{t.privacySection8Text}</p>
          </PolicySection>

          <PolicySection title={t.privacySection9}>
            <p>{t.privacySection9Text}</p>
          </PolicySection>

          <PolicySection title={t.privacySection10}>
            <p>{t.privacySection10Text}</p>

            <Link
              to="/contact"
              className="inline-block mt-4 text-[#c6ff00] font-semibold hover:underline"
            >
              {t.contactIronPulse}
            </Link>
          </PolicySection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const PolicySection = ({ title, children }) => {
  return (
    <section className="bg-[#1b1b1b] border border-[#292929] rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>

      <div className="mt-4 space-y-4 text-sm sm:text-base text-[#b9bd9e] leading-7">
        {children}
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#292929] py-8">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <Link to="/" className="inline-flex items-center gap-2 font-bold">
          <FaBolt className="text-[#c6ff00]" />
          IronPulse
        </Link>

        <div className="flex justify-center gap-6 mt-5 text-sm text-[#888]">
          <Link to="/privacy" className="hover:text-[#c6ff00]">
            {t.privacyPageTitle}
          </Link>

          <Link to="/terms" className="hover:text-[#c6ff00]">
            {t.terms}
          </Link>

          <Link to="/contact" className="hover:text-[#c6ff00]">
            {t.contact}
          </Link>
        </div>

        <p className="mt-5 text-xs text-[#666]">{t.copyright}</p>
      </div>
    </footer>
  );
};

export default Privacy;
