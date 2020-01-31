import React, { Component } from 'react'
import { Container } from 'reactstrap'
import ScrollUpOnMount from '../shared/components/ScrollUpOnMount'

class PrivacyPolicyPage extends Component {
  render() {
    return (
      <Container>
        <ScrollUpOnMount />
        <div className="policy-page">
          <h2>Cookie Policy</h2>

          <br />

          <h3>
            <b>What are cookies?</b>
          </h3>

          <br />

          <p>
            A cookie is a small piece of text that allows a website to recognize
            your device and maintain a consistent, cohesive experience
            throughout multiple sessions. They are unique to your account or
            your browser. Session-based cookies last only while your browser is
            open and are automatically deleted when you close your browser.
            Persistent cookies last until you or your browser delete them or
            until they expire.
          </p>

          <p>
            Cookies may be used on our main site (
            <a href="https://brdg.app">https://brdg.app</a>), or any subdomains
            tied to them.
          </p>

          <br />

          <h3>
            <b>Essential Cookies</b>
          </h3>

          <br />

          <p>
            Essential cookies are cookies that are those necessary for carrying
            out or facilitating the transmission of communication, and to move
            through the site and use its features.
          </p>

          <p>
            <b>Authentication</b> - We may use Session cookies to store user
            information for the duration of session.
          </p>

          <br />

          <h3>
            <b>How do I restrict cookies?</b>
          </h3>

          <br />

          <p>
            If you decide that you do not want cookies to be set on your device
            by our third-party Partners, you can adjust the settings on your
            internet browser and choose from the available Cookies setting to
            best meet your preferences. While setting options may vary from
            browser to browser, you can generally choose to reject some or all
            cookies, or instead to receive a notification when a cookie is being
            placed on your device. For more information, please refer to the
            user help information for your browser of choice. Please keep in
            mind that cookies may be required for certain functionalities, and
            by blocking these cookies, you may limit your access to certain
            parts or features of our sites and platforms.
          </p>

          <p>
            <a
              href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Chrome cookies information
            </a>
          </p>

          <p>
            <a
              href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firefox cookies information
            </a>
          </p>

          <br />

          <h3>
            <b>Will this cookie policy change?</b>
          </h3>

          <br />

          <p>
            Although most changes are likely to be minor, our use of cookies,
            names of cookies, and other cookie related technology may change
            over time. Bridge may change the Cookie Policy from time to time,
            and at Bridge’s sole discretion. Upon adding any further
            non-essential cookies, Bridge will request your consent to use these
            cookies. Bridge encourages visitors to frequently check this page
            for any changes to its Cookie Policy. Your continued use of this
            site after any change in this Cookie Policy will constitute your
            acceptance of such change.
          </p>

          <p>
            If you have any questions about Bridge’s Cookies policy, please
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
