import { FaBolt, FaArrowLeft, FaFileContract } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Terms = () => {
  const { t, language } = useLanguage();

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
            <FaArrowLeft className={language !== "en" ? "rotate-180" : ""} />

            {t.backHome}
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="w-14 h-14 rounded-2xl bg-[#292929] flex items-center justify-center">
          <FaFileContract className="text-[#c6ff00] text-xl" />
        </div>

        <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold">
          {t.termsConditions}
        </h1>

        <p className="mt-4 text-[#888] text-sm">{t.lastUpdated}</p>

        <p className="mt-6 text-[#b9bd9e] leading-7">{t.termsIntro}</p>
      </section>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 pb-20">
        <div className="space-y-8">
          {/* 1 */}
          <TermsSection title={t.terms1}>
            <p>{t.terms1p1}</p>
            <p>{t.terms1p2}</p>
          </TermsSection>

          {/* 2 */}
          <TermsSection title={t.terms2}>
            <p>{t.terms2p1}</p>
            <p>{t.terms2p2}</p>
          </TermsSection>

          {/* 3 */}
          <TermsSection title={t.terms3}>
            <p>{t.terms3p1}</p>
            <p>{t.terms3p2}</p>
          </TermsSection>

          {/* 4 */}
          <TermsSection title={t.terms4}>
            <p>{t.terms4p1}</p>
          </TermsSection>

          {/* 5 */}
          <TermsSection title={t.terms5}>
            <p>{t.terms5p1}</p>

            <ul className="list-disc list-inside space-y-2">
              <li>{t.terms5li1}</li>
              <li>{t.terms5li2}</li>
              <li>{t.terms5li3}</li>
              <li>{t.terms5li4}</li>
              <li>{t.terms5li5}</li>
              <li>{t.terms5li6}</li>
            </ul>
          </TermsSection>

          {/* 6 */}
          <TermsSection title={t.terms6}>
            <p>{t.terms6p1}</p>
            <p>{t.terms6p2}</p>
          </TermsSection>

          {/* 7 */}
          <TermsSection title={t.terms7}>
            <p>{t.terms7p1}</p>
            <p>{t.terms7p2}</p>
          </TermsSection>

          {/* 8 */}
          <TermsSection title={t.terms8}>
            <p>{t.terms8p1}</p>
          </TermsSection>

          {/* 9 */}
          <TermsSection title={t.terms9}>
            <p>{t.terms9p1}</p>
            <p>{t.terms9p2}</p>
          </TermsSection>

          {/* 10 */}
          <TermsSection title={t.terms10}>
            <p>{t.terms10p1}</p>
            <p>{t.terms10p2}</p>
          </TermsSection>

          {/* 11 */}
          <TermsSection title={t.terms11}>
            <p>{t.terms11p1}</p>
          </TermsSection>

          {/* 12 */}
          <TermsSection title={t.terms12}>
            <p>{t.terms12p1}</p>
          </TermsSection>

          {/* 13 */}
          <TermsSection title={t.terms13}>
            <p>{t.terms13p1}</p>
          </TermsSection>

          {/* 14 */}
          <TermsSection title={t.terms14}>
            <p>{t.terms14p1}</p>

            <Link
              to="/contact"
              className="inline-block mt-4 text-[#c6ff00] font-semibold hover:underline"
            >
              {t.contactIronPulse}
            </Link>
          </TermsSection>
        </div>
      </main>

      <Footer t={t} />
    </div>
  );
};

const TermsSection = ({ title, children }) => {
  return (
    <section className="bg-[#1b1b1b] border border-[#292929] rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>

      <div className="mt-4 space-y-4 text-sm sm:text-base text-[#b9bd9e] leading-7">
        {children}
      </div>
    </section>
  );
};

const Footer = ({ t }) => {
  return (
    <footer className="border-t border-[#292929] py-8">
      <div className="max-w-5xl mx-auto px-5 text-center">
        <Link to="/" className="inline-flex items-center gap-2 font-bold">
          <FaBolt className="text-[#c6ff00]" />
          IronPulse
        </Link>

        <div className="flex justify-center gap-6 mt-5 text-sm text-[#888]">
          <Link to="/privacy" className="hover:text-[#c6ff00]">
            {t.privacy}
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

export default Terms;
