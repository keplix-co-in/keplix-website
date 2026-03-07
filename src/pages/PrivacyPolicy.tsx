import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';

const Section: React.FC<{ id?: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <div id={id} className="mb-10">
    <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{title}</h2>
    <div className="text-gray-300 space-y-4 leading-relaxed">{children}</div>
  </div>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-6 mb-4">
    <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
    <div className="text-gray-300 space-y-3 leading-relaxed">{children}</div>
  </div>
);

const tocItems = [
  { id: 'infocollect', label: '1. WHAT INFORMATION DO WE COLLECT?' },
  { id: 'infouse', label: '2. HOW DO WE PROCESS YOUR INFORMATION?' },
  { id: 'whoshare', label: '3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?' },
  { id: '3pwebsites', label: '4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?' },
  { id: 'cookies', label: '5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?' },
  { id: 'sociallogins', label: '6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?' },
  { id: 'inforetain', label: '7. HOW LONG DO WE KEEP YOUR INFORMATION?' },
  { id: 'infosafe', label: '8. HOW DO WE KEEP YOUR INFORMATION SAFE?' },
  { id: 'infominors', label: '9. DO WE COLLECT INFORMATION FROM MINORS?' },
  { id: 'privacyrights', label: '10. WHAT ARE YOUR PRIVACY RIGHTS?' },
  { id: 'DNT', label: '11. CONTROLS FOR DO-NOT-TRACK FEATURES' },
  { id: 'policyupdates', label: '12. DO WE MAKE UPDATES TO THIS NOTICE?' },
  { id: 'contact', label: '13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' },
  { id: 'request', label: '14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?' },
];

