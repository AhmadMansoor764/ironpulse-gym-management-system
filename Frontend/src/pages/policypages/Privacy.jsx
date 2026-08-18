import { FaBolt, FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Privacy = () => {
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
            Back Home
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="w-14 h-14 rounded-2xl bg-[#292929] flex items-center justify-center">
          <FaShieldAlt className="text-[#c6ff00] text-xl" />
        </div>

        <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold">
          Privacy Policy
        </h1>

        <p className="mt-4 text-[#888] text-sm">Last updated: August 2026</p>

        <p className="mt-6 text-[#b9bd9e] leading-7">
          At IronPulse, we respect your privacy and are committed to protecting
          the information you provide when using our platform.
        </p>
      </section>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 pb-20">
        <div className="space-y-8">
          <PolicySection title="1. Information We Collect">
            <p>
              When you use IronPulse, we may collect information that you
              provide directly to us, including your name, email address, phone
              number, account information, and information related to your gym
              or training business.
            </p>

            <p>
              We may also collect information generated through your use of the
              platform, such as account activity, client management information,
              workout plans, financial records, and system preferences.
            </p>
          </PolicySection>

          <PolicySection title="2. How We Use Your Information">
            <p>
              We use collected information to provide, maintain, and improve
              IronPulse and its features.
            </p>

            <ul>
              <li>Provide and manage your account.</li>
              <li>Provide gym and trainer management features.</li>
              <li>Process and manage payments where applicable.</li>
              <li>Send important account notifications.</li>
              <li>Provide customer support.</li>
              <li>Improve the security and reliability of our platform.</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. Information Security">
            <p>
              We take reasonable technical and organizational measures to
              protect your information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>

            <p>
              However, no internet-based service can guarantee absolute
              security.
            </p>
          </PolicySection>

          <PolicySection title="4. Sharing of Information">
            <p>We do not sell your personal information.</p>

            <p>
              We may share information with service providers that help us
              operate the platform, such as hosting, authentication, analytics,
              email, payment, or storage providers.
            </p>
          </PolicySection>

          <PolicySection title="5. Cookies and Similar Technologies">
            <p>
              IronPulse may use cookies or similar technologies to maintain
              authentication sessions, remember preferences, improve
              functionality, and understand how users interact with the
              platform.
            </p>
          </PolicySection>

          <PolicySection title="6. Your Rights">
            <p>
              Depending on your location, you may have rights regarding your
              personal information, including the right to access, correct,
              delete, or request a copy of certain information.
            </p>
          </PolicySection>

          <PolicySection title="7. Data Retention">
            <p>
              We retain information for as long as reasonably necessary to
              provide our services, comply with legal obligations, resolve
              disputes, and enforce our agreements.
            </p>
          </PolicySection>

          <PolicySection title="8. Children's Privacy">
            <p>
              IronPulse is not intended for children who are unable to lawfully
              use the service under applicable laws.
            </p>
          </PolicySection>

          <PolicySection title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When changes
              are made, the updated policy will be published on this page with a
              revised update date.
            </p>
          </PolicySection>

          <PolicySection title="10. Contact Us">
            <p>
              If you have questions about this Privacy Policy, please contact us
              through our contact page.
            </p>

            <Link
              to="/contact"
              className="inline-block mt-4 text-[#c6ff00] font-semibold hover:underline"
            >
              Contact IronPulse →
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

const Footer = () => (
  <footer className="border-t border-[#292929] py-8">
    <div className="max-w-5xl mx-auto px-5 text-center">
      <Link to="/" className="inline-flex items-center gap-2 font-bold">
        <FaBolt className="text-[#c6ff00]" />
        IronPulse
      </Link>

      <div className="flex justify-center gap-6 mt-5 text-sm text-[#888]">
        <Link to="/privacy" className="hover:text-[#c6ff00]">
          Privacy
        </Link>

        <Link to="/terms" className="hover:text-[#c6ff00]">
          Terms
        </Link>

        <Link to="/contact" className="hover:text-[#c6ff00]">
          Contact
        </Link>
      </div>

      <p className="mt-5 text-xs text-[#666]">
        © 2026 IronPulse. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Privacy;
