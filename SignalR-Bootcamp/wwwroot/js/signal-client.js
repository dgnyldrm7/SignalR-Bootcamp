$(document).ready(function () {


    const SendMessageAllClient = "SendMessage";
    const RecaiveMessageAllClientForClient = "RecaiveMessageAllClient";

    const RecaiveConnectCountQuantity = "RecaiveAllClientCount";


    const RecaiveMessageJustYourSelf = "RecaiveYourSelfClientMessage";
    const SendMesageYourSelf = "SendYourSelfMessage";


    const RecaiveMessageOtherClients = "RecaiveOtherClientsMessage";
    const SendOtherClientsMessageMethod = "SendOtherClientsMessage";

    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        .build();

 
    function start()
    {
        connection.start().then(function () {
            console.log("HUB CONNECTED");
        })

    }


    //Check Control!
    try
    {
        start();
    }

    catch
    {
        setTimeout(() => {
            start();
        },3000);
    }


    //subcribe olmak!
    connection.on(RecaiveMessageAllClientForClient, (message) => {
        console.log("Gelen mesaj = ", message);
    });


    var SumAllUserQuantitiy = $("#kisiSayisi");
    connection.on(RecaiveConnectCountQuantity, (Sumcount) => {
        SumAllUserQuantitiy.text(Sumcount);
    });

    connection.on(RecaiveMessageJustYourSelf, (message) => {
        console.log("Kendinize mesaj gonderdiniz : ", message);
    });

    connection.on(RecaiveMessageOtherClients, (message) => {
        console.log("Baskasindan geldi bu mesaj : ", message);
    })






    $(".kendineMesaj").click(function () {
        const message = "Merhaba Canim";
        connection.invoke(SendMesageYourSelf, message).catch(function (error) {
            console.log("Error:", error);
        });
    });

    $("#send-message-to-allClient").click(function () {
        const message = "Hello All Clients!";
        connection.invoke(SendMessageAllClient, message).catch(function (error) {
            console.log("Error:", error);
        });
    });

    $("#digerlerineMessage").click(function(){
        const message = "Digerlerine mesaj yolladim. Kendime degil!";
        connection.invoke(SendOtherClientsMessageMethod, message).catch(function (error) {
            console.log("Hata : ", error);
        })
    });


    




});
