var React = require('react');
var accept = require('attr-accept');

var Dropzone = React.createClass({

  getDefaultProps: function() {
    return {
      disableClick: false,
      multiple: false
    };
  },

  getInitialState: function() {
    return {
      isDragActive: false
    };
  },

  propTypes: {
    onDrop: React.PropTypes.func,
    onDropAccepted: React.PropTypes.func,
    onDropRejected: React.PropTypes.func,
    onDragEnter: React.PropTypes.func,
    onDragLeave: React.PropTypes.func,

    style: React.PropTypes.object,
    activeStyle: React.PropTypes.object,
    className: React.PropTypes.string,
    activeClassName: React.PropTypes.string,
    rejectClassName: React.PropTypes.string,

    disableClick: React.PropTypes.bool,
    multiple: React.PropTypes.bool,
    accept: React.PropTypes.string,
  },

  allFilesAccepted: function(files) {
    return files.every(file => accept(file, this.props.accept))
  },

  onDragEnter: function(e) {
    e.preventDefault();

    // This is tricky. During the drag even the dataTransfer.files is null
    // But Chrome implements some drag store, which is accesible via dataTransfer.items
    var dataTransferItems = e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : [];

    // Now we need to convert the DataTransferList to Array
    var itemsArray = Array.prototype.slice.call(dataTransferItems);
    var allFilesAccepted = this.allFilesAccepted(itemsArray);

    this.setState({
      isDragActive: allFilesAccepted,
      isDragReject: !allFilesAccepted
    });

    if (this.props.onDragEnter) {
      this.props.onDragEnter(e);
    }
  },

  onDragOver: function (e) {
    e.preventDefault();
  },

  onDragLeave: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    if (this.props.onDragLeave) {
      this.props.onDragLeave(e);
    }
  },

  onDrop: function(e) {
    e.preventDefault();

    this.logAction(e);

    this.setState({
      isDragActive: false,
      isDragReject: false
    });

    var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    var max = this.props.multiple ? droppedFiles.length : 1;
    var files = [];

    for (var i = 0; i < max; i++) {
      var file = droppedFiles[i];
      if (typeof URL !== 'undefined'){
        file.preview = URL.createObjectURL(file);
      }
      files.push(file);
    }

    if (this.props.onDrop) {
      var logger = React.findDOMNode(this.refs.logger);
      logger.innerHTML += 'calling on drop: '+ files.length +' ) ';
      this.props.onDrop(files, e);
    }

    if (this.allFilesAccepted(files)) {
      if (this.props.onDropAccepted) {
        this.props.onDropAccepted(files, e);
      }
    } else {
      if (this.props.onDropRejected) {
        this.props.onDropRejected(files, e);
      }
    }
  },

  onClick: function () {
    if (!this.props.disableClick) {
      this.open();
    }
  },

  open: function() {
    var fileInput = React.findDOMNode(this.refs.fileInput);
    fileInput.value = null;
    fileInput.click();
  },

  logAction: function(e) {
    var droppedFiles = e.dataTransfer ? 'e.dataTransfer.files' : 'e.target.files';
    var logger = React.findDOMNode(this.refs.logger);
    var fileInput = React.findDOMNode(this.refs.fileInput);
    var filesNames = '';
    var a = fileInput.files;
    for (var i = a.length - 1; i >= 0; i--) {
      filesNames = filesNames + a[i].name;
    };
    //JSON.stringify(e.target)
    logger.innerHTML += 'changed! (file: '+filesNames+' , val: '+ fileInput.value +', e: '+ droppedFiles +' ) ';

  },

  render: function() {

    var className;
    if (this.props.className) {
      className = this.props.className;
      if (this.state.isDragActive) {
        className += ' ' + this.props.activeClassName;
      };
      if (this.state.isDragReject) {
        className += ' ' + this.props.rejectClassName;
      };
    };

    var style, activeStyle;
    if (this.props.style || this.props.activeStyle) {
      if (this.props.style) {
        style = this.props.style;
      }
      if (this.props.activeStyle) {
        activeStyle = this.props.activeStyle;
      }
    } else if (!className) {
      style = {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5,
      };
      activeStyle = {
        borderStyle: 'solid',
        backgroundColor: '#eee'
      };
    }

    var appliedStyle;
    if (activeStyle && this.state.isDragActive) {
      appliedStyle = {
        ...style,
        ...activeStyle
      };
    } else {
      appliedStyle = {
        ...style
      };
    };

    // style={{width: 200, height: 100, background: 'gray'}}
    // style={{position: 'absolute',overflow: 'hidden', clip: 'rect(0 0 0 0)', height: 1, width: 1, margin: -1, padding: 0, border: 0}}
    // <div id='logger' style={{border:'1px solid green'}} ref='logger'></div>
    return (
      <div
        className={className}
        style={appliedStyle}
        onClick={this.onClick}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
      <div id='logger' style={{border:'1px solid green'}} ref='logger'></div>
        {this.props.children}
        <input
          id={this.props.id}
          title={this.props.title}
          name={this.props.name}
          style={{position: 'absolute',overflow: 'hidden', clip: 'rect(0 0 0 0)', height: 1, width: 1, margin: -1, padding: 0, border: 0}}
          type='file'
          ref='fileInput'
          multiple={this.props.multiple}
          accept={this.props.accept}
          onChange={this.onDrop}
        />
      </div>
    );
  }

});

module.exports = Dropzone;