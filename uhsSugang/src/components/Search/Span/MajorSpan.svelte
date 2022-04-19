<script>
    export let divValue;
    export let listSust;
    export let listMajor;
    export let params;

    const colleges = {
        '1': '신학대학', '2': '인문사회대학', '3': '글로벌경영대학',
        '4': '이공대학', '5': '예술대학', '6': '웨슬리창의융합대학',
        '9': '계약학과'
    }

    $: groupedSust = listSust.reduce((group, sust) => {
        const college = colleges[sust.sust_cd[0]];
        group[college] = group[college] ?? [];
        group[college].push(sust);
        return group;
    }, {});

    $: filteredMajor = listMajor.filter(major => major.sust_cd == params["comboSust"]);
</script>

<tr id="span_major" style:display={ (divValue == 'M' || divValue == 'P') ? 'table-row' : 'none' }>
    <th>학부(과)</th>
    <td>
        <select name="comboSust" id="comboSust" bind:value={params["comboSust"]}
        on:change="{e => { params["comboMajor"] = listMajor.filter(major => major.sust_cd == params["comboSust"])[0].mj_cd }}">
        {#each Object.keys(groupedSust) as key}
            <optgroup label="{key}">
            {#each groupedSust[key] as sust (sust.sust_cd)}
                <option value="{sust.sust_cd}">{sust.sust_nm}</option>
            {/each}
            </optgroup>
        {/each}
        </select>
    </td>
    <th>전공</th>
    <td>
        <select name="comboMajor" id="comboMajor" bind:value={params["comboMajor"]}>
        {#each filteredMajor as major, idx (major.mj_cd)}
            <option value="{major.mj_cd}" selected={idx === 0}>{major.mj_nm}</option>
        {/each}
        </select>
    </td>
    <th>주야</th>
    <td>
        <select name="comboDanfg" id="comboDanfg" bind:value={params["comboDanfg"]}>
            <option value="1" selected="">주간</option>
            <option value="2">야간</option>
        </select>
    </td>
    <th>학년</th>
    <td>
        <select name="comboGrade" id="comboGrade" bind:value={params["comboGrade"]}>
            <option value="">전체</option>
            <option value="1">1학년</option>
            <option value="2">2학년</option>
            <option value="3">3학년</option>
            <option value="4">4학년</option>
        </select>
    </td>
</tr>