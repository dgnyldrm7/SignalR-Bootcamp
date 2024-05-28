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

       



        //Groub'a Client Ekleyelim!
        public async Task AddToGroupClientId(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).RecaiveMessageAllClient($"User {groupName}'e katıldı!");
        }





        //Groub'dan Client Kaldıralım!
        public async Task RemoveToGroupClientId(string groupName)
        {
            await Clients.Group(groupName).RecaiveMessageAllClient($"User {groupName}'dan ayrıldı!");
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            
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
