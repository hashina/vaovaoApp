import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

let theme = createMuiTheme();

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Header/>
                <div className="container">
                    {this.props.children}
                </div>
                <Footer/>
            </MuiThemeProvider>
        );
    }
}

export default App;
