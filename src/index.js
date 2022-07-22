import React, { useEffect } from 'react'
import { useState } from "react";

import { SignIn } from 'react-signin-dynamodb';
import { Splash } from 'react-splash-dynamodb';
import { Otp } from 'react-otp-dynamodb'
import { maskEmail } from 'react-email-mask';
import { getItem, setItem } from 'react-safe-storage';
import Themes from 'react-ui-themes-superflows';

export const SignInModule = (props) => {

    // flow = 0; not signed in
    // flow = 1; email submitted
    // flow = 2; redirect to splash

    const [flow, setFlow] = useState(-1)
    const [email, setEmail] = useState(0)

    useEffect(() => {
        setFlow(2);
    }, [])

    function processSignin(email, exists) {
        if(exists) {
            setEmail(email);
            setFlow(1);
        }
        
    }

    function processOtp(email, token, exists) {
        if(exists) {
            setItem(props.lsSecret, props.lsEmail, email);
            setItem(props.lsSecret, props.lsToken, token);
            setFlow(2);
        }
    }

    function processSplash(result) {
        if(result) {
          if(props.onSubmitResult != null) props.onSubmitResult(true);
        } else {
            setFlow(0);
        }
    }

    return (
        <div>
            {flow === 0 && <SignIn
                imageUrl={props.logoMasthead} 
                imageAlt={props.logoAlt}
                awsRegion={props.awsRegion}
                awsSecret={props.awsSecret}
                awsKey={props.awsKey}
                buttonCaption={props.buttonCaptionSignin}
                onSubmitResult={processSignin}
                template={props.emailTemplateOtp}
                project={props.projectName}
                emailerSource={props.emailSource}
                theme={props.theme == null ? Themes.getTheme("Default") : props.theme}
            />}
            {flow === 1 && <Otp  
                imageUrl={props.logoMasthead} 
                imageAlt={props.logoAlt}
                awsRegion={props.awsRegion}
                awsSecret={props.awsSecret}
                awsKey={props.awsKey}
                buttonCaption={props.buttonCaptionOtp}
                onSubmitResult={processOtp}
                template={props.emailTemplateOtp}
                project={props.projectName}
                emailerSource={props.emailSource}
                email={email}
                captionInfo={props.infoOtp + maskEmail(email)}
                theme={props.theme == null ? Themes.getTheme("Default") : props.theme}
                />
            }
            {flow === 2 && <Splash  
                imageUrl={props.logoMasthead} 
                imageAlt={props.logoAlt}
                onSubmitResult={processSplash}
                awsRegion={props.awsRegion}
                awsSecret={props.awsSecret}
                awsKey={props.awsKey}
                email={getItem(props.lsSecret, props.lsEmail) == null ? "na" : getItem(props.lsSecret, props.lsEmail)}
                token={getItem(props.lsSecret, props.lsToken) == null ? "na" : getItem(props.lsSecret, props.lsToken)}
                theme={props.theme == null ? Themes.getTheme("Default") : props.theme}
                />
            }
        </div>
    )

}