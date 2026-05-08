import React from "react";

export default function PrivacyPolicy() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');

        :root {
          --deep:#161616;
          --charcoal:#1C1C1C;
          --ivory:#F7F4EE;
          --brass:#A8895C;
          --brass-l:#C4A97A;
          --slate:#3A3A3A;
          --mid:#6B6B6B;
          --rule:rgba(168,137,92,.12);
          --serif:'Cormorant Garamond', Georgia, serif;
          --sans:'Montserrat', sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: var(--deep);
          color: var(--ivory);
          font-family: var(--sans);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .privacy-page {
          min-height: 100vh;
          background:
          radial-gradient(circle at top left, rgba(168,137,92,.06), transparent 32%),
          linear-gradient(to bottom, #161616, #121212);
        }

        .privacy-navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          height: 82px;
          display: flex;
          align-items: center;
          background: rgba(14,14,14,.96);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(168,137,92,.12);
        }

        .privacy-nav-inner {
          width: 100%;
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 clamp(24px,5vw,92px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .privacy-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .privacy-logo {
          width: 40px;
          height: 40px;
          border: 1px solid var(--brass);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--serif);
          font-size: 20px;
          font-weight: 600;
          color: var(--brass);
          flex-shrink: 0;
        }

        .privacy-brand-text h1 {
          font-family: var(--serif);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: .07em;
          line-height: 1.1;
          color: var(--ivory);
        }

        .privacy-brand-text span {
          font-family: var(--serif);
          font-size: 10px;
          letter-spacing: .12em;
          color: var(--brass);
        }

        .privacy-home-btn {
          border: 1px solid rgba(168,137,92,.3);
          padding: 10px 18px;
          font-family: var(--sans);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--ivory);
          transition: all .25s ease;
        }

        .privacy-home-btn:hover {
          border-color: var(--brass);
          color: var(--brass);
        }

        .privacy-hero {
          position: relative;
          min-height: 52vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .privacy-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to bottom, rgba(0,0,0,.55), rgba(17,17,17,.96)),
            url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80&auto=format');
          background-size: cover;
          background-position: center center;
          filter: brightness(.58);
        }

        .privacy-hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1480px;
          margin: 36px auto;
          padding: 0 clamp(24px,5vw,92px) 72px;
        }

        .privacy-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .privacy-eyebrow-line {
          width: 28px;
          height: 1px;
          background: var(--brass);
        }

        .privacy-eyebrow span {
          font-family: var(--sans);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--brass);
        }

        .privacy-hero h2 {
          font-family: var(--serif);
          font-size: clamp(54px,6vw,110px);
          line-height: 1;
          font-weight: 300;
          color: var(--ivory);
          margin-bottom: 20px;
          max-width: 900px;
        }

        .privacy-hero p {
          max-width: 720px;
          font-size: 14px;
          line-height: 1.9;
          color: rgba(247,244,238,.58);
          font-weight: 300;
        }

        .privacy-content {
          padding: clamp(56px,9vh,112px) clamp(18px,4vw,68px);
        }

        .privacy-container {
          max-width: 1480px;
          margin: 0 auto;
        }

        .privacy-card {
          background:rgba(28,28,28,.82);
          border: 1px solid rgba(168,137,92,.12);
          padding: clamp(28px,4vw,56px);
          backdrop-filter: blur(10px);
        }

        .privacy-meta {
          font-family: var(--sans);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--brass);
          margin-bottom: 42px;
        }

        .privacy-section {
          margin-bottom: 42px;
          padding-bottom: 36px;
          border-bottom: 1px solid rgba(168,137,92,.08);
        }

        .privacy-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .privacy-section h3 {
          font-family: var(--serif);
          font-size: clamp(24px,3vw,34px);
          font-weight: 400;
          color: var(--ivory);
          margin-bottom: 16px;
        }

        .privacy-section p,
        .privacy-section li {
          font-family: var(--sans);
          font-size: 14px;
          line-height: 1.95;
          font-weight: 300;
          color: rgba(247,244,238,.62);
        }

        .privacy-section ul {
          margin-top: 12px;
          padding-left: 20px;
        }

        .privacy-section li {
          margin-bottom: 8px;
        }

        .privacy-contact {
          margin-top: 18px;
        }

        .privacy-contact a {
          color: var(--brass-l);
          transition: color .2s ease;
        }

        .privacy-contact a:hover {
          color: var(--ivory);
        }

        .privacy-footer {
          border-top: 1px solid rgba(168,137,92,.08);
          padding: 26px clamp(18px,4vw,68px);
          background: #141414;
        }

        .privacy-footer-inner {
          max-width: 1480px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .privacy-footer p {
          font-family: var(--sans);
          font-size: 10px;
          line-height: 1.8;
          color: rgba(247,244,238,.24);
          max-width: 620px;
        }

        @media (max-width: 768px) {
          .privacy-navbar {
            height: 72px;
          }

          .privacy-logo {
            width: 34px;
            height: 34px;
            font-size: 17px;
          }

          .privacy-brand-text h1 {
            font-size: 11px;
          }

          .privacy-brand-text span {
            font-size: 8.5px;
          }

          .privacy-home-btn {
            padding: 9px 12px;
            font-size: 9px;
          }

          .privacy-hero {
            min-height: 46vh;
          }

          .privacy-hero-inner {
            padding-bottom: 54px;
          }

          .privacy-hero h2 {
            font-size: clamp(42px,12vw,62px);
          }

          .privacy-hero p {
            font-size: 13px;
            line-height: 1.85;
          }

          .privacy-section h3 {
            font-size: 24px;
          }

          .privacy-section p,
          .privacy-section li {
            font-size: 13px;
          }
        }
      `}</style>

            <div className="privacy-page">
                <nav className="privacy-navbar">
                    <div className="privacy-nav-inner">
                        <div className="privacy-brand">
                            <img
                                src="/logo.png"
                                alt="ANDERSON TYSON NATIONAL RECOVERY"
                                style={{
                                    width: 42,
                                    height: 42,
                                    objectFit: "contain"
                                }}
                            />
                            <div className="privacy-brand-text">
                                <h1>ANDERSON TYSON</h1>
                                <span>NATIONAL RECOVERY</span>
                            </div>
                        </div>

                        <a href="/" className="privacy-home-btn">
                            Back to Home
                        </a>
                    </div>
                </nav>

                <section className="privacy-hero">
                    <div className="privacy-hero-inner">
                        <div className="privacy-eyebrow">
                            <div className="privacy-eyebrow-line"></div>
                            <span>Legal Information</span>
                        </div>

                        <h2>Privacy Policy</h2>

                        <p>
                            How Anderson Tyson National Recovery collects, uses, and safeguards your information.
                        </p>
                    </div>
                </section>

                <main className="privacy-content">
                    <div className="privacy-container">
                        <div className="privacy-card">
                            <div className="privacy-meta">
                                Effective Date: January 1, 2025
                            </div>

                            <div className="privacy-section">
                                <h3>1. Introduction</h3>
                                <p>
                                    Anderson Tyson National Recovery (“we,” “our,” or “us”) respects your privacy and is committed to protecting personal information that you share with us. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or communicate with us.
                                </p>
                            </div>

                            <div className="privacy-section">
                                <h3>2. Information We Collect</h3>
                                <p>We may collect the following types of information:</p>

                                <ul>
                                    <li>
                                        <strong>Personal Information:</strong> such as your name, phone number, email address, or mailing address when you contact us.
                                    </li>
                                    <li>
                                        <strong>Non-Personal Information:</strong> such as browser type, IP address, and pages visited, collected automatically through cookies or analytics tools.
                                    </li>
                                </ul>
                            </div>

                            <div className="privacy-section">
                                <h3>3. How We Use Your Information</h3>
                                <p>We use collected information to:</p>

                                <ul>
                                    <li>Respond to inquiries and provide requested legal information.</li>
                                    <li>Schedule and manage consultations or appointments.</li>
                                    <li>Improve website functionality and user experience.</li>
                                    <li>Comply with legal and regulatory obligations.</li>
                                </ul>
                            </div>

                            <div className="privacy-section">
                                <h3>4. Sharing of Information</h3>
                                <p>
                                    We do not sell or rent your personal information. We may share information only when:
                                </p>

                                <ul>
                                    <li>Required by law, court order, or government regulation.</li>
                                    <li>Necessary to protect our rights, clients, or the public.</li>
                                    <li>
                                        With trusted service providers assisting in website or communication support (bound by confidentiality obligations).
                                    </li>
                                </ul>
                            </div>

                            <div className="privacy-section">
                                <h3>5. Data Security</h3>
                                <p>
                                    We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.
                                </p>
                            </div>

                            <div className="privacy-section">
                                <h3>6. Your Rights</h3>
                                <p>
                                    You may request access to, correction of, or deletion of personal information we hold about you. To exercise these rights, please contact us using the information below.
                                </p>
                            </div>

                            <div className="privacy-section">
                                <h3>7. Third-Party Links</h3>
                                <p>
                                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.
                                </p>
                            </div>

                            <div className="privacy-section">
                                <h3>8. Updates to This Policy</h3>
                                <p>
                                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.
                                </p>
                            </div>

                            <div className="privacy-section">
                                <h3>9. Contact Us</h3>

                                <p>
                                    If you have questions about this Privacy Policy or how we handle your information, please contact us at:
                                </p>

                                <div className="privacy-contact">
                                    <p>
                                        <strong>ANDERSON TYSON NATIONAL RECOVERY</strong>
                                        <br />
                                        3402 Parklake Drive, Suite 558
                                        <br />
                                        Atlanta, GA 30345
                                        <br />
                                        Phone: <a href="tel:+14044298930">(404) 429-8930</a>
                                        <br />
                                        Email: <a href="mailto:contact@atnr-llp.com">contact@atnr-llp.com</a>
                                        <br />
                                        Website: <a href="https://atnr-llp.com">atnr-llp.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="privacy-footer">
                    <div className="privacy-footer-inner">
                        <p>
                            © {new Date().getFullYear()} Anderson Tyson National Recovery. All rights reserved.
                        </p>

                        <p>
                            Attorney Advertising. The information on this website does not constitute legal advice and no attorney-client relationship is formed by use of this site.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
