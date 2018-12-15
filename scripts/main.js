// test用
// const latlng = { lat: 33.5867315, lng: 130.3945875 };

const app = new Vue({
    el: '#app',
    data: {
        title: "resttt",
        credit: "ぐるなびWebService",
        credit_url: "https://api.gnavi.co.jp/api/scope/",
        loading_comment: 'now loading...',
        rests: [],
        info_show: true,
        modal_show: false
    },
    methods: {
        search: (e) => {
            app.info_show = false;
            app.modal_show = true;

            const promise = new Promise((resolve) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        function (position) {
                            const latlng = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            }
                            resolve(latlng);
                        }),
                        function (error) {
                            switch (error.code) {
                                case 1: // PERMISSION_DENIED
                                    alert("位置情報の利用が許可されていません");
                                    break;
                                case 2: // POSITION_UNAVAILABLE
                                    alert("現在位置が取得できませんでした");
                                    break;
                                case 3: // TIMEOUT
                                    alert("タイムアウトになりました");
                                    break;
                                default:
                                    alert("その他のエラー(エラーコード:" + error.code + ")");
                                    break;
                            }
                        }
                } else {
                    alert("この端末では位置情報が取得できません");
                }

            }).then((result) => {
                const latlng = result;
                const key_id = "ae3926b340b9bf3348db1c984e34f06f";
                const url = "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=" + key_id + "&latitude=" + latlng.lat + "&longitude=" + latlng.lng + "&range=3&card=1&no_smoking=1";
                axios.get(url)
                    .then((res) => {
                        app.rests = res.data.rest;
                        app.modal_show = false;
                    })
            })
        }
    },
    beforeMount() {
        // 読み込み時に実行する処理
    }
});

