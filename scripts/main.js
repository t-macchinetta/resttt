$(window).on('load', function () {

    // ----------関数の定義----------
    // map表示関数
    const initMap = () => {
        // Geolocation APIに対応している
        if (navigator.geolocation) {
            // 現在地を取得
            navigator.geolocation.getCurrentPosition(
                // 取得成功した場合
                function (position) {
                    // 緯度・経度を変数に格納
                    const latlng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    console.log(latlng);
                    // return latlng;
                    getJson(latlng);
                    return true;
                },
                // 取得失敗した場合
                function (error) {
                    // エラーメッセージを表示
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
            );
            // Geolocation APIに対応していない
        } else {
            alert("この端末では位置情報が取得できません");
        }
    }


    // jsonファイルから読み込み→項目作成の関数
    const getJson = (latlng) => {
        // ぐるなびapi
        const key_id = "ae3926b340b9bf3348db1c984e34f06f";
        const url = "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=" + key_id + "&latitude=" + latlng.lat + "&longitude=" + latlng.lng + "&range=3&card=1&no_smoking=1";

        $.getJSON(url)
            .done((data, textStatus, jqXHR) => {
                // console.log(data);
                let arr = [];
                for (i = 0; i < data.rest.length; i++) {
                    arr.push('<h2>' + data.rest[i].name + '</h2>');
                    arr.push('<p>' + data.rest[i].code.category_name_s + '</p>');
                    arr.push('<img src="' + data.rest[i].image_url.shop_image1 + '">');
                    arr.push('<p>' + data.rest[i].budget + '</p>');
                    arr.push('<p>' + data.rest[i].opentime + '</p>');
                    arr.push('<p>' + data.rest[i].holiday + '</p>');
                    arr.push('<a href="' + data.rest[i].url + '" target="_blank"><p>webSite(ぐるなび店舗ページへ)</p></a>');
                    arr.push('<a href="tel:' + data.rest[i].tel.split("-").join("") + '"><p>' + data.rest[i].tel + '</p></a>');
                    arr.push('<p>' + data.rest[i].address + '</p>');
                    // arr.push('<iframe src="https://www.google.co.jp/maps?output=embed&q=loc:' + data.rest[i].latitude + ',' + data.rest[i].longitude + '" width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>');
                    arr.push('<iframe src="https://www.google.co.jp/maps/embed/v1/place?key=AIzaSyDPdgC7OwDM0Gjz05-A8QsH5RrWNe-UU4g&q=' + data.rest[i].latitude + ',' + data.rest[i].longitude + '" width="100%" height="200" frameborder="0" style="border:0" allowfullscreen></iframe>');
                    // arr.push('<img src="' + data.rest[i].image_url.qrcode + '">');
                }
                $('#echo').html(arr);
                setTimeout(() => {
                    $('#modal').addClass('hidden');
                }, 1000);
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR.status + textStatus + errorThrown);
            })
            .always(() => {
                console.log("complete");
                return true;
            });
    }
    // ----------!関数定義----------


    // ----------実行----------
    $('#btn').on('click', function () {
        // $('#search_section').hide();
        // $('#modal').removeClass('hidden');
        // initMap();
        const milliseconds = 500;
        const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
        Promise.resolve()
            .then(() => wait(milliseconds))
            .then(() => $('#search_section').hide())
            .then(() => wait(0))
            .then(() => $('#modal').removeClass('hidden'))
            .then(() => wait(milliseconds))
            .then(() => initMap());
        // .then(() => wait(milliseconds))
        // .then(() => $('#modal').addClass('hidden'));

    });

    // ----------!実行----------



});
