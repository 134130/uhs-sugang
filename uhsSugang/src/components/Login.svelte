<script>
export let login = false;
let id = '';
let pwd = '';
let requestLogin = async function() {
    if(id == '' || pwd == '') {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
    }

    let url = "https://shiis.uhs.ac.kr/login?attribute=loginChk&fake=" + Date.now();
    let res = await fetch(url, {
        "headers": {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "method": "POST",
        "body": `id=${id}&pwd=${encodeURIComponent(pwd)}`,
    });
    let data = await res.json();

    if(data.code == 200) {
        login = true;
    } else if(data.code == 201) {
        alert(data.msg);
        login = true;
    } else {
        login = false;
    }
}
</script>

<div class="login">
    <h1 style="text-align: right;">
        협성대학교<br>수강신청<br>매크로
    </h1>
    <div class="card">
        <input type="text" name="id" id="id" bind:value={id} placeholder="아이디(학번)">
        <input type="password" name="pwd" id="pwd" bind:value={pwd} placeholder="비밀번호" on:keydown="{(e) => { if(e.key == "Enter") requestLogin() }}">
        <button on:click={requestLogin}>로그인</button>
    </div>
</div>

<style type="scss">
.login {
    display: flex;
    align-items: center;
    justify-content: center;

    
    margin-top: 30vh;
}
.card {
    display: flex;
    flex-direction: column;
    gap: .4em;
    margin-left: 2em;
}
button {
    cursor: pointer;
}
</style>