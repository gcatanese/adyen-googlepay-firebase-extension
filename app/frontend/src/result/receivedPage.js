import React from "react";

import Alert from '@mui/material/Alert';
import Header from '../header';
import Container from '@mui/material/Container';
import KeepShoppingMenu from '../keepShoppingMenu'

class ReceivedPage extends React.Component {

    render() {

        return (
            <div>
                <Header/>
                <Container component="main" maxWidth="xs">
                    <div >

                        <Alert severity="info">The payment is being processed. We will contact you as soon as it is confirmed. </Alert>

                    </div>
                </Container>

                <KeepShoppingMenu/>

            </div>
            );
    }

}

export default ReceivedPage;

