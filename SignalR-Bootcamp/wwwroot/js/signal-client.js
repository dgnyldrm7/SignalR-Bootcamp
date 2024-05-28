$(document).ready(function () {


    const SendMessageAllClient = "SendMessage";
    const RecaiveMessageAllClientForClient = "RecaiveMessageAllClient";

    const RecaiveConnectCountQuantity = "RecaiveAllClientCount";


    const RecaiveMessageJustYourSelf = "RecaiveYourSelfClientMessage";
    const SendMesageYourSelf = "SendYourSelfMessage";


    const RecaiveMessageOtherClients = "RecaiveOtherClientsMessage";
    const SendOtherClientsMessageMethod = "SendOtherClientsMessage";


    const RecaiveSpecifitClientIdMessageFirst = "RecaiveSpecifitClientIdMessage";
    const SendSpesificClientIdMessageSecond = "SendSpesificClientIdMessage";


    const AddGroupForClientId = "AddToGroupClientId";
    const RemoveToGroupClientId = "RemoveToGroupClientId";


    const connection = new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        .build();



    function start()
    {
        connection.start().then(function () {
            console.log("HUB CONNECTED");
            const userId = connection.connectionId;
            $("#userId").html(`ClientUserId = ${userId}`);
        })
    }



    const groupA = "Group A";
    const groupB = "Group B";
    let groupList = [];

    function RefreshGroup() {
        $("#groupArea").empty();
        groupList.forEach(x => {
            $("#groupArea").append(`<p>${x}</p>`);
        });
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
        console.log("Gelen mesaj=",message);
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
    });

    connection.on(RecaiveSpecifitClientIdMessageFirst, (message) => {
        console.log("Giden Mesaj : ", message);
    });









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
        });
    });

    //Specific message!
    $("#gonderButon").click(function(){
        const clientId = $(".clientId").val();
        const message = "Selamlar";
        connection.invoke(SendSpesificClientIdMessageSecond ,clientId,message).catch(function (error) {
            console.log("Problem", error);
        });
    });




    //Group ��lemleri!


    
    $("#AEkle").click(function () {
        // groupA'n�n daha �nce eklenip eklenmedi�ini kontrol ediyoruz
        if (!groupList.includes(groupA)) {
            // E�er yoksa, eklemek i�in connection.invoke fonksiyonunu �a��r�yoruz
            connection.invoke(AddGroupForClientId, groupA).then(() => {
                // Ekleme i�lemi ba�ar�l� olursa, groupList'e ekliyoruz
                groupList.push(groupA);
                // Gruplar� yenilemek i�in RefreshGroup() fonksiyonunu �a��r�yoruz
                RefreshGroup();
            });
        }
        else {
            alert("Zaten groupA'dasin.")
        }
    });


    $("#ACikar").click(function () {
        if (groupList.includes(groupA)) {
            // E�er yoksa, eklemek i�in connection.invoke fonksiyonunu �a��r�yoruz
            connection.invoke(RemoveToGroupClientId, groupA).then(() => {
                groupList = groupList.filter(x => x !== groupA);
                RefreshGroup();
            });
        }
        else {
            alert("Groun A da yoksun");
        }
    });


    $("#BEkle").click(function () {
        // groupA'n�n daha �nce eklenip eklenmedi�ini kontrol ediyoruz
        if (!groupList.includes(groupB)) {
            // E�er yoksa, eklemek i�in connection.invoke fonksiyonunu �a��r�yoruz
            connection.invoke(AddGroupForClientId, groupB).then(() => {
                // Ekleme i�lemi ba�ar�l� olursa, groupList'e ekliyoruz
                groupList.push(groupB);
                // Gruplar� yenilemek i�in RefreshGroup() fonksiyonunu �a��r�yoruz
                RefreshGroup();
            });
        }
        else {
            alert("Zaten groupB'desin.")
        }
    });


    $("#BCikar").click(function () {
        if (groupList.includes(groupB)) {
            // E�er yoksa, eklemek i�in connection.invoke fonksiyonunu �a��r�yoruz
            connection.invoke(RemoveToGroupClientId, groupB).then(() => {
                groupList = groupList.filter(x => x !== groupB);
                RefreshGroup();
            });
        }
        else {
            alert("Groub B' de yoksun")
        }
    });







    




});
