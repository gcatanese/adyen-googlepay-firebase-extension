import React from "react";

import Alert from '@mui/material/Alert';
import Header from '../header';
import Container from '@mui/material/Container';
import KeepShoppingMenu from '../keepShoppingMenu'
import Typography from '@mui/material/Typography';

class RefusedPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            reason: 'Unexpected Error'  // default
        };
    }

    async componentDidMount() {
        var location = document.location;
        const url = new URL(location);
        const reason = url.searchParams.get('reason');

        if(reason !== null) {
            this.setState({'reason': reason});
        }

        window.history.replaceState( {} , 'TakeHomeTest', '/result/refused' );
    }

    render() {

        return (
            <div>
                <Header/>
                <Container component="main" maxWidth="md">
                    <div >

                        <Container component="main" maxWidth="xs">
                            <Alert severity="warning">The payment has been declined ({this.state.reason})</Alert>
                        </Container>

                        <br/><br/>
                        <Typography variant="body1" color="textSecondary" gutterBottom>
                            <i>Please try the payment again using a different payment method or card.</i>
                        </Typography>

                    </div>
                </Container>

                <KeepShoppingMenu/>

            </div>

            );
    }

}

export default RefusedPage;

