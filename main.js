class SearchTable {
    constructor() {
        this.DATA_HIIS = {};
        this._table = document.querySelector("#searchTable");

        this.getDataHiis().then(() => {
            this.changeDiv('P');
        });

        this._table.querySelector("#comboDiv").addEventListener("change", (e) => {
            this.changeDiv(e.target.value)
        });

        this._table.querySelector("#comboSust").addEventListener("change", () => {
            this.appendComboMajor();
        });

        this._table.querySelector("#searchNm").addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                this.search();
            }
        })
        this._table.querySelector("button").addEventListener("click", async () => {
            this.search();
        });
    }

    async search() {
        let lectParamList = ["comboDiv", "comboSust", "comboMajor", "comboDanfg", "comboGrade", "comboArea", "comboTrack"];
        let lectParamDict = {};

        for (let param of lectParamList) {
            lectParamDict[param] = document.querySelector(`#${param}`).value;
        }
        lectParamDict['initFlag'] = 'Y';
        lectParamDict['selectedTab'] = '1';
        lectParamDict['searchNm'] = encodeURIComponent(document.querySelector("#searchNm").value);
        lectParamDict['fake'] = Date.now();

        lectParamDict['_search'] = 'false';
        lectParamDict['nd'] = Date.now();
        lectParamDict['rows'] = '-1';
        lectParamDict['page'] = '1';
        lectParamDict['sidx'] = '';
        lectParamDict['sord'] = 'asc';

        let lectParams = Object.entries(lectParamDict).map(e => {
            return `&${e[0]}=${e[1]}`;
        }).join('');
        let url = "https://shiis.uhs.ac.kr/core?attribute=lectDetailJson" + lectParams;

        let res = await (await fetch(url)).text();

        let data = JSON.parse(res)['rows'];
        resultTable.appendData(data);
    }

    changeDiv(code) {
        document.querySelector("#span_major").style.display = "none";
        document.querySelector("#span_area").style.display = "none";
        document.querySelector("#span_track").style.display = "none";

        switch (code) {
            case 'M':
            case 'P':
                this.appendComboSust();
                break;
            case 'C':
                this.appendComboArea();
                break;
            case 'T':
                this.appendComboTrack();
                break;
        }
    }

    async getDataHiis() {
        let url = "https://shiis.uhs.ac.kr/resources/data/data_hiis.js?fake=" + new Date();

        let res = await (await fetch(url)).text();

        this.DATA_HIIS.listSust = JSON.parse(/var listSust =(.+)/.exec(res)[1]).rows;     // 학과
        this.DATA_HIIS.listMajor = JSON.parse(/var listMajor =(.+)/.exec(res)[1]).rows;   // 전공
        this.DATA_HIIS.listArea = JSON.parse(/var listArea =(.+)/.exec(res)[1]).rows;     // 역량
        this.DATA_HIIS.listTrack = JSON.parse(/var listTrack =(.+)/.exec(res)[1]).rows;   // 트랙
    }

    appendData() {
        this.appendComboSust();
        this.appendComboMajor();
    }

    appendComboSust() {
        let _comboSust = this._table.querySelector("#comboSust");

        let beforeSelected = _comboSust.value;

        [..._comboSust.children].forEach(_ => _.remove());

        let groupByCollege = this.DATA_HIIS.listSust.reduce((group, sust) => {
            const college = sust.sust_cd[0];
            group[college] = group[college] ?? [];
            group[college].push(sust);
            return group;
        }, {})

        let collegeModel = {
            '1': "신학대학", '2': '인문사회대학', '3': '글로벌경영대학', '4': '이공대학', '5': '예술대학', '6': '웨슬리창의융합대학', '9': '계약학과'
        };
        for (let college in groupByCollege) {
            let susts = groupByCollege[college];
            let _optgroup = document.createElement("optgroup");
            _optgroup.label = collegeModel[college];

            for (let sust of susts) {
                let _option = document.createElement("option");
                _option.value = sust.sust_cd;
                _option.text = sust.sust_nm;
                _optgroup.appendChild(_option);
            }
            _comboSust.appendChild(_optgroup);
        }

        _comboSust.value = beforeSelected || _comboSust.value;

        this.appendComboMajor();
        document.querySelector("#span_major").style.display = "table-row";
    }

    appendComboMajor() {
        let _comboMajor = this._table.querySelector("#comboMajor");
        let sust_cd = this._table.querySelector("#comboSust").value;

        let listMajor = this.DATA_HIIS.listMajor.filter(major =>
            major.sust_cd == sust_cd
        );

        let beforeSelected = _comboMajor.value;

        [..._comboMajor.children].forEach(_ => _.remove());
        for (let major of listMajor) {
            let _option = document.createElement("option");
            _option.value = major.mj_cd;
            _option.text = major.mj_nm;
            _comboMajor.appendChild(_option);
        }

        _comboMajor.value = beforeSelected || _comboMajor.value;
    }

    appendComboArea() {
        let _comboArea = this._table.querySelector("#comboArea");

        let beforeSelected = _comboArea.value;

        [..._comboArea.children].forEach(_ => _.remove());
        for (let area of this.DATA_HIIS.listArea) {
            let _option = document.createElement("option");
            _option.value = area.area_cd;
            _option.text = area.area_nm;
            _comboArea.appendChild(_option);
        }

        _comboArea.value = beforeSelected || _comboArea.value;
        document.querySelector("#span_area").style.display = "table-row";
    }

    appendComboTrack() {
        let _comboTrack = this._table.querySelector("#comboTrack");
        let beforeSelected = _comboTrack.value;

        [..._comboTrack.children].forEach(_ => _.remove());
        for (let track of this.DATA_HIIS.listTrack) {
            let _option = document.createElement("option");
            _option.value = track.track_cd;
            _option.text = track.track_nm;
            _comboTrack.appendChild(_option);
        }

        _comboTrack.value = beforeSelected || _comboTrack.value;
        document.querySelector("#span_track").style.display = "table-row";
    }
}

