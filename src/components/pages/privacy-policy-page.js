import React, { Component } from 'react'
import { Container } from 'reactstrap'
import ScrollUpOnMount from '../shared/components/ScrollUpOnMount'

class PrivacyPolicyPage extends Component {
  render() {
    return (
      <Container>
        <ScrollUpOnMount />
        <div className="policy-page">
          <h2>Privacy Policy</h2>

          <hr />

          <p>
            We at Bridge are committed to protecting your privacy. This privacy
            policy applies to our browser extension (Bridge), our mobile app
            (Bridge), our website (
            <a href="https://brdg.app">https://brdg.app</a>), and any subdomains
            of brdg.app.
          </p>

          <p>
            The information we gather or process is used solely for core
            functionality of Bridge and to improve the quality and security of
            our service. Your information isn’t and has never been sold to third
            parties.
          </p>

          <br />

          <h3>
            <b>What information is being stored, or accessed?</b>
          </h3>

          <br />

          <h4>Bridge account information</h4>

          <p>
            Your name, email, account settings, and data (such as intros) are
            transferred and stored securely, solely for your usage and not
            shared with any other third parties, except as specified in this
            policy.
          </p>

          <br />

          <h4>Data accessible through WebExtensions API</h4>

          <p>
            <b>
              The Bridge extension can only access specific information that you
              have explicitly granted permission for. We do not track your
              browsing history.
            </b>
          </p>

          <p>
            WebExtension APIs used within Chrome Extensions and Firefox Add-ons
            have fine-grained permission levels that are enforced by the Web
            Browser, restricting information that our extension has access to
            within your Browser.
          </p>

          <p>
            Additional optional permissions may be requested when you enable
            specific features. When you enable a feature that requests an
            optional permission, your Web Browser will make it clear what
            permission(s) are being requested. The feature will be accessible
            once you choose to allow the requested permission(s).
          </p>

          <br />

          <h4>Google account and contacts information</h4>

          <p>
            Without your explicit authorization, Bridge cannot access your
            Google data. For the purpose of improving the quality of our
            service, we will offer you the option to import your Google contacts
            and to approve our request for access. This is called the “OAuth
            handshake.”
          </p>

          <p>
            We only communicate with Google servers through their API. You can
            revoke access at any time.
          </p>

          <p>Once Bridge is given explicit access, it:</p>

          <p>
            Collects <b>Google account data</b> including your name, email
            address and profile picture.
          </p>

          <p>
            Collects <b>Google contacts data</b> including their names, email
            addresses and profile pictures.
          </p>

          <p>
            Sends Bridge emails such as intros on behalf of the user using their
            Google account.
          </p>

          <br />

          <h4>LinkedIn contacts information</h4>

          <p>
            Without your explicit authorization, Bridge cannot access your
            LinkedIn data. For the purpose of improving the quality of our
            service, we will offer you the option to upload your LinkedIn data
            archive.
          </p>

          <p>
            We do not communicate directly with the LinkedIn service and can
            only collect data present in the LinkedIn archive.
          </p>

          <p>
            Once Bridge is given explicit access to the LinkedIn archive, it
            collects <b>LinkedIn contacts data</b> including their names, email
            addresses, companies and positions.
          </p>

          <br />

          <h4>Feature usage data</h4>

          <p>
            To improve the content, features and overall experience of the
            service, we gather and log data on how our users access and use
            Bridge.
          </p>

          <p>
            Some of this usage data is sent to Google Analytics. In these cases,
            we do not send any identifying information that could be correlated
            with your account. We also make use of their IP anonymization
            feature to prevent your IP from being associated with your usage
            data.
          </p>

          <br />

          <h3>Email Tracking and Link Tracking</h3>

          <br />

          <p>Bridge includes Email Tracking and Link Tracking features.</p>

          <p>
            The usage of tracking functionality is consistent with industry
            standards. Bridge embeds a small transparent image pixel in the
            outgoing email. If the email is opened, Bridge may be able to inform
            the user about who opened the email, when it was opened, and where
            it was opened. Bridge re-writes link URLs so that it is trackable.
            If the link is clicked by the recipient, Bridge may be able to
            inform the user about who clicked on the link, when it was clicked,
            and the general location of the visitor when they clicked the link.
          </p>

          <p>
            Email recipients may block email open tracking via the settings on
            their email client or by using a pixel-blocking extension.
          </p>

          <br />

          <h3>What vendors do you use?</h3>

          <br />

          <p>
            <b>Google Analytics</b> - Google Analytics is an industry standard
            third-party analytics service that we use to better understand the
            usage and performance of our service(s). The information is
            anonymized so that it is not tied to your IP address.
          </p>

          <br />

          <h3>What are my rights in relation to my Personal Data?</h3>

          <br />

          <p>By using Bridge, you may exercise the following rights:</p>

          <p>
            <b>The right to refuse to provide your personal data</b> - The
            voluntary Personal Data you provide to us is an integral part of
            your use of Bridge Dashboard. You can choose to forego the provision
            of that data, but you will be restricted from using our services.
          </p>

          <p>
            <b>The right to access and modify your personal data</b> - Through
            your use of Bridge, you can access and amend your own data at any
            time. As well as adding, editing and deleting other Bridge data like
            your intros, etc..
          </p>

          <p>
            <b>The right to be forgotten</b> - You can manually delete your
            account by clicking Delete my account on your Profile page at any
            time. See the “What happens to my data when I delete my account?”
            section below to learn more about the deletion process.
          </p>

          <p>
            <b>The right to obtain your personal data</b> - Upon request, we
            will provide a data export of all your data stored in our system. If
            you wish to receive an export of your data, or have any problems
            deleting your account, please contact us at{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:help@brdg.app"
            >
              help@brdg.app
            </a>
            .
          </p>

          <p>
            <b>The right to submit a complaint</b> - If you have a complaint
            about the way in which your Personal Data is handled, please contact
            us at{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:help@brdg.app"
            >
              help@brdg.app
            </a>
            . After submitting a complaint, we will reply within five (5)
            business days to confirm that we have received your complaint. After
            receiving your complaint, we will investigate it and provide you
            with our response within two (2) weeks.
          </p>

          <p>
            <b>
              The right to submit a complaint with a data protection authority
            </b>{' '}
            - If you are a resident of the European Union, and you are not
            satisfied with the outcome of the complaint submitted to us, you
            have the right to lodge a complaint with your local data protection
            authority.
          </p>

          <br />

          <h3>What happens to my data when I delete my account?</h3>

          <br />

          <p>
            Upon account deletion, your account is flagged as deleted and your
            data is no longer accessible. This data is stored for a grace period
            (90 days) to allow for account recovery in the case of accidental or
            malicious deletion, or your desire to reopen your account. Upon
            request, you can expedite the process of performing a hard delete to
            remove all of your personal data from our databases. After a hard
            delete, your data will be deleted from our system, but could still
            be present in encrypted database backups for up to an additional 35
            days.
          </p>

          <p>
            To request an expedited hard delete, please send a message to{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:help@brdg.app"
            >
              help@brdg.app
            </a>
            .
          </p>

          <br />

          <h3>Is my data secure?</h3>

          <br />

          <p>
            Data security is a priority at all times. We use a Tier 1 cloud
            provider to run our operations (Heroku).
          </p>

          <p>
            In Transit All data communication in transit to and from our servers
            is secured using HTTPS/TLS. All Bridge domains have HTTP Strict
            Transport Security (HSTS) enabled.
          </p>

          <p>
            At Rest All data in our databases and their associated backups are
            encrypted at rest.
          </p>

          <br />

          <h3>Will the privacy policy change?</h3>

          <br />

          <p>
            Although most changes are likely to be minor, Bridge may change its
            Privacy Policy from time to time, and at Bridge’s sole discretion.
            Bridge encourages visitors to frequently check this page for any
            changes to its Privacy Policy. Your continued use of this site after
            any change in this Privacy Policy will constitute your acceptance of
            such change.
          </p>

          <p>
            If you have any questions about Bridge’s Privacy policy, please
            contact us at{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:help@brdg.app"
            >
              help@brdg.app
            </a>
            .
          </p>

          <br />

          <p style={{ color: '#aeaeae' }}>Last updated July 22, 2019.</p>
        </div>
      </Container>
    )
  }
}

export default PrivacyPolicyPage
