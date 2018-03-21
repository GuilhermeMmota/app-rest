$$(document).on('page:init','.page[data-name="contato"]', function(e){
        var page = e.detail;
        console.log(page.name);

        var uploader = $$('#uploader');
        
        // ouvir o evento change
        $$('#inputPhoto').on('change',function (a) { //ouvindo a mudança
            //Obter o arquivo    
            var file = a.target.files[0] //array de arquivos..., igual 0 está como single
        
            //Referenciar o Storage
            var storage = firebase.storage();
            //var storageRef = firebase.storage.ref('arquivos/'+ file.name)
            var storageRef = storage.ref();
            var imagesRef = storageRef.child('arquivos');
            var spaceRef = storageRef.child('arquivos/'+ file.name);
        
            //Enviar o arquivo
            var task = spaceRef.put(file)
        
            //Atualizar o Progress Bar
            task.on('state_changed',
                function progress(snapshot){
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    uploader.value = percentage
        
                },
                function error(err){
                    console.log(err)
                },
                function complete(){
                    var url = task.snapshot.downloadURL;
                    console.log(url);
                    alert('Envio Completo!!!')
                    $$('#imgPhoto').attr('src',url);  
                    //var urlPhoto = $$('img').attr('src');
                    //alert(urlPhoto);                          
                }
            )
        })

        $$('#btnSalvar').on('click',function () {

                
                //var formData = app.form.convertToData('#form-user-content')
                var nameInput = $$('#nameInput').val();
                var emailInput = $$('#emailInput').val();
                var tel = $$('#telInput').val();
                var assunto = $$('#assuntoInput').val();
                var inputBio = $$('#inputBio').val();
                var inputPhoto = $$('img').attr('src');
                
                var formData = { name: nameInput, email: emailInput, tel: telInput, assunto: assuntoInput, bio: inputBio, photo: inputPhoto }
                console.log(formData);
                alert(JSON.stringify(formData))
                firebase.database().ref().child('Comentarios').push(formData)
                // task = spaceRef.put(file);
                .then( function () {
                        app.dialog.alert('Mensagem Enviada');
                        $$('input#nameInput').val('');
                        $$('input#emailInput').val('');
                        $$('input#telInput').val('');
						 $$('input#assuntoInput').val('');
                        $$('input#inputBio').val('');
                        $$('img').attr('src','');

                        
                }, function(error){
                        app.dialog.alert('Erro, confira no console');
                        console.error(error)
                })  
                //firebase.database().ref().child('usuarios').push(JSON.stringify(formData))

        });      

});      