const express = require('express');
const passport = require('passport');
const router = express.Router();
const { Authenticated , NotAuthenticated }  = require('../config/auth');


const userController = require('../controllers/user');
const transferController = require('../controllers/transfer');


// login routes
router.get('/login' , NotAuthenticated , userController.getLoginPage);

router.post('/login', (req,res,next) => {
    passport.authenticate('local' , {
      successRedirect : '/user/home' , 
      failureRedirect : '/user/login' , 
      failureFlash : true 
  })(req,res,next);
});

router.get('/login/google' , (req,res,next) => {
  passport.authenticate('google' , {
    scope : ['profile', 'email']
  })(req,res,next);
});

// google redirect handling

router.get('/google/redirect' , (req,res,next) =>{
passport.authenticate('google' , {
  successRedirect : '/user/home' , 
  failureRedirect : '/user/register'
})(req,res,next);
});


//  logout route
router.post('/logout' , (req,res,next) =>{
  req.logOut();
  req.flash('success_msg' , "You have logged out successfully");
  res.redirect('/user/login');
})

// Register User Route

router.get('/register' , NotAuthenticated , userController.getRegisterPage);
router.post('/register' , userController.PostRegisterPage);


router.get('/home'  , Authenticated ,  userController.getHome);
router.post('/home' , userController.postHome);

router.get('/transfer'  , Authenticated , transferController.getTransferPage);
router.post('/transfer' , transferController.postTransferPage);

router.get('/edit-transaction/:TransferId'  , Authenticated , transferController.getEditTransaction);
router.post('/edit-transaction/:TransferId' , transferController.postEditTransaction);

router.get('/transaction' , Authenticated  ,  transferController.getTransactions);

router.get('/profile' , Authenticated , userController.getProfile);

router.get('/transaction/:FriendId' , Authenticated  ,  transferController.getFriendTransactions);

router.get('/transaction/delete/:TransferId' , Authenticated ,  transferController.deleteTransaction);



module.exports = router;