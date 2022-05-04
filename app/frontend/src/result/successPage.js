import React from "react";

import Alert from '@mui/material/Alert';
import Header from '../header';
import Container from '@mui/material/Container';
import KeepShoppingMenu from '../keepShoppingMenu'

class SuccessPage extends React.Component {

    render() {

        return (
            <div>
                <Header/>
                <Container component="main" maxWidth="xs">
                    <div >

                        <Alert severity="success">Thank you! The payment has been succesful.</Alert>

                    </div>
                </Container>

                <KeepShoppingMenu/>

            </div>
            );
    }

}

export default SuccessPage;

