let ChrysValidator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');

        ChrysValidator.clearErrors();

        for(let i=0;i<inputs.length;i++){
            let input = inputs[i];
            let check = ChrysValidator.checkInput(input);
            if(check !== true){
                send = false;
                ChrysValidator.showError(input, check);
            }
        }

        
        if(send){
            form.submit();
        }

    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':        // nao aceita campos vazios
                        if(input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                    break;
                    case 'min':             // pelo menos dois caracteres 
                        if(input.value.length < rDetails[1]){
                            return 'Campo tem que ter pelo menos '+rDetails[1]+' caracteres';
                        }
                    break;
                    case 'email':           //padrao especifico de email. expressao regular
                         if(input.value != '') {
                             let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                 if(!regex.test(input.value.toLowerCase())) {
                                 return 'E-mail digitado não é válido!';
                                 }
                             }
                     break;
                }
                    
            }
        }
        return true;
    },
    showError:(input, error) =>  {          //adicionando erro para abaixo do label.
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() => {             
        let inputs = form.querySelectorAll('input');    //elimina os stylos 
        for (let i=0;i<inputs.length;i++){
            inputs[i].style = '';
        }
        for(let i=0;i<errorElements.length;i++){        //elimina os errors acumulados embaixo dos inputs
        let errorElements = document.querySelectorAll('error'); 
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.chrysvalidator');
form.addEventListener('submit', ChrysValidator.handleSubmit);