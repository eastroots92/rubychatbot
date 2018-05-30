class EditBot extends React.Component {
  constructor(props) {
    super(props);
    this.runCode = this.runCode.bind(this);
    this.state = {
      result: '',
      loading: false
    }
  }

  runCode(response) {
    this.setState({ loading: true });
    $.ajax({
      url: `/bots/run_code`, type: 'POST', dataType: 'json',
      data: { code: response }
    }).done((response)=>{
      this.setState({ result: response.result, loading: false });
    });
  }

  render() {
    return(
      <div className="container">
        <div className="row bot">
          <div className="col-12 col-lg-6">
            <BotForm
              formAuthenticityToken={this.props.formAuthenticityToken}
              method="put"
              role={this.props.role}
              bot={this.props.bot}
              runCode={this.runCode}
              errors={this.props.errors} />
          </div>
          <div className="col-12 col-lg-6">
            <BotResult result={this.state.result} loading={this.state.loading} />
          </div>
        </div>
      </div>
    );
  }
}

EditBot.propTypes = {
  formAuthenticityToken: PropTypes.string,
  bot: PropTypes.object,
  errors: PropTypes.object
};
