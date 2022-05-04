

import Header from './header'
import ProductList from './products'
import Container from '@mui/material/Container';

function Home() {
    return (
        <div>
            <Header/>
            <Container maxWidth="md">
                <ProductList/>
            </Container>
        </div>
    );
}

export default Home;