const PrivacyPolicy: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-gray-900 to-black pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-14 h-14 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">Last updated: <span className="text-red-400 font-semibold">March 07, 2026</span></p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Intro */}
        <div className="mb-10 text-gray-300 leading-relaxed space-y-4">
          <p>
            This Privacy Notice for <strong className="text-white">Keplix Private Limited</strong> ("we," "us," or "our") describes how and why we might access,
            collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Visit our website at <a href="http://www.keplix.co.in" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">http://www.keplix.co.in</a> or any website of ours that links to this Privacy Notice</li>
            <li>Download and use our mobile application (<strong>keplix</strong>), or any other application of ours that links to this Privacy Notice</li>
            <li>Use <strong>Keplix</strong> — a marketplace platform that helps car owners find nearby local mechanics, garages, or any kind of automotive services and book a time slot with them with the easy convenience of comparing prices, reviews, and everything</li>
            <li>Engage with us in other related ways, including any marketing or events</li>
          </ul>
          <p>
            <strong className="text-white">Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices.
            We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices,
            please do not use our Services. If you still have any questions or concerns, please contact us at{' '}
            <a href="mailto:privacy@keplix.co.in" className="text-red-400 hover:underline">privacy@keplix.co.in</a>.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-10 bg-gray-900 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">SUMMARY OF KEY POINTS</h2>
          <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
            <p><strong className="text-white">What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>
            <p><strong className="text-white">Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</p>
            <p><strong className="text-white">Do we collect any information from third parties?</strong> We do not collect any information from third parties.</p>
            <p><strong className="text-white">How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
            <p><strong className="text-white">In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.</p>
            <p><strong className="text-white">How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information.</p>
            <p><strong className="text-white">What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</p>
            <p><strong className="text-white">How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a{' '}
              <a href="https://app.termly.io/dsar/d598263f-0e48-417d-98da-4692433180a0" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">data subject access request</a>, or by contacting us.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div id="toc" className="mb-10 bg-gray-900 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">TABLE OF CONTENTS</h2>
          <ul className="space-y-2">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-left text-sm"
                >
                  <ChevronRight size={14} className="flex-shrink-0" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 1 */}
        <Section id="infocollect" title="1. WHAT INFORMATION DO WE COLLECT?">
          <SubSection title="Personal information you disclose to us">
            <p><em><strong>In Short:</strong> We collect personal information that you provide to us.</em></p>
            <p>
              We collect personal information that you voluntarily provide to us when you register on the Services, express an interest
              in obtaining information about us or our products and Services, when you participate in activities on the Services, or
              otherwise when you contact us.
            </p>
            <p><strong className="text-white">Personal Information Provided by You.</strong> The personal information we collect may include:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Names</li>
              <li>Phone numbers</li>
              <li>Email addresses</li>
              <li>Mailing addresses</li>
              <li>Billing addresses</li>
              <li>Debit/credit card numbers</li>
              <li>Passwords</li>
              <li>Usernames</li>
              <li>Contact preferences</li>
              <li>Contact or authentication data</li>
            </ul>
            <p><strong className="text-white">Sensitive Information.</strong> We do not process sensitive information.</p>
            <p>
              <strong className="text-white">Payment Data.</strong> We may collect data necessary to process your payment if you choose to
              make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All
              payment data is handled and stored by our payment processors. You may find their privacy notice link(s) on their respective websites.
            </p>
            <p>
              <strong className="text-white">Social Media Login Data.</strong> We may provide you with the option to register with us using your
              existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way,
              we will collect certain profile information about you from the social media provider, as described in the section "HOW DO WE HANDLE
              YOUR SOCIAL LOGINS?" below.
            </p>
            <p>
              <strong className="text-white">Application Data.</strong> If you use our application(s), we also may collect the following information
              if you choose to provide us with access or permission:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><em>Geolocation Information.</em> We may request access or permission to track location-based information from your mobile device to provide certain location-based services.</li>
              <li><em>Mobile Device Access.</em> We may request access to your device's camera, reminders, SMS messages, storage, and notifications.</li>
              <li><em>Push Notifications.</em> We may request to send you push notifications regarding your account or certain features of the application(s).</li>
            </ul>
            <p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>
          </SubSection>

          <SubSection title="Information automatically collected">
            <p><em><strong>In Short:</strong> Some information — such as your IP address and/or browser and device characteristics — is collected automatically when you visit our Services.</em></p>
            <p>
              We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your
              specific identity but may include device and usage information, such as your IP address, browser and device characteristics,
              operating system, language preferences, referring URLs, device name, country, location, and information about how and when you
              use our Services.
            </p>
            <p>Like many businesses, we also collect information through cookies and similar technologies.</p>
            <p>The information we collect includes:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><em>Log and Usage Data</em> — service-related, diagnostic, usage, and performance information</li>
              <li><em>Device Data</em> — computer, phone, tablet or other device information</li>
              <li><em>Location Data</em> — information about your device's location (precise or imprecise)</li>
            </ul>
          </SubSection>
        </Section>

        {/* Section 2 */}
        <Section id="infouse" title="2. HOW DO WE PROCESS YOUR INFORMATION?">
          <p><em><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</em></p>
          <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including to:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Facilitate account creation and authentication and otherwise manage user accounts</li>
            <li>Deliver and facilitate delivery of services to the user</li>
            <li>Respond to user inquiries/offer support to users</li>
            <li>Send administrative information to you</li>
            <li>Send you marketing and promotional communications (with your consent)</li>
            <li>Deliver targeted advertising to you</li>
            <li>Request feedback and contact you about your use of our Services</li>
            <li>Send you push notifications</li>
            <li>Protect our Services, including fraud monitoring and prevention</li>
            <li>Identify usage trends to improve our Services</li>
            <li>Determine the effectiveness of our marketing and promotional campaigns</li>
            <li>Save or protect an individual's vital interest</li>
          </ul>
        </Section>

        {/* Section 3 */}
        <Section id="whoshare" title="3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?">
          <p><em><strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.</em></p>
          <p>We may need to share your personal information in the following situations:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><strong className="text-white">Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong className="text-white">When we use Google Maps Platform APIs.</strong> We may share your information with certain Google Maps Platform APIs to provide location-based services.</li>
            <li><strong className="text-white">Affiliates.</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice.</li>
            <li><strong className="text-white">Business Partners.</strong> We may share your information with our business partners to offer you certain products, services or promotions.</li>
            <li><strong className="text-white">Other Users.</strong> When you share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed.</li>
          </ul>
        </Section>

        {/* Section 4 */}
        <Section id="3pwebsites" title="4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?">
          <p><em><strong>In Short:</strong> We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.</em></p>
          <p>
            The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties
            that are not affiliated with us. We cannot guarantee the safety and privacy of data you provide to any third parties. Data collected by
            third parties is not covered by this Privacy Notice. We are not responsible for the content or privacy and security practices and policies
            of any third parties, including other websites, services, or applications that may be linked to or from the Services.
          </p>
        </Section>

        {/* Section 5 */}
        <Section id="cookies" title="5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?">
          <p><em><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</em></p>
          <p>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with
            our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes,
            fix bugs, save your preferences, and assist with basic site functions.
          </p>
          <p>
            We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising,
            including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart
            reminders (depending on your communication preferences). The third parties and service providers use their technology to provide
            advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
          </p>
          <p>
            Specific information about how we use such technologies and how you can refuse certain cookies is set out in our{' '}
            <a href="https://keplix.co.in/cookie-policy" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">Cookie Notice</a>.
          </p>
        </Section>

        {/* Section 6 */}
        <Section id="sociallogins" title="6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?">
          <p><em><strong>In Short:</strong> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</em></p>
          <p>
            Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or
            X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider.
            The profile information we receive may vary depending on the social media provider concerned, but will often include your name,
            email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
          </p>
          <p>
            We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear
            to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information
            by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and
            share your personal information, and how you can set your privacy preferences on their sites and apps.
          </p>
        </Section>

        {/* Section 7 */}
        <Section id="inforetain" title="7. HOW LONG DO WE KEEP YOUR INFORMATION?">
          <p><em><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</em></p>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a
            longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice
            will require us keeping your personal information for longer than the period of time in which users have an account with us.
          </p>
          <p>
            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such
            information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then
            we will securely store your personal information and isolate it from any further processing until deletion is possible.
          </p>
        </Section>

        {/* Section 8 */}
        <Section id="infosafe" title="8. HOW DO WE KEEP YOUR INFORMATION SAFE?">
          <p><em><strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.</em></p>
          <p>
            We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any
            personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission
            over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers,
            cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or
            modify your information.
          </p>
          <p>
            Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at
            your own risk. You should only access the Services within a secure environment.
          </p>
        </Section>

        {/* Section 9 */}
        <Section id="infominors" title="9. DO WE COLLECT INFORMATION FROM MINORS?">
          <p><em><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</em></p>
          <p>
            We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal
            information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and
            consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has
            been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become
            aware of any data we may have collected from children under age 18, please contact us at{' '}
            <a href="mailto:privacy@keplix.co.in" className="text-red-400 hover:underline">privacy@keplix.co.in</a>.
          </p>
        </Section>

        {/* Section 10 */}
        <Section id="privacyrights" title="10. WHAT ARE YOUR PRIVACY RIGHTS?">
          <p><em><strong>In Short:</strong> You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</em></p>
          <p>
            <strong className="text-white">Withdrawing your consent:</strong> If we are relying on your consent to process your personal information,
            which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time.
            You can withdraw your consent at any time by contacting us by using the contact details provided in the section{' '}
            <button onClick={() => scrollTo('contact')} className="text-red-400 hover:underline">"HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"</button> below.
          </p>
          <p>
            <strong className="text-white">Account Information:</strong> If you would at any time like to review or change the information in your account or terminate your account, you can:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Log in to your account settings and update your user account</li>
            <li>Contact us using the contact information provided</li>
          </ul>
          <p>
            Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases.
            However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations,
            enforce our legal terms and/or comply with applicable legal requirements.
          </p>
          <p>
            <strong className="text-white">Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by default.
            If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies
            or reject cookies, this could affect certain features or services of our Services.
          </p>
          <p>
            If you have questions or comments about your privacy rights, you may email us at{' '}
            <a href="mailto:privacy@keplix.co.in" className="text-red-400 hover:underline">privacy@keplix.co.in</a>.
          </p>
        </Section>

        {/* Section 11 */}
        <Section id="DNT" title="11. CONTROLS FOR DO-NOT-TRACK FEATURES">
          <p>
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you
            can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At
            this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not
            currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked
            online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice
            in a revised version of this Privacy Notice.
          </p>
        </Section>

        {/* Section 12 */}
        <Section id="policyupdates" title="12. DO WE MAKE UPDATES TO THIS NOTICE?">
          <p><em><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>
          <p>
            We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the
            top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting
            a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to
            be informed of how we are protecting your information.
          </p>
        </Section>

        {/* Section 13 */}
        <Section id="contact" title="13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?">
          <p>If you have questions or comments about this notice, you may contact us by post at:</p>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 mt-4 space-y-1">
            <p className="font-semibold text-white">Keplix Private Limited</p>
            <p>9/2659, Kailash Nagar, Gandhi Nagar</p>
            <p>Delhi, 110031</p>
            <p>India</p>
            <p className="mt-2">
              Email:{' '}
              <a href="mailto:privacy@keplix.co.in" className="text-red-400 hover:underline">privacy@keplix.co.in</a>
            </p>
            <p>
              Phone:{' '}
              <a href="tel:+919818915720" className="text-red-400 hover:underline">+91 98189 15720</a>
            </p>
          </div>
        </Section>

        {/* Section 14 */}
        <Section id="request" title="14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?">
          <p>
            Based on the applicable laws of your country, you may have the right to request access to the personal information we collect
            from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have
            the right to withdraw your consent to our processing of your personal information. These rights may be limited in some
            circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit a{' '}
            <a
              href="https://app.termly.io/dsar/d598263f-0e48-417d-98da-4692433180a0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:underline"
            >
              data subject access request
            </a>.
          </p>
        </Section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
