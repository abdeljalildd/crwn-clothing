import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';

class App extends React.Component {
  
  
  unsubscribFromAuth = null;

  componentDidMount(){
   this.unsubscribFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            
              id: snapShot.id,
              ...snapShot.data()
            
          });

          
        });
        
      }else{
        this.props.setCurrentUser(userAuth);
      }

    })
  }

  componentWillUnmount(){
    this.unsubscribFromAuth();
  }

  render(){ 
   return (
      <div >
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/checkout' component={CheckoutPage}/>
          <Route path='/signin' render={() => this.props.CurrentUser ? <Redirect to='/'/> : <SignInAndSignUp/> }/>
        </Switch>
      </div>
  );
}
}


const mapStateToProps = createStructuredSelector({
  CurrentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
