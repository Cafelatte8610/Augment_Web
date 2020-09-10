var ncmb = new NCMB("ea25a419458420ee0d676cf8a65f2bc887283023a901271b0e02742736d5fb55", "3a9acdb12b32dc76cc120c2cc0eb001e18130a6296c9775d80c23f4317bccf50");

function LoginCheck() {
    var currentUser = ncmb.User.getCurrentUser();
    if (currentUser) {
        console.log("ログイン中のユーザー: " + currentUser.get("userName"));
        location.href = './Mypage.html';
    } else {
        console.log("未ログインまたは取得に失敗");
        location.href = './Login.html';
    }
}

function OnclicSubmitSignIN() {
    console.log('ログイン中');
    var email = document.getElementById("inputEmail").value;
    var pass = document.getElementById("inputPassword").value;
    console.log(email);
    console.log(pass);
    ncmb.User.loginWithMailAddress(email, pass)
        .then(function (data) {
            console.log("Correct");
            location.href = './Mypage.html';
        })
        .catch(function (err) {
            alert("ログインできませんでした。入力情報をもう一度お確かめください。");
        });
}

function OnclicSubmitSignUP() {
    var email = document.getElementById("inputEmail").value;
    console.log(email);
    ncmb.User.requestSignUpEmail(email)
        .then(function (data) {
            alert("指定されたメールアドレスにパスワード設定メールを送信しました。メール添付のURLからアカウント作成を完了させてください。");
        })
        .catch(function (err) {
            alert("アカウントを作成できませんでした。");
        });
}

function ResetPass() {
    var user = new ncmb.User();
    var email = document.getElementById("inputEmail").value;
    user.set("mailAddress", email);
    user.requestPasswordReset()
        .then(function (data) {
            alert("指定されたメールアドレスにパスワード変更メールを送信しました。メールが届かない場合は再度同じ操作を行ってください。");
        })
        .catch(function (err) {
            alert("入力情報をもう一度お確かめください。");
        });
}