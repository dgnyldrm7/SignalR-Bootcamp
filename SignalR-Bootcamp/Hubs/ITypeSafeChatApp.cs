namespace SignalR_Bootcamp.Hubs
{
    public interface ITypeSafeChatApp
    {
        Task RecaiveMessageAllClient(string message);
        Task RecaiveAllClientCount(int Sumcount);
        Task RecaiveYourSelfClientMessage(string message);
        Task RecaiveOtherClientsMessage(string message);
    }
}
