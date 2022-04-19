<script>
    export let divValue;
    export let list;
    export let params;
</script>

<tr id="span_area" style:display={ divValue == 'C' ? 'table-row' : 'none' }>
    <th>영역</th>
    <td>
        <select name="comboArea" id="comboArea" bind:value={params["comboArea"]}>
        {#each list as area}
            <option value="{area.area_cd}">{area.area_nm}</option>
        {/each}
        </select>
    </td>
</tr>