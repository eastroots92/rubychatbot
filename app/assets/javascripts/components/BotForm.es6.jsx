class BotForm extends React.Component {
  constructor(props) {
    super(props);
    this.initCodeMirror = this.initCodeMirror.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      bot_id: this.props.bot? `/${this.props.bot.id}`:'',
      message: this.props.bot ? this.props.bot.message:'',
      response: this.props.bot ? this.props.bot.response:'',
      result: ''
    }
  }

  handleChange(e) {
    this.setState({ message: e.target.value })
  }

  // CodeMirror config
  betterTab(cm) {
    if (cm.somethingSelected()) {
      cm.indentSelection("add");
    } else {
      cm.replaceSelection(cm.getOption("indentWithTabs")? "\t":
        Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
    }
  }

  initCodeMirror() {
    var editor = CodeMirror.fromTextArea(this.refs.codeEditor, {
      lineNumbers: true,
      mode: 'ruby',
      theme: 'monokai',
      extraKeys: { Tab: this.betterTab }
    });

    editor.on("change", (cm) => {
      this.setState({ response: cm.getValue() })
    })
  }

  componentDidMount() {
    this.initCodeMirror();
  }

  renderMethod(method) {
    if (method !== 'post') {
      return (
        <input type="hidden" name="_method" value={method} />
      );
    }
  }

  render () {
    return (
      <form action={`/bots${this.state.bot_id}`} method="post" encType="multipart/form-data" acceptCharset="UTF-8" className="col-12">
        <input name="utf8" type="hidden" value="✓" />
        {this.renderMethod(this.props.method)}
        <input type="hidden" name="authenticity_token" value={this.props.formAuthenticityToken} />
        <div className="form-group">
          <label htmlFor="bot_message">입력 메시지</label>
          <input type="text" id="bot_message" name="bot[message]" value={this.state.message} onChange={this.handleChange} className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="bot_response">답변 코드</label>
          <textarea ref="codeEditor" className="form-control" name="bot[response]" value={this.state.response} readOnly={true} rows="10"></textarea>
          <div id="bot_response">{this.state.response}</div>
        </div>
        <button type="submit" className="btn btn-primary">확인</button>
      </form>
    );
  }
}

BotForm.propTypes = {
  formAuthenticityToken: PropTypes.string,
  method: PropTypes.string,
  bot: PropTypes.object
};

BotForm.defaultProps = {
  method: 'post'
}