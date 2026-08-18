import { FaBolt, FaArrowLeft, FaFileContract } from "react-icons/fa";
import { Link } from "react-router-dom";

const Terms = () => {
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
          <FaFileContract className="text-[#c6ff00] text-xl" />
        </div>

        <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold">
          Terms & Conditions
        </h1>

        <p className="mt-4 text-[#888] text-sm">Last updated: August 2026</p>

        <p className="mt-6 text-[#b9bd9e] leading-7">
          These Terms & Conditions govern your access to and use of the
          IronPulse platform.
        </p>
      </section>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 pb-20">
        <div className="space-y-8">
          <TermsSection title="1. Acceptance of Terms">
            <p>
              By creating an account or using IronPulse, you agree to be bound
              by these Terms & Conditions.
            </p>

            <p>
              If you do not agree with these terms, you should not use the
              platform.
            </p>
          </TermsSection>

          <TermsSection title="2. Use of the Platform">
            <p>
              IronPulse provides tools designed to help trainers and gym
              businesses manage their operations, clients, workouts, payments,
              and related information.
            </p>

            <p>
              You agree to use the platform only for lawful purposes and in
              accordance with these terms.
            </p>
          </TermsSection>

          <TermsSection title="3. Account Responsibilities">
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </p>

            <p>
              You are also responsible for activity performed through your
              account and should immediately notify us if you believe your
              account has been accessed without authorization.
            </p>
          </TermsSection>

          <TermsSection title="4. Accurate Information">
            <p>
              You agree to provide accurate and current information when
              creating and maintaining your IronPulse account.
            </p>
          </TermsSection>

          <TermsSection title="5. Prohibited Activities">
            <p>You may not use IronPulse to:</p>

            <ul>
              <li>Break applicable laws or regulations.</li>
              <li>Attempt to gain unauthorized access to the platform.</li>
              <li>Interfere with the operation of the service.</li>
              <li>Upload malicious software or harmful content.</li>
              <li>Abuse or misuse another user's information.</li>
              <li>
                Attempt to reverse engineer protected parts of the service.
              </li>
            </ul>
          </TermsSection>

          <TermsSection title="6. User Content and Data">
            <p>
              You remain responsible for information and content that you enter
              into IronPulse.
            </p>

            <p>
              You must ensure that you have the necessary rights and permissions
              to store and process information you provide through the platform.
            </p>
          </TermsSection>

          <TermsSection title="7. Payments and Subscriptions">
            <p>
              If IronPulse introduces paid plans, subscriptions, or other paid
              services, additional pricing and billing terms may apply.
            </p>

            <p>
              Applicable fees, renewal terms, cancellation rules, and payment
              requirements will be presented before purchase.
            </p>
          </TermsSection>

          <TermsSection title="8. Availability">
            <p>
              We aim to keep IronPulse available and reliable, but we do not
              guarantee that the service will always be uninterrupted,
              completely secure, or error-free.
            </p>
          </TermsSection>

          <TermsSection title="9. Intellectual Property">
            <p>
              The IronPulse platform, branding, software, design, and related
              materials are protected by applicable intellectual property laws.
            </p>

            <p>
              You may not copy, modify, distribute, or commercially exploit
              protected parts of the platform without appropriate authorization.
            </p>
          </TermsSection>

          <TermsSection title="10. Account Suspension or Termination">
            <p>
              We may suspend or terminate accounts that violate these terms,
              create security risks, engage in abuse, or otherwise misuse the
              platform.
            </p>

            <p>
              You may stop using the service at any time, subject to any
              applicable subscription or contractual obligations.
            </p>
          </TermsSection>

          <TermsSection title="11. Disclaimer">
            <p>
              IronPulse is provided as a management and productivity platform.
              Information and tools provided through the platform should not be
              considered professional legal, financial, medical, or other
              regulated advice.
            </p>
          </TermsSection>

          <TermsSection title="12. Limitation of Liability">
            <p>
              To the extent permitted by applicable law, IronPulse and its
              operators will not be responsible for indirect, incidental,
              special, or consequential damages resulting from your use of the
              platform.
            </p>
          </TermsSection>

          <TermsSection title="13. Changes to These Terms">
            <p>
              We may update these Terms & Conditions as our platform changes.
              Updated terms will be published on this page with a revised update
              date.
            </p>
          </TermsSection>

          <TermsSection title="14. Contact">
            <p>
              If you have questions about these Terms & Conditions, contact us
              through our contact page.
            </p>

            <Link
              to="/contact"
              className="inline-block mt-4 text-[#c6ff00] font-semibold hover:underline"
            >
              Contact IronPulse →
            </Link>
          </TermsSection>
        </div>
      </main>

      <Footer />
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

export default Terms;
