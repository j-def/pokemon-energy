import logo from './logo.svg';
import './App.css';
import react from 'react';


class App extends react.Component{

  constructor(props){
    super(props)
    this.state = {
      "turn": "a",
      "aList": {},
      "bList": {},
      "types": ["Grass", "Fire", "Water", "Psychic", "Fighting", "Darkness", "Metal", "Fairy", "Colorless"],
      "typesList": ["Grass", "Fire", "Water", "Psychic", "Fighting", "Darkness", "Metal", "Fairy", "Colorless"]

    }
    for (var type in this.state.types){
      this.state.aList[this.state.types[type]] = 0
      this.state.bList[this.state.types[type]] = 0
    }
  }

  resetLists(){
    let tempA = {}
    let tempB = {}
    for (var type in this.state.types){
      tempA[this.state.types[type]] = 0
      tempB[this.state.types[type]] = 0
    }
    this.setState({"aList": tempA, "bList": tempB})
  }

  setItemCounts(type, count){
    let tempA = {...this.state.aList}
    let tempB = {...this.state.bList}
    tempA[type] = count
    tempB[type] = count
  
  this.setState({"aList": tempA, "bList": tempB})
  }

  pullCard(){
    var pickedCard = this.state.types[Math.floor(Math.random()*1000) % this.state.types.length]
    if (this.state.turn === "a"){
      let tempDict = {...this.state.aList}
      tempDict[pickedCard]++
      this.setState({"aList": tempDict, "turn": "b"})
    }
    else if (this.state.turn === "b"){
      let tempDict = {...this.state.bList}
      tempDict[pickedCard]++
      this.setState({"bList": tempDict, "turn": "a"})
    }
  }

  burnCard(energyType, user){
    let tempDict = user === "a"?{...this.state.aList}:{...this.state.bList}
    if (tempDict[energyType] > 0){
      tempDict[energyType]--
      if (user === "a"){
        this.setState({"aList": tempDict})
      } else{
        this.setState({"bList": tempDict})
      }
    }
  }

  toggleType(typeName){
    if (this.state.types.includes(typeName)){
      let tempList = [...this.state.types]
      tempList.splice(tempList.indexOf(typeName), 1)
      this.setState({"types": tempList})
    }
    else {
      let tempList = [...this.state.types]
      tempList.push(typeName)
      this.setState({"types": tempList})
    }
    this.resetLists()
    this.setItemCounts(typeName, 0)
  }

  isSelectedClass(typeName){
    if (this.state.types.includes(typeName)){
      return " selected"
    }
    return ""
  }


  render(){
    return(
      <div>
        <h1>Pokemon Energy Simulator</h1>
        <div>
          <h2>Energy Types</h2>
          <div className='select-energy-container'>
          {this.state.typesList.map((item, _index) => (
              <div className={'select-energy-types'+this.isSelectedClass(item)} onClick={() => this.toggleType(item)}>
                <p>{item}</p>
              </div>
            ))}
          </div>
          
        </div>
        <div>
          <h2>User A Energy</h2>
          <div className='card-container'>
            {this.state.types.map((value, index) => (
              <div className='card' onClick={() => this.burnCard(value, "a")}>
                <h3>{value}</h3>
                <h3>{this.state.aList[value]}</h3>
              </div>
            ))}
          </div>
         
        </div>
        <div>
          <h2>User B Energy</h2>
          <div className='card-container'>
            {this.state.types.map((value, index) => (
              <div className='card' onClick={() => this.burnCard(value, "b")}>
                <h3>{value}</h3>
                <h3>{this.state.bList[value]}</h3>
              </div>
            ))}
          </div>
        </div>
        <button className='pull-energy-button' onClick={() => this.pullCard()}>Pull Card</button>
      </div>
    )
  }
}

export default App;
