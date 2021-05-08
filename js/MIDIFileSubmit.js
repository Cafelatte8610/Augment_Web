var ncmb = new NCMB("e09e4fa9b679b5012d99dbd4f7d2aadbc95ace16652a85e4fe24b4266c1ad580", "14b20edd2c1cbfad1650391f1c2dca2c5e2ba32f2f38ce6e8ab3a2c87325349f");
var db = ncmb.DataStore("MusicData");
var DataBase = new db();

var currentUser = ncmb.User.getCurrentUser();
if (currentUser) {
    console.log("ログイン中のユーザー: " + currentUser.get("userName"));
    document.getElementById("MailAddres").innerText = currentUser.get("mailAddress");
} else {
    console.log("未ログイン");
    location.href = './index.html';
}

function Logout() {
    ncmb.User.logout();
    location.href = './Login.html';
}

function MIDISubmit() {
    var title = document.getElementById("inputTitle").value;
    var comment = document.getElementById("inputComment").value;
    var file = document.getElementById("filepath").files[0];

    if (file.type != "audio/mid") {
        alert("データを読み込めません！入力を確認してください！");
        return;
    }

    var UserID;
    currentUser = ncmb.User.getCurrentUser();
    if (currentUser) {
        UserID = currentUser.objectId;
    } else {
        console.log("未ログイン");
        location.href = './index.html';
    }

    DataBase.set("Title", title)
        .set("Comment", comment)
        .set("PlayCount", 0)
        .set("SoaringCount", 0)
        .set("BookmarkCount",0)
        .set("ID", " ")
        .set("Uploader", UserID)
        .save()
        .then(function (DataBase){
            var dataID = DataBase.objectId;
            DataBase.set("ID", dataID);
            DataBase.update();
            ncmb.File.upload(dataID, file)
                .then(function (res) {
                    alert("アップロード完了！  楽曲ID:" + dataID);
                })
                .catch(function (err) {
                    console.log(err);
                });
        })
        .catch(function (err) {
            console.log(err);
        });
}
