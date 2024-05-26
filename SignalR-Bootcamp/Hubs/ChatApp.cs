using Microsoft.AspNetCore.SignalR;

namespace SignalR_Bootcamp.Hubs
{
    public class ChatApp : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("RecaiveMessageAllClient" , message);
        }

    }
}
