import { createGlobalStyle, css } from 'styled-components'

import { isNewUnloggedDesign, isSideView } from 'utils/newDesign'

const unloggedStyle = css`
  body,
  html {
    background-color: #f2f2f2;
  }

  body {
    margin-bottom: 95px;
    background: #f2f2f2 !important;
  }

  .app-container {
    padding-top: 60px;
    padding-bottom: 100px;
  }

  a {
    color: #047bfe;
  }

  footer {
    background: #f2f2f2 !important;
    height: 95px;
    position: absolute;
  }

  .logo {
    color: #2b2b2b;
  }
`

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Rubik, open-sans !important;
  }
  .react-tagsinput {
    width: 100%;
  }
  .open > .dropdown-menu {
    display: block;
    text-align: right;
    padding: 10px 15px;
  }
  .app-container {
    //min-height: 82vh; 
    min-height: calc(100vh - 63px - 90px); //minus header and footer TODO replace with solution without calc
  }

  .thank-you-page {
    min-height: 77vh !important;
  }

  div.full-snackbar {
    left: 0;
    right: 0;
    transform: translateX(0);
  }
  
  div.full-snackbar-base {
    border-radius: 0;
    text-transform: uppercase;
    font-size: 10px;
    line-height: 12px;
    padding: 2px 12px;
    background-color: #616161;
    width: 100%;
  }

  /* This class was made because styled component and inline css were not working in import contacts */
  .skip-import-btn {
    padding: 8px 20px !important;
  }
  ${props => {
    if (isNewUnloggedDesign(props.history.location.pathname)) {
      return unloggedStyle
    }
  }}
  ${props => {
    if (isSideView(props.history.location.pathname)) {
      return `
        body, html {
          height: 100%;
          overflow: hidden;
        }
      `
    }
  }}
`

export default GlobalStyle
