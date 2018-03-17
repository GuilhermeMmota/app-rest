// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
});

// Init/Create left panel view
var mainView = app.views.create('.view-left', {
  url: '/'
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

//// Login Screen Demo
//$$('#my-login-screen .login-button').on('click', function () {
//  var username = $$('#my-login-screen [name="username"]').val();
//  var password = $$('#my-login-screen [name="password"]').val();
//
// 
//
//  // Alert username and password
//  app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
//});

// -------------------SignUp------------------
$$('#my-login-screen .SignUp').on('click', function () {
  var username = $$('#my-login-screen [name="email"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br>Password:' + password);
  firebase
    .auth()
    .createUserWithEmailAndPassword(username,password)
    .then( function(){
      app.dialog.alert('Welcome: ' + username);
      this.$$('.toolbar-inner').text('Welcome: ' + username);
    })
    .cath( function(error){
      console.error(error.code)
      console.error(error.message)
      app.dialog.alert('Falha ao cadastrar, verifique o erro no console');
      this.$$('.toolbar-inner').text('Welcome:' + username);
    })
  });

  // ------------------------------SingIn----------------------------------

  $$('#my-login-screen .SignIn').on('click', function () {
    var username = $$('#my-login-screen [name="email"]').val();
    var password = $$('#my-login-screen [name="password"]').val();
    
    // Alert username and password
    app.dialog.alert('Username: ' + username + '<br>Password:' + password);
    firebase
      .auth()
      .signInWithEmailAndPassword(username,password)
      .then( function(){
        app.dialog.alert('Welcome: ' + username);
        this.$$('.toolbar-inner').text('Welcome: ' + username + 'you are online');
        $$('.logoff').show();
        $$('.login-screen-open').hide();
        $$('#email').val('');
        $$('#password').val('');
      })
      .cath( function(error){
        console.error(error.code)
        console.error(error.message)
        if (error.code =='auth/invalid-email'){
          app.dialog.alert('Email invalido.');
        }
        app.dialog.alert('Falha ao cadastrar, verifique o erro no console');
      })

      // // Close login screen
      app.loginScreen.close('#my-login-screen');
     });

    // --------------------SignOut-----------------

    $$('#my-login-screen .SignOut').on('click', function () {
      app.loginScreen.close('#my-login-screen');
      $$('#email').val('');
      $$('#password').val('');
      firebase
      .auth()
      .signOut()
      .then( function () {
        this.$$('.toolbar-inner').text('Usuário invalido');
        app.dialog.alert('Usuário invalido');
        app.loginScreen.close('#my-login-screen');
        $$('.logoff').hide('');
        $$('.login-screen-open').show('');
      }, function(error){
        console.error(error)
      })
    });
// -----------------------------------------------------------------
    $$('#my-login-screen .login-screen-close').on('click', function () {
      $$('#email').val('');
      $$('#password').val('');
    })
    $$('.logoff').on('click', function () {
      firebase
      .auth()
      .signOut()
      .then( function () {
        this.$$('.toolbar-inner').text('Usuário invalido');
        app.dialog.alert('Usuário invalido');
        $$('#email').val('');
        $$('#password').val('');
        $$('.logoff').hide('');
        $$('.login-screen-open').show('');
    }, function(error){
      console.error(error)
    })
    }) 