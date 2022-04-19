<script>
import { resultRows } from '../../store.js'

let columnModel = [ { label: "No", name: "no", width: "2", align: "center" },
                    { label: "주야", name: "dan_fg", width: "3", align: "center" },
                    { label: "학년", name: "shyr", width: "2", align: "center" },
                    { label: "코드", name: "sbjt_cd", width: "6", align: "center" },
                    { label: "분반", name: "decs", width: "2", align: "center" },
                    { label: "교과목명", name: "sbjt_nm", width: "14", align: "center" },
                    { label: "이수구분", name: "pobt_div_nm", width: "4", align: "center" },
                    { label: "학점", name: "pnt", width: "3", align: "center" },
                    { label: "담당교수", name: "nm_kor", width: "4", align: "center" },
                    { label: "강의시간", name: "tm_info", width: "14", align: "center" },
                    { label: "제한인원", name: "capa", width: "4", align: "center" },
                    { label: "수강인원", name: "aply_pcnt", width: "4", align: "center" },
                    { label: "기타", name: "online_fg", width: "6", align: "center" },
                    // { label: "수업계획서", name: "lecture_div", width: "60", align: "center" },
                    // { label: "강의평가", name: "online_fg", width: "60", align: "center" },
                    { label: "개설학과", name: "remk3", width: "6", align: "center" },
];

export let rows;

</script>

<div class="card">
    <table>
        <thead>
            <tr>
                {#each columnModel as column}
                    <th class="{column.name}" style:width={column.width + "em"}>{column.label}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
        {#each $resultRows as row, i (row.params)}
            <tr>
            {#each columnModel as column}
                {#if column.name === 'no'}
                    <td class="{column.name}">{i+1}</td>
                {:else}
                    <td class="{column.name}">{row[column.name]}</td>
                {/if}
            {/each}
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<style type="scss">
.wrapper {
    overflow-y: overlay;
    max-height: 30em;
    &::webkit-scrollbar-thumb {
        margin-top: 2em;
    }
}

table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
    text-align: center;
    padding: 0.4em 0;
    &:first-child {
        padding-left: 0.8em;
    }
    &:last-child {
        padding-right: 0.8em;
    }
}
th {
    background: rgb(200, 200, 200);
    border-bottom: 1px solid rgb(150, 150, 150);
}
tbody tr {
    &:hover {
        background: rgb(240, 240, 240);
    }
}
</style>