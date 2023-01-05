$(document).ready(() => {
    //email checker function
    function checkEmail(item) {
        let symbol = item.indexOf("@");
        if(symbol < 1) 
            return false;

        let dot = item.indexOf(".");
        if(dot <= symbol + 2) 
            return false;
    
        if (dot === item.length - 1) 
            return false;
    
        return true;
    }

    //credential checker. Automatically redirects to login if not logged in
    let cookieData = {};
    let cookies = document.cookie.split(';');
    cookies.forEach(e => {
        let item = e.split('=');
        let val = item[0] === 'isLoggedIn' ? Boolean(item[1]) : item[1];
        cookieData[item[0]] = val;
    })
    
    //if cookie present & the value is true, then the user is logged in
    if(!cookieData.hasOwnProperty('isLoggedIn') || !cookieData.isLoggedIn){
        $('.require-login').attr('href', 'login.html').click(e => {
            alert('You must be logged in to use this menu!');
        });
    }else{
        $("li > a[href='register.html']").parent().hide();
        $('.menu-btn').text('Profile').attr('href', 'profile.html');
        $('ul.dropdown').addClass('loggedin');
    }

    //logout
    if($('#logout').length){
        $('#logout').click(e => {
            e.preventDefault();
            document.cookie.split(";").forEach(e => {
                document.cookie = e.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
            window.localStorage.clear();
            alert('Log out successful!');
            location.assign('index.html');
        })
    }

    //login validation
    if($('#login-btn').length){
        $('#login-btn').click(e => {
            e.preventDefault();
            let fields = {
                user: '',
                password: ''
            };

            let keys = Object.keys(fields);
            keys.every(e => {
                fields[e] = $('input[name='+e+']').val();
                if(!fields[e].trim()){
                    alert('The '+e.split('_').join(' ')+' field is required!');
                    isValid = false;
                    return false;
                }
                return true;
            });

            if(!checkEmail(fields.user)){
                alert('Email is not valid!');
                return;
            }

            //set login cookie
            // 5 minutes in miliseconds
            const duration = 300*1000;
            //set expiration date to 5 minutes;
            let expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + duration);
            let cookieString = 'isLoggedIn=true;expires='+expirationDate.toUTCString()+';path=/';
            document.cookie = cookieString;
            alert('Login Successful!');
            location.assign('index.html');
        })
    }

    //register validation
    if($('#register-btn').length){
        $('#register-btn').click(e => {
            e.preventDefault();
            //verify tos
            let tos = $('input[name=tos]').is(':checked');
            if(!tos){
                alert('Please check and agree to our Term of Services!');
                return;
            }

            let isValid = true;
            //get variables
            let fields = {
                user: '',
                email: '',
                dob: '',
                gender: '',
                city: '',
                password: '',
                confirm_password: ''
            };

            //validation 1 : check if all fields are filled
            let keys = Object.keys(fields);
            keys.every(e => {
                switch(e){
                    case 'gender':
                        fields[e] = $('input[name='+e+']:checked').val();
                        break;
                    case 'city':
                        fields[e] = $('select#'+e+' option:checked').val();
                        break;
                    default:
                        fields[e] = $('input[name='+e+']').val();
                }
                if(!fields[e].trim()){
                    alert('The '+e.split('_').join(' ')+' field is required!');
                    isValid = false;
                    return false;
                }
                return true;
            });

            if(!isValid) return;

            //validation 2 : check email validity
            if(!checkEmail(fields.email)){
                alert('Email is not valid!');
                return;
            }

            //validation 3 : check if password contains string from username
            if(fields.email.includes(fields.user)){
                alert('Password shouldn\'t contains username!');
                return;
            }
            
            //validation 4 : check password length
            if(fields.password.length < 8){
                alert('Password must be 8 characters minimum!');
                return;
            }

            //validation 5 : check if password and confirm password matches
            if(fields.password !== fields.confirm_password){
                alert('Password confirmation does not match!');
                return;
            }

            alert('Registration Successful');
            location.assign('login.html');
        })
    }
});