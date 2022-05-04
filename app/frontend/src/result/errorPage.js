import React from "react";

import Alert from '@mui/material/Alert';
import Header from '../header';
import Container from '@mui/material/Container';
import KeepShoppingMenu from '../keepShoppingMenu'

class ErrorPage extends React.Component {

    render() {

        return (
            <div>
                <Header/>
                <Container component="main" maxWidth="xs">
                    <div >

                        <Alert severity="warning">An error has occurred. Please contact us.</Alert>

                    </div>
                </Container>

                <KeepShoppingMenu/>

            </div>

            );
    }

}

export default ErrorPage;

