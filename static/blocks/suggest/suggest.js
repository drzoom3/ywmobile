var Suggest = React.createClass({
    getInitialState: function() {
        return { showResults: false };
    },
    componentDidMount: function(){
        var _this = this,
            socket = io();        
        
        $('#search-city-form').on('submit', function(){
            var id = _this.selectedId;
            if (0+id > 0) {
                window.location.href = "/" + id;
            } else {
                socket.emit('citysearchsilent', _this.searchValue);
            }
            return false;
        });
        
        $('#search-city-input').on('keyup', function(){
            var $this = $(this),
                timeout,
                val = $.trim($this.val());
            
            $('#search-city-clear').removeClass('hide');
            _this.selectedId = 0;
            _this.searchValue = val;
            if (val.length > 2) {
                clearTimeout(timeout);
                timeout =  setTimeout(function() {
                    socket.emit('citysearch', val);
                }, 400);
            } else {
                _this.setState({ showResults: false });
                _this.setProps({ data: [] });
            }
            
        });
        
        $('#search-city-clear').on('click', function(){
            $('#search-city-input').val('');
            _this.selectedId = 0;
            _this.searchValue = '';
            _this.setState({ showResults: false });
            _this.setProps({ data: [] });
            $(this).addClass('hide');
        });
                
        socket.on('cityresult', function(result){
            if (result.length) {
                _this.setState({ showResults: true });
            } else {
                _this.setState({ showResults: false });
            }
            if (_this.searchValue.length > 2 ) {
                _this.setProps({ data: result });
            }
        });
        
        socket.on('cityresultsilent', function(id){
            window.location.href = "/" + id;
        });
    },
    selectedId: 0,
    searchValue: '',
    getDefaultProps: function () {
        return {data: []};
    },
    selectItem: function(id, name) {
        if (this.touchedWithoutScroll == true) {
            this.selectedId = id;
            this.setState({ showResults: false });
            this.setProps({ data: [] });
            $('#search-city-input').val(name)
        }
        return false;
    },
    selectStart: function() {
        this.touchedWithoutScroll = true;
    },
    selectMove: function() {
        this.touchedWithoutScroll = false;
    },
    render: function () {
        var _this = this,
            items = _this.props.data;
                
        return (
            <ul className={this.state.showResults ? "suggest__list" : "suggest__list hide"}>
                {items.map(function(item, i){
                    return <li className="suggest__item" onClick={_this.selectItem.bind(this, item.geoid, item.name)} onTouchEnd={_this.selectItem.bind(this, item.geoid, item.name)} onTouchStart={_this.selectStart} onTouchMove={_this.selectMove}>
                        <div className="suggest__item__title">{item.name}</div>
                        <div className="suggest__item__desc">{item.country}, {item.province}</div>
                    </li>
                })}
            </ul>     
        );
    }
});