<script>
    export let divValue;
    export let params;
    export let list;
</script>

<tr id="span_track" style:display={ divValue == 'T' ? 'table-row' : 'none' }>
    <th>영역</th>
    <td>
        <select name="comboTrack" id="comboTrack" bind:value={params["comboTrack"]}>
        {#each list as track}
            <option value="{track.track_cd}">{track.track_nm}</option>
        {/each}
        </select>
    </td>
</tr>