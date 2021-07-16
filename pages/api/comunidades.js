import { SiteClient } from 'datocms-client'; 

export default async function recebedorDeRequests(request, response){
    
    if (request.method === 'POST'){
        const TOKEN = 'a343f2dc625823535969c6aad8d07e';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "968517",
            // id: '123132',
            // title: 'Teste',
            // image_url: dadosDoForm.get('image'),
            // url: dadosDoForm.get('url'),
            // creatorslug: gitHubUser,
            ...request.body,
        })

        console.log(registroCriado);

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })

        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, apenas POST!'
    })
}