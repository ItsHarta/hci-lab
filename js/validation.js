$(document).ready(() => {
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

            if(fields.password !== fields.confirm_password){
                alert('Password confirmation does not match!');
                return;
            }

            alert('Registration Successful');
            location.assign('login.html');
        })
    }
});