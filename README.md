# GooglePay with Firebase extension and Adyen

This repository shows how to perform a payment with GooglePay using the [Firebase extension](https://github.com/google-pay/firebase-extension) 
and [Adyen](https://www.adyen.com/) as Payment Service Provider (PSP).

![Alt text](readme-homepage.png?raw=true "Homepage screenshot")

## Prerequisites

* your Firebase project must be on the [Blaze](https://firebase.google.com/pricing) plan
* obtain Adyen credentials to setup the necessary configuration (i.e. API Key, etc..)

## Setup

Install the [Make Payments with Google Pay](https://firebase.google.com/products/extensions/google-pay-make-payment) Firebase extension.

Access [Firebase Console](https://console.firebase.google.com/u/0/) to configure Adyen [API Key](https://docs.adyen.com/development-resources/api-credentials#generate-your-api-key) and 
[Merchant Account] (https://docs.adyen.com/account/account-structure)

Define the Cloud Firestore path (default is `payment`)

Create `.env` file to define the environment variables and tokens

```
    REACT_APP_API_KEY=...
    REACT_APP_AUTH_DOMAIN=...
    REACT_APP_PROJECT_ID=...
    REACT_APP_STORAGE_BUCKET=...
    REACT_APP_MESSAGING_SENDER_ID=...
    REACT_APP_APP_ID=...
```


## Running on DEV

Start the backend

```
 cd app
 python app.py
```
Start the frontend

```
 cd app/frontend
 yarn start
```

## References

[@firebase/firestore reference](https://firebase.google.com/docs/reference/js/firestore_.md#@firebase/firestore)

[Google Pay button](https://github.com/google-pay/google-pay-button)