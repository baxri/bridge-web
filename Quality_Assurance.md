# Initial setup & clear data ready for QA

1. Start intro-backend backend with `rake test_server:start`.
2. Start intro-client frontend with `npm start`.

# Account creation

1. Create Account with `Kylo Ren`, `kylo@mailinator.com`, password `darkside`.
2. Click Sign up.
3. If any feild is blank error message appear and sign up button is disabled.
4. If duplicate email id found error message appear.

# Forget Password

1. Type email id.
2. Click Reset password it shows success message.
3. If email id feild blank or email id doesn't match database it shows an error
   message.
4. After success it redirects to Reset password form with feild new password and
   confirm password.
5. After success it redirects to Login page.

# Login

1. Login with email id kylo@mailinator.com and password `darkside`.
2. Click Log in.
3. If initials does not match then error message appear.
4. If any feild is blank it shows error message.

# Home Page

Condition 1: (If User has made intros)

1.  After successful login it shows home page.
2.  Displays a Make an intro.
3.  Display Overview sidenav.
4.  Display Intros sidenav.
5.  Display Contacts sidenav.
6.  Display Intros waiting for confirmation with count.
7.  Display Intros with no reply with count.
8.  Display Completed intros with count.
9.  Display Recent Intros with list of recent intros.
10. Display Latest Activity with list of latest activities.
11. A navbar with User name and dropdown with menu Profile and Log Out Button.
12. When clicked on log out button it logs out the user.

Condition 2: (If new user with no intro created)

1.  After successful login it shows home page.
2.  Displays a Make an intro.
3.  Display Overview sidenav.
4.  Display Intros sidenav.
5.  Display Contacts sidenav.
6.  Display Intros waiting for confirmation with count.
7.  Display Intros with no reply with count.
8.  Display Completed intros with count.
9.  Display Recent Intros with message `You haven't made any intros yet`.
10. Display Latest Activity with message `There's no activity`.
11. A navbar with User name and dropdown with menu Profile and Log Out Button.
12. When clicked on log out button it logs out the user.

# Introduction Page

1. After successful login it shows home page.
2. Click on Intros in sidenav.
3. Redirects to introductions page and display a table of introductions created by
   user with intro filters namely Active, ToDo, NoReply, Done, Declined, Archived.
4. Intro filter Active is clicked show the respective list of
   Active intros.
5. Intro filter ToDo is clicked show the respective list of
   ToDo intros.
6. Intro filter NoReply is clicked show the respective list of
   NoReply intros.
7. Intro filter Done is clicked show the respective list of
   Done intros.
8. Intro filter Declined is clicked show the respective list of
   Declined intros.
9. Intro filter Archived is clicked show the respective list of
   Archived intros.
10. When Make an intro is clicked it redirects to introduction/new.
11. When an Intro is clicked it redirects to introduction/initialized:id
    and shows intro details in sidebar.

# Intro creation

Condition 1: (If Intro & To are not found in contact suggestions)

1. After successful login it shows home page with start intro button.
2. Click on Make an intro button.
3. Type email id or name in Intro feild it shows contact suggestions.
4. Press Enter.
5. Type email id or name in To feild it shows contact suggestions.
6. Press Enter.
7. Click Continue.
8. If Intro email id or name not found it redirects to introduction/new with edit
   form.
9. Until missing intro name or email is not typed in start intro button is
   disbaled.
10. Click Make an intro to create Intro.

Condition 2: (If both contacts are found)

1. After successful login it shows home page with start intro button
2. Click on Make an intro button.
3. Type email id or name in Intro feild it shows contact suggestions.
4. Click on suggested contact.
5. Type email id or name in To feild it shows contact suggestions.
6. Click on suggested contact.
7. Click Continue.
8. Click Make an intro to create Intro.

# Cancel Intro

1. If Created intro is clicked on Introduction Page or Recent Intros on home
   page it redirects introductions/:id page.
