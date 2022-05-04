import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {

        return (
            <div>
                    <AppBar position="static" style={{ backgroundColor: '#F2F3F4'}} >
                         <Toolbar variant="dense">
                            <Typography variant="h6" >

                            </Typography>
                         </Toolbar>
                    </AppBar>
                    <br/>
            </div>
        );
    }
}

export default Header;