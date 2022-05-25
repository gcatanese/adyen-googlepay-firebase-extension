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
import CircularProgress from '@material-ui/core/CircularProgress';

import 'semantic-ui-css/semantic.min.css'
import { Message } from "semantic-ui-react";

import {hideElement, showElement} from "./utils.js"

class CheckoutGooglePay extends React.Component {

    constructor() {
        super();

        this.state = {
            'order': {},
            'errorMessage': ''
        }
    }

    async componentDidMount() {
        const orderId =  this.props.match.params.order;
        const resp = await axios.get('/api/order/' + orderId);

        this.setState({'order': resp.data})
    }

    async addPaymentRequest(amount, currency, token) {
        showElement("loadingCardSpinnerId");
        const ref = await addDoc(collection(db, 'payments'), {
            psp: 'adyen',
            total: amount,
            currency: currency,
            paymentToken: token
        })

        const q = query(collection(db, "payments"), where("__name__", "==", ref.id));

        const observer = onSnapshot(q, docSnapshot => {
            docSnapshot.docChanges().forEach(change => {
                if (change.type === "modified") {
                    console.log("record updated ", change.doc.data());
                    this.payment_result(change.doc.data());
                    hideElement("loadingCardSpinnerId");
                }
            });
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    }

    async payment_result(data) {
        if(data.error !== undefined) {
            console.log(data.error);
            this.setState({'errorMessage': data.error.message})
            showElement("paymentErrorMessageId");
        } else {
            showElement("paymentSuccessMessageId");
        }
    }

    handleErrorMessageDismiss = () => {
        hideElement("paymentErrorMessageId");
    }

    render() {

       const {order} = this.state;

        return (
            <div>
                <Header/>

                <Typography variant="body2" color="textSecondary" align="center"
                    style = {{
                        top : "0",
                        textalign: 'center',
                        width: '100%',
                        padding: '5px',
                        marginTop: 'auto'
                    }}>
                    <a href="/">Home</a>&nbsp;&nbsp;
                </Typography>
                <br/>

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
                            <div style= {{width: "100%", margin: "auto", textAlign: "right", paddingRight: "2px"}} >
                              <img
                                style = {{ width: "12%", height: "12%"}}
                                src = "/adyen.svg"
                            />
                            </div>
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
                                            gateway: 'adyen',
                                            gatewayMerchantId: 'TestMerchantAccount',
                                            },
                                        },
                                    }
                                ],
                                merchantInfo: {
                                  merchantId: 'TestMerchantAccount',
                                  merchantName: 'Demo',
                                },
                                transactionInfo: {
                                  totalPriceStatus: 'FINAL',
                                  totalPriceLabel: 'Total',
                                  totalPrice: order.amount,
                                    currencyCode: order.currency,
                                    countryCode: 'NL',
                                }
                            }}
                            onLoadPaymentData={ paymentRequest => {
                                var token = paymentRequest.paymentMethodData.tokenizationData.token;
                                /* add payment to Firecloud */
                                this.addPaymentRequest(order.amount, order.currency, token);
                                }
                            }
                            onCancel={() => console.log('canceled by shopper')}
                    />
                </Grid>
                { /* spinning during payment */ }
                <div id="loadingCardSpinnerId" style={{display: 'none'}}>
                    <br/>
                    <Grid container justify = "center" >
                        <CircularProgress size={85} thickness={1}/>
                    </Grid>
                </div>
                { /* payment error message */ }
                <div id="paymentErrorMessageId" style={{display: 'none'}}>
                    <br/>
                    <Grid container justify = "center" >
                        <Message negative
                            onDismiss={this.handleErrorMessageDismiss}
                            header="Error"
                            content={"An error has occurred [" + this.state.errorMessage + "]"}
                        />
                    </Grid>
                </div>
                { /* payment success message */ }
                <div id="paymentSuccessMessageId" style={{display: 'none'}}>
                    <br/>
                    <Grid container justify = "center" >
                        <Message positive
                            header="Your payment has been executed"
                            content="Thank you for shopping with us!"
                        />
                    </Grid>
                </div>

                </Container>
            </div>
        );
    }
}

export default withRouter(CheckoutGooglePay);
