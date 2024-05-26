using Microsoft.AspNetCore.SignalR;

namespace SignalR_Bootcamp.Hubs
{
    public class TypeSafeChatApp : Hub<ITypeSafeChatApp>
    {
        public static int ConnectedUser = 0;

        //Tüm Clientlere message gönderme
        public async Task SendMessage(string message)
        {
            
            await Clients.All.RecaiveMessageAllClient(message);

        }

        //Sadece istemci client'e mesaj gönderme
        public async Task SendYourSelfMessage(string message)
        {
            await Clients.Caller.RecaiveYourSelfClientMessage(message);
        }

        //Kendisi hariç diğer istemcilere mesaj yollamak!
        public async Task SendOtherClientsMessage(string message)
        {
            await Clients.Others.RecaiveOtherClientsMessage(message);
        }

        //spesific client'a message göndermek
        public async Task SendSpesificClientIdMessage(string clientId, string message)
        {
            await Clients.Client(clientId).RecaiveSpecifitClientIdMessage(message);
        }

   


        public override async Task OnConnectedAsync()
        {
            ConnectedUser++;

            await Clients.All.RecaiveAllClientCount(ConnectedUser);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            ConnectedUser--;

            await Clients.All.RecaiveAllClientCount(ConnectedUser);
        }


    }
}
