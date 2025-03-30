# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```curl https://start.spring.io/starter.zip \
  -d dependencies=web,security,oauth2-resource-server \
  -d type=maven-project \
  -d language=java \
  -d groupId=com.reference \
  -d artifactId=backend \
  -d name=backend \
  -d packageName=com.reference.backend \
  -o reference-backend.zip```


```curl https://start.spring.io/starter.zip \
  -d dependencies=web,security,oauth2-resource-server \
  -d type=maven-project \
  -d language=java \
  -d groupId=com.atp \
  -d artifactId=atp\
  -d name=atp \
  -d packageName=com.atp \
  -o authorized-third-party.zip```



The third party provider should do the following

1. Provide an API to create reference app end user

2. Provider an API to get a list of Financial Institutions

3. Provide an API to check if the reference app end user is registered and/or registered with third party provider.
   a. This should accept a phone number and match a phone number of internal end users of third party provider
   b. This should return registered as true or false
   c. This should accept optional reference app end user. If the third party provider internal end user is already associated with reference app end user then this should return associated as true or false

4. Provide an API to generate authentication magic url.
   a. This should create a session for the reference app end user in the third party provider database
   b. This should accept phone number in the first page if the reference app does not provide phone number
   c. This should accept OTP in the second page
   d. It should authenticate the OTP and associate the reference app end user to an internal end user on the third party provider end user
   based on phone number match
   e. If the third party provider internal end user is already associated with reference app end user then this magic link
should support account management. The end user should have ability to exit this account management at anytime.

5. Provide a selected accounts API to get accounts selected in the account management


The reference backend should do the following

1. Have a user profile with a phone, first name and last name
2. Maintain a relationship between user profile and Third Party Provider end user
3. Provide an API to get the available Third Party Providers
   a. This API should call the third party provider API to check if the user profile is registered/associated with third party provider.
   b. This API should included registered and associated flags in the response for each Third Party Provider
4. Provide an API to get the list of institutions based on user profile phone being registered with Third Party Provider. Include the Third Provider details in the response
5. Provide a selected accounts API to get the accounts selected in the account management by calling third party provider selected accounts API



The reference frontend should do the following by calling the reference backend API

1. Display "Pay by Bank" button. On click of this button
    a. Call the reference backend API to get the list of Institutions
    b. Display "Register for Saved Accounts" button if association of Third Party Provider is false
    c. Display "Use Saved Accounts" button if registered of Third Party Provider is true
    d. Display the List of Institutions. The end user should be able to select an institution

2. On click of "Register for Saved Accounts" button 
    a. make a call to reference backend to generate authentication magic url
    b. Popup the authentication magic url
    c. On close of the popup make a call to selected accounts API
    d. Display a review screen with the selected accounts

3. On click of "Use Saved Accounts" button
    a. make a call to reference backend to generate authentication magic url
    b. Popup the authentication magic url
    c. On close of the popup make a call to selected accounts API
    d. Display a review screen with the selected accounts



Generate a PlantUML Sequence Diagram for the above requirements