2. Click Cancel Intro button appears and intro is cancelled.

# Contact Page

1. After successful login it shows home page.
2. Click on contacts sidenav it redirects to contacts page.
3. Displays a list of contacts.
4. If user has made no intros then it displays message `Contacts will be shown once you have made your first intro`.

# Contacts Introductions Page

1. After successful login it shows home page.
2. Click on contacts it redirects to contacts page.
3. Displays a list of contacts.
4. When a Contact name is clicked it redirects to contacts/:contactId.
5. Displays a table of intros with intro filters of respective contact.

# Contact New Intro

1. After successful login it shows home page.
2. When clicked on contact on home page it redirects to contacts page.
3. Displays a list of contact names.
4. When a Contact name is clicked it redirects to contacts/:contactId.
5. Click on Make an intro dropdown button.
6. Dropdown menu shows two items namely `Intro contact name to someone` &
   `Intro someone to contact name`.

   Condition 1 : (If `Intro contact name to someone` is clicked)

7. It redirects to introductions/new with contact name pre-filled in Intro feild
   in New Intro form.
8. Type email id or name in To feild it shows contact suggestions.
9. Click on suggested contact.
10. Press Enter.
11. Click Continue.
12. Displays two buttons edit intro message with contact name and start intro.
13. Click Start intro to create a new intro.

    Condition 1 : (If `Intro someone to contact name` is clicked)

14. It redirects to introductions/new but with contact name pre-filled in To feild
    in New Intro form.
15. Type email id or name in To feild it shows contact suggestions.
16. Click on suggested contact.
17. Press Enter.
18. Click Continue.
19. Displays two buttons edit intro message with contact name and start intro.
20. Click Start intro to create a new intro.

# Profile Page

1. After successful login it shows home page.
2. In navbar contact name & contact pic is shown as a dropdown with menu Profile
   and Log Out Button.
3. Click on dropdown menu item Profile redirects to profile page.
4. A form is shown with contact information which includes profile, editable
   input boxes with name and last name. Button's namely save, cancel , delete account, Connect Gmail , Import Linkedin are displayed.
5. When first name or last name is edited , if found invalid it shows error
   message. If found valid it save contact information and show success message.
6. When Delete Account button is clicked, it redirects to recover page.
7. When Connect gmail is clicked, it redirects to import contacts page.
8. When Import LinkedIn contacts clicked, it redirects to /connect/linkedin page.

# Confirm Intro

1. When a intro is created from introduction/new page, a personal e-mail to from
   contact is send which includes an accept intro link.
2. When Confirm Intro is clicked it redirects to introductionurl/token/
   confirm?intialized.
3. Confirm page includes three editable input feild namely Why would like the
   intro , A bit about yourself, Linkedin Profile Link and button Approve Introduction.
4. When all feild are valid it redirects to /confirmation-success and update
   status on introductions/introductionid page which shows confirm intro and cancel intro buttons.
5. When invalid it shows error message.

# Publish Intro

1. When Confirm Intro is clicked on introductions/introduction:id page it
   redirects to publish page `${introductionsUrl}/${acceptedIntro.id}/publish`.
2. Publish Page displays input feild to email, note, message pre-viewer.
3. When all fields are valid, it publishes the intro.
4. When cancel button is clicked, it redirects to home.

# Connect Gmail Account

1. After successful login it shows home page.
2. In navbar contact name & contact pic is shown as a dropdown with menu Profile
   and Log Out Button.
3. Click on dropdown menu item Profile redirects to profile page.
4. Click on Connect Gmail Account which redirects to page
   introductions/import-contacts?importing=true.
5. It opens a pop-up which include a gmail account selection
6. After selection of gmail account it redirects a page which ask user to
   allow intropath to read gmail accounts.
7. If successful it shows gmail account email in Connected Gmail Accounts table
   with remove button on profile page.
8. If unable to import gmail account it displays error message `Oops, there was a problem importing your contacts :(` with Try Again and Skip button.
