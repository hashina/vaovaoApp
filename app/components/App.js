import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

let theme = createMuiTheme();

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <MuiThemeProvider theme={theme}>
                    <Header/>
                    <div className="container">
                        {this.props.children}
                    </div>
                    <Footer/>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;





