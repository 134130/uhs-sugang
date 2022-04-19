class LectCard {
    constructor(data) {
        this._card = document.createElement('div');
        this._card.classList.add('card', 'lect_card');
        this._card.innerHTML = `<div>
        <span class="lect_type">
            ${data.pobt_div_nm}
        </span>
        <span class="lect_pnt">
            ${data.pnt}
        </span>
        <span class="lect_cd">
            ${data.sbjt_cd}
        </span>
    </div>
    <div>
        <span class="lect_title">
            ${data.sbjt_nm}
        </span>
    </div>
    <div>
        <span class="lect_time">${data.tm_info.split('(')[0]}</span>
        <span class="lect_prof">${data.nm_kor}</span>
    </div>
    <div>
        <span class="lect_place">${/.+\((.+)\)/.exec(data.tm_info) ? /.+\((.+)\)/.exec(data.tm_info)[1] : ''}</span>
        <span class="lect_people">
            <span class="lect_curr">
                ${data.aply_pcnt}
            </span>
            /
            <span class="lect_limit">
                ${data.capa}
            </span>
        </span>
    </div>`;
    }


}