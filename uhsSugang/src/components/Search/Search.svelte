<script>
    import MajorSpan from './Span/MajorSpan.svelte'
    import AreaSpan from './Span/AreaSpan.svelte'
    import TrackSpan from './Span/TrackSpan.svelte'
    import { resultRows } from '../../store.js';

    let params = {
        'comboMajor': '00',
        'initFlag': 'Y',
        'selectedTab': '1',
        '_search': 'false',
        'rows': '-1',
        'page': '1',
        'sidx': '',
        'sord': 'asc'
    };

    let lists = {
        "listSust": [],
        "listMajor": [],
        "listArea": [],
        "listTrack": []
    };

    getDataHiis().then((data) => {
        lists = data;
        params["comboSust"] = lists.listSust[0].sust_cd;
        params["comboArea"] = lists.listArea[0].area_cd;
        params["comboTrack"] = lists.listTrack[0].track_cd;
    });

    async function getDataHiis() {
        let url = "https://shiis.uhs.ac.kr/resources/data/data_hiis.js?fake=" + Date.now();
        let res = await (await fetch(url)).text();

        return {
            'listSust': JSON.parse(/var listSust =(.+)/.exec(res)[1]).rows,
            'listMajor': JSON.parse(/var listMajor =(.+)/.exec(res)[1]).rows,
            'listArea': JSON.parse(/var listArea =(.+)/.exec(res)[1]).rows,
            'listTrack': JSON.parse(/var listTrack =(.+)/.exec(res)[1]).rows,
        }
    }

    async function search() {
        params['fake'] = Date.now();
        params['nd'] = Date.now();
        
        let url = "https://shiis.uhs.ac.kr/core?attribute=lectDetailJson";
        let query = Object.entries(params).map(e => {
            if(e[0] === 'searchNm')
                return `&${e[0]}=${encodeURIComponent(e[1])}`;
            return `&${e[0]}=${e[1]}`;
        }).join('');

        let res = await (await fetch(url + query)).text();
        let data = JSON.parse(res)['rows'];
        $resultRows = data;
    }
</script>

<div class="card" id="searchCard">
    <table>
        <tbody>
            <tr>
                <th>구분</th>
                <td style="width: 20em;">
                    <select name="comboDiv" id="comboDiv" bind:value="{params["comboDiv"]}">
                        <option value="M">전공/기타</option>
                        <option value="P">교필</option>
                        <option value="C">교선</option>
                        <option value="T">트랙</option>
                    </select>
                </td>
                <th>입력검색</th>
                <td style="width: 14em;">
                    <input type="text" name="searchNm" id="searchNm" size="20"
                    placeholder="교과목명 또는 코드 입력"
                    bind:value="{params["searchNm"]}"
                    on:keydown="{ e => { if(e.key == 'Enter') { search() } } }" />
                </td>
                <td style="width: 5em;">
                    <button on:click={search}>검색</button>
                </td>
            </tr>
            <MajorSpan divValue={params["comboDiv"]} listSust={lists.listSust} listMajor={lists.listMajor} bind:params={params} />
            <AreaSpan divValue={params["comboDiv"]} list={lists.listArea} bind:params={params} />
            <TrackSpan divValue={params["comboDiv"]} list={lists.listTrack} bind:params={params} />
        </tbody>
    </table>
</div>

<style type="scss">
#searchCard :global(th) {
    text-align: right;
    padding-right: 1em;
}
#searchCard :global(th:first-child) {
    width: 4em;
}
#searchCard :global(input) {
    width: 100%;
}
#searchCard :global(select) {
    width: 100%;
}
#searchCard :global(td) {
    padding-right: 2em;
}
button {
    width: 100%;
    cursor: pointer;
}
</style>