class ResultTable {
    constructor() {
        this._table = document.querySelector("#resultTable");

        this.colModel = [
            { label: "No", name: "no", width: "2", align: "center" },
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

        this.createHeader();
    }

    createHeader() {
        let _tr = document.createElement("tr");

        for (let model of this.colModel) {
            let _th = document.createElement("th");
            _th.textContent = model.label;
            _th.style.width = `${model.width}em`;
            _tr.appendChild(_th);
        }

        let _thead = this._table.querySelector("thead");
        _thead.appendChild(_tr);
    }

    appendData(rows) {
        let _tbody = this._table.querySelector("tbody");
        [..._tbody.children].forEach(_ => _.remove());


        let index = 1;
        for (let row of rows) {
            let _tr = document.createElement("tr");
            for (let model of this.colModel) {
                let _td = document.createElement("td");

                if (model.name == 'no') {
                    _td.textContent = index++;
                } else {
                    _td.textContent = row[model.name];
                }

                _tr.appendChild(_td);
            }
            _tbody.appendChild(_tr);

            _tr.addEventListener("dblclick", () => {
                myLectTable.appendRow(row);
            });
        }

    }
}

class MyLectTable {
    constructor() {
        this._table = document.querySelector("#myLectTable");
        this.datas = localStorage['myLects'] ? JSON.parse(localStorage['myLects']) : [];

        this.colModel = [
            { label: "No", name: "no", width: "2", align: "center" },
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

        this.createHeader();
        this.renderTable();
    }

    createHeader() {
        let _tr = document.createElement("tr");

        for (let model of this.colModel) {
            let _th = document.createElement("th");
            _th.textContent = model.label;
            _th.style.width = `${model.width}em`;
            _tr.appendChild(_th);
        }

        let _thead = this._table.querySelector("thead");
        _thead.appendChild(_tr);
    }

    appendRow(row) {
        this.datas.push(row);
        localStorage["myLects"] = JSON.stringify(this.datas);
        this.renderTable();
    }

    renderTable() {
        let _tbody = this._table.querySelector("tbody");
        [..._tbody.children].forEach(_ => _.remove());

        let index = 1;
        for (let row of this.datas) {
            let _tr = document.createElement("tr");
            for (let model of this.colModel) {
                let _td = document.createElement("td");

                if (model.name == 'no') {
                    _td.textContent = index++;
                } else {
                    _td.textContent = row[model.name];
                }

                _tr.appendChild(_td);
            }
            _tbody.appendChild(_tr);

            _tr.addEventListener("dblclick", () => {
                let index = this.datas.findIndex((data) => data.params === row.params);
                this.datas.splice(index, 1);
                localStorage["myLects"] = JSON.stringify(this.datas);
                this.renderTable();
            });
        }

        let groupedTotal = this.datas.reduce((total, data) => {
            const pobt_div_nm = data.pobt_div_nm;
            total[pobt_div_nm] = total[pobt_div_nm] ?? 0;
            total[pobt_div_nm] += parseFloat(data.pnt);
            return total;
        }, {});

        groupedTotal["총계"] = Object.values(groupedTotal).reduce((a, b) => a + b);

        for (let group in groupedTotal) {
            let pnt = groupedTotal[group];

            let _tr = document.createElement("tr");
            _tr.classList.add('total')
            for (let model of this.colModel) {
                let _td = document.createElement("td");

                if (model.name == 'pnt') {
                    _td.textContent = pnt;
                } else if (model.name == 'pobt_div_nm') {
                    _td.textContent = group;
                }
                _tr.appendChild(_td);
            }
            _tbody.appendChild(_tr);
        }


        let _lectCards = document.querySelector('#lectCards');
        [..._lectCards.children].forEach(_ => _.remove());
        for (let data of this.datas) {
            let _card = new LectCard(data)._card;
            _lectCards.append(_card);
        }
    }
}


let resultTable = new ResultTable();
let myLectTable = new MyLectTable();
new SearchTable();
