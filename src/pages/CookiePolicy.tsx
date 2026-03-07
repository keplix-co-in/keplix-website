import React from 'react';
import { Cookie } from 'lucide-react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{title}</h2>
    <div className="text-gray-300 space-y-4 leading-relaxed">{children}</div>
  </div>
);

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-gray-900 to-black pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Cookie className="w-14 h-14 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-gray-400 text-lg">
            Last updated: <span className="text-red-400 font-semibold">March 07, 2026</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Intro */}
        <div className="mb-10 text-gray-300 leading-relaxed space-y-4">
          <p>
            This Cookie Policy explains how{' '}
            <strong className="text-white">Keplix Private Limited</strong> ("Company," "we," "us," and "our") uses
            cookies and similar technologies to recognize you when you visit our website at{' '}
            <a href="http://www.keplix.co.in" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
              http://www.keplix.co.in
            </a>{' '}
            ("Website"). It explains what these technologies are and why we use them, as well as your rights to control
            our use of them.
          </p>
          <p>
            In some cases we may use cookies to collect personal information, or that becomes personal information if we
            combine it with other information.
          </p>
        </div>

        <Section title="What are cookies?">
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
            as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, <strong className="text-white">Keplix Private Limited</strong>)
            are called "first-party cookies." Cookies set by parties other than the website owner are called
            "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or
            through the website (e.g., advertising, interactive content, and analytics). The parties that set these
            third-party cookies can recognize your computer both when it visits the website in question and also when it
            visits certain other websites.
          </p>
        </Section>

        <Section title="Why do we use cookies?">
          <p>
            We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in
            order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other
            cookies also enable us to track and target the interests of our users to enhance the experience on our Online
            Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
            This is described in more detail below.
          </p>
        </Section>

        <Section title="How can I control cookies?">
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by
            setting your preferences in the Cookie Preference Center. The Cookie Preference Center allows you to select
            which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly
            necessary to provide you with services.
          </p>
          <p>
            The Cookie Preference Center can be found in the notification banner and on our Website. If you choose to
            reject cookies, you may still use our Website though your access to some functionality and areas of our
            Website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.
          </p>
          <p>
            The specific types of first- and third-party cookies served through our Website and the purposes they perform
            are described below.
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white mb-3 underline">Unclassified cookies:</h3>
            <p className="mb-3 text-gray-400 text-sm italic">
              These are cookies that have not yet been categorized. We are in the process of classifying these cookies
              with the help of their providers.
            </p>
            <div className="border border-gray-700 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left px-4 py-2 text-gray-300 font-semibold">Name</th>
                    <th className="text-left px-4 py-2 text-gray-300 font-semibold">Provider</th>
                    <th className="text-left px-4 py-2 text-gray-300 font-semibold">Type</th>
                    <th className="text-left px-4 py-2 text-gray-300 font-semibold">Expires in</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700">
                    <td className="px-4 py-2 text-gray-400">WMF-Uniq</td>
                    <td className="px-4 py-2 text-gray-400">.upload.wikimedia.org</td>
                    <td className="px-4 py-2 text-gray-400">server_cookie</td>
                    <td className="px-4 py-2 text-gray-400">31492011 seconds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Section title="How can I control cookies on my browser?">
          <p>
            As the means by which you can refuse cookies through your web browser controls vary from browser to browser,
            you should visit your browser's help menu for more information. The following is information about how to
            manage cookies on the most popular browsers:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <a href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Chrome
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Internet Explorer
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Edge
              </a>
            </li>
            <li>
              <a href="https://help.opera.com/en/latest/web-preferences/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Opera
              </a>
            </li>
          </ul>
          <p className="mt-2">
            In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like
            to find out more information, please visit:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Digital Advertising Alliance
              </a>
            </li>
            <li>
              <a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                Digital Advertising Alliance of Canada
              </a>
            </li>
            <li>
              <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                European Interactive Digital Advertising Alliance
              </a>
            </li>
          </ul>
        </Section>

        <Section title="What about other tracking technologies, like web beacons?">
          <p>
            Cookies are not the only way to recognize or track visitors to a website. We may use other, similar
            technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These
            are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited
            our Website or opened an email including them. This allows us, for example, to monitor the traffic patterns of
            users from one page within a website to another, to deliver or communicate with cookies, to understand whether
            you have come to the website from an online advertisement displayed on a third-party website, to improve site
            performance, and to measure the success of email marketing campaigns. In many instances, these technologies
            are reliant on cookies to function properly, and so declining cookies will impair their functioning.
          </p>
        </Section>

        <Section title="Do you use Flash cookies or Local Shared Objects?">
          <p>
            Websites may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among
            other things, collect and store information about your use of our services, fraud prevention, and for other
            site operations.
          </p>
          <p>
            If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player
            to block Flash Cookies storage using the tools contained in the{' '}
            <a
              href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:underline"
            >
              Website Storage Settings Panel
            </a>
            . You can also control Flash Cookies by going to the{' '}
            <a
              href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:underline"
            >
              Global Storage Settings Panel
            </a>{' '}
            and following the instructions (which may include instructions that explain, for example, how to delete
            existing Flash Cookies, how to prevent Flash LSOs from being placed on your computer without your being
            asked, and how to block Flash Cookies that are not being delivered by the operator of the page you are on
            at the time).
          </p>
          <p>
            Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or
            impede the functionality of some Flash applications, including, potentially, Flash applications used in
            connection with our services or online content.
          </p>
        </Section>

        <Section title="Do you serve targeted advertising?">
          <p>
            Third parties may serve cookies on your computer or mobile device to serve advertising through our Website.
            These companies may use information about your visits to this and other websites in order to provide relevant
            advertisements about goods and services that you may be interested in. They may also employ technology that
            is used to measure the effectiveness of advertisements. They can accomplish this by using cookies or web
            beacons to collect information about your visits to this and other sites in order to provide relevant
            advertisements about goods and services of potential interest to you. The information collected through this
            process does not enable us or them to identify your name, contact details, or other details that directly
            identify you unless you choose to provide these.
          </p>
        </Section>

        <Section title="How often will you update this Cookie Policy?">
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies
            we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy
            regularly to stay informed about our use of cookies and related technologies.
          </p>
          <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>
        </Section>

        <Section title="Where can I get further information?">
          <p>If you have any questions about our use of cookies or other technologies, please contact us at:</p>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 mt-4 space-y-1">
            <p className="font-semibold text-white">Keplix Private Limited</p>
            <p>IX/2659, Street no 17, Kailash Nagar</p>
            <p>Delhi, Delhi 110031</p>
            <p>India</p>
            <p className="mt-2">
              Email:{' '}
              <a href="mailto:privacy@keplix.co.in" className="text-red-400 hover:underline">
                privacy@keplix.co.in
              </a>
            </p>
            <p>
              Phone:{' '}
              <a href="tel:+919818915720" className="text-red-400 hover:underline">
                +91 98189 15720
              </a>
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default CookiePolicy;
