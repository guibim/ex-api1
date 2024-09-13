describe('Testes da API', () => {
  
  
  var TokenResposta; //varaivel
  
    it('Autenticação com sucesso na API', () => {
      cy.request({
        method: 'POST', //POST no Postman JSON para verificar dados e puxar Token
        url: 'https://fakestoreapi.com/auth/login',
        body: {
          username: "mor_2314",
          password: "83r5^_"
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
         expect(response.body.token).to.exist
         TokenResposta = response.body.token
      }
        )
    })
  
    it('Listar usuarios logados', () => {
      
      cy.request({
        method: 'GET',  //GET no Postman para verificar
        url: 'https://fakestoreapi.com/users',
        headers: {
          'Authorization': TokenResposta
        }
      })
      .then(response => response.body[0])
      .should('have.keys', ['__v', 'address', 'email', 'id', 'name', 'password', 'phone', 'username']) //Verifica os campos dentro dos parametros
  
    })
  
  
      it('Adicionar novo usuário', () => {
      cy.request({
        method: 'POST',
        url: 'https://fakestoreapi.com/users',
        body: {
                      email:'John@gmail.com',
                      username:'johnd',
                      password:'m38rmF$',
                      name:{
                          firstname:'John',
                          lastname:'Doe'
                      },
                      address:{
                          city:'kilcoole',
                          street:'7835 new road',
                          number:3,
                          zipcode:'12926-3874',
                          geolocation:{
                              lat:'-37.3159',
                              long:'81.1496'
                          }
                      },
                      phone:'1-570-236-7033'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        console.log(response)
        expect(response.status).to.eq(200); //cod 200 sucesso - 400 falha user - 500 falha Server
      })
    })
  
  
  })

