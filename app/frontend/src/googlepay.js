import React from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';

import GooglePayButton from '@google-pay/button-react';

import {db} from './Firestore'
import {collection, addDoc, getDoc, onSnapshot, query, where} from 'firebase/firestore'

import Header from './header'
import Container from '@mui/material/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class CheckoutGooglePay extends React.Component {

    constructor() {
        super();

        this.state = {
            'order': {}
        }
    }

    async componentDidMount() {
        const orderId =  this.props.match.params.order;
        const resp = await axios.get('/api/order/' + orderId);

        this.setState({'order': resp.data})
    }

    async addPaymentRequest(amount, currency, token) {
        const ref = await addDoc(collection(db, 'payments'), {
            psp: 'adyen',
            total: amount,
            currency: currency,
            paymentToken: token
        })
        console.log(ref);
        console.log('doc id: ' + ref.id);

//        const observer = onSnapshot(ref, docSnapshot => {
//            console.log(docSnapshot);
//        }, err => {
//            console.log(`Encountered error: ${err}`);
//        });

        //const q = query(collection(db, "payments"), where("psp", "==", 'adyen'));
        const q = query(collection(db, "payments"), where("__name__", "==", ref.id));

        const observer = onSnapshot(q, docSnapshot => {
            docSnapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    console.log("record created -> ", change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("record updated ", change.doc.data());
                }
            });
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }

    render() {

       const {order} = this.state;

        return (
            <div>
                <Header/>
                <Container maxWidth="md">
                    { /* product container */ }
                    <Card  raised="true" >
                        <br/>
                        <div style= {{width: "75%", margin: "auto", textAlign: "center", paddingTop: "2px"}} >
                            <img
                                alt = "Your tree"
                                style = {{ width: "50%", height: "50%"}}
                                src = {order.image}
                            />
                            <Typography variant="body1">{order.title}</Typography>
                            <Box fontWeight="fontWeightLight">(pic by {order.author})</Box>
                        </div>
                        <br/>
                    </Card>
                    <br/>
                    { /* gpay container */ }
                    <Grid container justify = "center">
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
                              totalPrice: '13.00',
                                currencyCode: 'USD',
                                countryCode: 'US',
                            },
                        }}
                        onLoadPaymentData={ paymentRequest => {
                            console.log('load payment data', paymentRequest);
                            var token = paymentRequest.paymentMethodData.tokenizationData.token;
                            /* add payment to Firecloud */
                            this.addPaymentRequest(order.amount, 'EUR', token);
                            }
                        }
                    />
                </Grid>
                </Container>
            </div>
        );
    }
}

export default withRouter(CheckoutGooglePay);
