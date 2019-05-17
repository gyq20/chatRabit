bindEvent();

function bindEvent(){
    $('.btn').on('click', function(){
        var val = $('.inp').val();
        if(val){
            getData(val);
            addDom('my', val);
        }
    });
    $('.inp').on('keydown', function(e){
        if(e.keyCode == 13 && this.value){
            $('.btn').trigger('click');
        }
    })
}

function getData(val){
    $.ajax({
        type: "GET", 
        url: "http://api.duyiedu.com/api/chat/sendMsg",
        data: {
            appkey: "15189807516_1556091653465",
            msg: val
        },
        success: function(data){
            var list = typeof(data) == 'string'?JSON.parse(data):data;
            console.log(list);
            addDom('r', list.data.text);
        },
        error: function(){
            console.log('error');
        }
    })
}

function addDom(who, text){
    if(who =='my'){
        $('<div class="talk my">\
        <div class="user"></div>\
        <div class="text">'+text+'</div>\
        </div>').appendTo('.inner');
        $('.inp').val('');
    }else if(who == 'r'){
        $('<div class="talk rabit">\
        <div class="user"></div>\
        <div class="text">'+text+'</div>\
        </div>').appendTo('.inner');
    }
    $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
}