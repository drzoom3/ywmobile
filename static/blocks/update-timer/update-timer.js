var UpdateTimer = React.createClass({
    updateState: function () {
        var now = new Date().getTime(),
            diff = Math.round((now - this.initTimestamp)/1000),//sec
            text = "";
        
        if (diff < 60) {
            text = diff + ' секунд назад';
        } else
        if (diff < 3600) {
            diff = Math.floor(diff/60);//min
            var sfx;
            
            if (diff % 10 < 2) {
                sfx = 'у';
            } else
            if (diff % 10 < 5) {
                sfx = 'ы';
            }
            
            text = diff + ' минут'+sfx+' назад';
        } else {
            diff = Math.floor(diff/3600);//hour
            var sfx;
            
            if (diff % 10 < 2) {
                sfx = '';
            } else
            if (diff % 10 < 5) {
                sfx = 'а';
            } else {
                sfx = 'ов';
            }
            
            text = diff + ' час'+sfx+' назад';
        }
        
        this.setProps({
            text: text
        });
    },
    initTimestamp: (function() {
        return new Date().getTime()
    })(),
    componentDidMount: function(){
        var _self = this;
        
        if (!window.yw_timer) {
            setInterval(function() {
                $( "body" ).trigger( "tick" );
            }, 5000);                   
            window.yw_timer = true;
        }
        
        $( "body" ).on('tick', function() {
            _self.updateState();
        })
    },
    getDefaultProps: function () {
        return {
            text: 'Уже давно'
        };
    },

    render: function () {
        return (
            <span>{this.props.text}</span>
        );
    }
});