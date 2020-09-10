var ncmb = new NCMB("ea25a419458420ee0d676cf8a65f2bc887283023a901271b0e02742736d5fb55", "3a9acdb12b32dc76cc120c2cc0eb001e18130a6296c9775d80c23f4317bccf50");
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