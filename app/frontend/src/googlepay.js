import React from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';

import GooglePayButton from '@google-pay/button-react';

import {db} from './Firestore'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

import Header from './header'
import Container from '@mui/material/Container';

class CheckoutGooglePay extends React.Component {

    constructor() {
        super();
    }

    async componentDidMount() {

        const orderId =  this.props.match.params.order;
        const resp = await axios.get('/api/order/' + orderId);
        const order = resp.data;
    }

    async addPaymentRequest(amount, currency, token) {

        const ref = await addDoc(collection(db, 'payments'), {
            psp: 'adyen',
            total: 100,
            currency: currency,
            paymentToken: token
        })
    }


    render() {

        return (
            <div>
                <Header/>
                <Container maxWidth="md">
                    <GooglePayButton
                        environment="TEST"
                        paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                                {
                                    type: 'CARD',
                                    parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                },
                                tokenizationSpecification: {
                                    type: 'PAYMENT_GATEWAY',
                                    parameters: {
                                        gateway: 'example',
                                        gatewayMerchantId: 'exampleGatewayMerchantId',
                                        },
                                    },
                                }
                            ],
                            merchantInfo: {
                              merchantId: '12345678901234567890',
                              merchantName: 'Demo Merchant',
                            },
                            transactionInfo: {
                              totalPriceStatus: 'FINAL',
                              totalPriceLabel: 'Total',
                              totalPrice: '100.00',
                              currencyCode: 'USD',
                              countryCode: 'US',
                            },
                        }}
                    onLoadPaymentData={paymentRequest => {
                        console.log('load payment data', paymentRequest);
                        var token = paymentRequest.paymentMethodData.tokenizationData.token;

                        this.addPaymentRequest(120, 'EUR', token);
                        }
                    }
                />
                </Container>
            </div>
        );
    }
}

export default withRouter(CheckoutGooglePay);
