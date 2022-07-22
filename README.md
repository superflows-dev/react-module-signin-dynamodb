# react-module-signin-dynamodb

> A react module that manages the passwordless sign in flow (email otp based), is based on AWS dynamodb as the backend

[![NPM](https://img.shields.io/npm/v/react-module-signin-dynamodb.svg)](https://www.npmjs.com/package/react-module-signin-dynamodb) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Note

This module is under active development. Expect frequent updates.

## Overview

This is a module that provides password less sign in functionality that is email and otp based. The backend is based on AWS DynamoDB. This module integrates the following components:
- Sign in component [View Package](https://www.npmjs.com/package/react-signin-dynamodb)
- OTP component [View Package](https://www.npmjs.com/package/react-otp-dynamodb)
- Splash screen component [View Package](https://www.npmjs.com/package/react-splash-dynamodb)

## Functionality

After the module is called, the splash screen is loaded first. Splash screen checks the validity of the local login state against the backend login state (in dynamodb). If valid, it returns true. Else it redirects to the sign in screen.

## Screens

### Splash Screen Component

<img src="https://user-images.githubusercontent.com/108924653/179990628-02f1fb63-b30d-4db0-8eb9-93f78471d07d.png" width="300">

### Sign In Component

<img src="https://user-images.githubusercontent.com/108924653/179670455-a96c46ef-8ab5-4cf8-a9af-7468bada19eb.png" width="300">

### Otp Component

<img src="https://user-images.githubusercontent.com/108924653/179958693-30ded03b-a16d-4a9e-ac15-dcfe332efb2a.png" width="300">

Then install the dependencies.

## Dependencies

```bash

npm install --save aws-sdk
npm install --save bootstrap
npm install --save react-bootstrap
npm install --save react-dynamodb-helper
npm install --save react-ses-helper
npm install --save react-ui-components-superflows
npm install --save react-email-mask
npm install --save react-safe-storage
npm install --save react-otp-dynamodb
npm install --save react-signin-dynamodb
npm install --save react-splash-dynamodb
npm install --save react-ui-themes-superflows


```
Then review the AWS configuration.

## Install

```bash
npm install --save react-module-signin-dynamodb
```

## Configuration

### AWS SES Sender Receiver

The sender (source) email address should be configured and verified. If SES is in sandbox mode, the receiver email address(es) should also be configured and verified. A test email should be sent from the SES console and ensured that the intended receiver receives it.

### AWS SES Template

This is required if you are planning to send templated emails. An html template should be created. As of July 22, SES console does not support adding email templates. They can only be done through the apis. Best way is to do it via aws command line interface.

### AWS DynamoDB

This component uses dynamodb as the backend. Please create a table as follows:

- Name: Account_Credentials
- Partition Key: email
- Sort Key: none

Create a sample record for testing as follows:
- email: some_valid_email
- firstName: some_firstname
- lastName: some_lastname

### AWS Credentials

AWS region, secret and access key form the credentials. These are required to use this package. It is crucial that these credentials are given the following permissions: 
- SES email sending permissions
- Create, Update, Delete, View permissions for the Account_Credentials table in dynamodb


## Usage

```jsx

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { SignInModule } from 'react-module-signin-dynamodb'
import Themes from 'react-ui-themes-superflows';

const App = () => {

  function signInResult(result) {
    console.log('sign in result', result);
  }

  const theme = Themes.getTheme('Default');

  return (
  
    /*

      lsSecret: a string to be used as passphrase for react safe storage
      lsToken: sign in token, to be obtained from react safe storage
      lsEmail: sign in email
      logoMasthead: app logo
      logoAlt: app logo alt info
      awsRegion: aws sdk region
      awsSecret: aws sdk secret
      awsKey: aws sdk access key
      buttonCaptionSignIn: caption of sign in button
      buttonCaptionOtp=: caption of verify button
      emailTemplateOtp: ses template name
      projectName: project name
      emailSource: source email address as configured in SES
      infoOtp: info message prefix on otp screen
      onSubmitResult: call back function for sign in result
      theme: theme (optional)

    */

    <SignInModule
      
      lsSecret="secret_passphrase"  
      lsToken="token"
      lsEmail="email"
      logoMasthead="https://******************naws.com/superflows_black.png"
      logoAlt="Super flows logo"
      awsRegion="aws_region"
      awsSecret="aws_secret"
      awsKey="aws_access_key"
      buttonCaptionSignIn="Sign In"
      buttonCaptionOtp="Verify"
      emailTemplateOtp="TemplateOtp1"
      projectName="SF-21"
      emailSource="supe************@gmail.com"
      infoOtp="One time password (otp) has been sent to "
      onSubmitResult={signInResult}
      theme={theme}

    />

  )
}

export default App


```

## License

MIT © [superflows-dev](https://github.com/superflows-dev)
