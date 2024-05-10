import "./styles.css"


// this is a componenet
export default function App(){
  return <form className="new-item-form">
    <div className="row">
      <label htmlFor="item">New Item</label>
      <input type="text" id="item"/>
    </div>
  </form>
}