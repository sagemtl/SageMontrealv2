
class Checkbox extends Component {
    constructor(init){
        super(init);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange({target}){
        if (target.checked){
           target.removeAttribute('checked');
           target.parentNode.style.textDecoration = "";
        } else {
           target.setAttribute('checked', true);
           target.parentNode.style.textDecoration = "line-through";
        }
    }
    render(){
       return (
          <span>
            <label style={{textDecoration: this.props.complete?"line-through":""}}>
               <input type="checkbox"
                      onClick={this.handleChange}
                      defaultChecked={this.props.complete}
                />
            </label>
              {this.props.text}
          </span>
      )
  }
}

export default Checkbox;