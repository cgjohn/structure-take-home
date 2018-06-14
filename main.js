/* ----------------- //


  The store
  We use a flux-like pattern for managing data with React.
  Ths store keeps all its data in a simple js object `data = {}`
  - To get all the data in the store use `store.getData()`
  - To change data in the store you have to `store.dispatch(action)`
  An action is an object with a name and a payload { name: "ADD_DOG", payload: {}}

  The function `calculateNewDataFromAction` tells the store
  how to update the store given an `action` using data inside it's `payload`.
  (See ADD_DOG action)
  Ideally we never, ever want to mutate the store so this function returns a new
  object `newData` which replaces the `data` object.


// --------------- */

// Dogs in the store are simple js objects e.g. ( { dog_name: { key: value} } )
// You can change the schema of the store if you need to (but you shouldn't need to),
// Feel free to edit and play with the data
const initialData = {
  dogs: {
    ruffles: { age: 16, selected: false },
    milkweed: { age: 5, selected: false },
    sammy: { age: 2, selected: false },
    english: { age: 4, selected: false }
  },
  recently_adopted: ["sammy", "english"]
};

const calculateNewDataFromAction = (oldData, action) => {
  switch (action.name) {
    case "ADD_DOG":
      const newDogsObject = Object.assign({}, oldData.dogs, action.payload);
      const newData = Object.assign({}, oldData, { dogs: newDogsObject });
      return newData;
    case "ADOPT_DOG":
      const afterAdopt = oldData.recently_adopted.concat(action.payload)
      return Object.assign({}, oldData, {recently_adopted: afterAdopt})
    case "DISOWN_DOG":
      const afterDisown = oldData.recently_adopted.filter((elm) => elm !== action.payload );
      return Object.assign({}, oldData, {recently_adopted: afterDisown})
    case "SELECT_DOG":
      const selectedDogInfo = Object.assign({}, oldData.dogs[action.payload], {selected: !oldData.dogs[action.payload].selected})
      const newDog = {}
      newDog[action.payload] = selectedDogInfo
      const newDogs = Object.assign({}, oldData.dogs, newDog);
      return Object.assign({}, oldData, { dogs: newDogs });
    default:
      return oldData;
  }
};

const createStore = calculateNewDataFromAction => {
  let data = initialData;
  let listeners = [];

  const getData = () => data;

  // Dispatch an action object to update the store
  const dispatch = action => {
    data = calculateNewDataFromAction(data, action);
    listeners.forEach(listener => listener());
  };

  // A listener is a function we call whenever the store changes
  const subscribe = listener => {
    listeners.push(listener);
  };

  const unsubscribe = listener => {
    listeners = listeners.filter(l => l !== listener);
  };

  return { getData, dispatch, subscribe, unsubscribe };
};

const store = createStore(calculateNewDataFromAction);
store.dispatch({});

// dispatch example: the following line would add a dog to the store
// store.dispatch({ name: 'ADD_DOG', payload: {deathfromabove: {age: 666} } });

/* ----------------- //


   React Components


// --------------- */
class DogCard extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickHandler = () => {
    this.props.dispatch({name: 'SELECT_DOG', payload: this.props.name})
  }

  render() {
    const imgLink = "/dogs/" + this.props.name + ".png"
    const dogName = this.props.selected ? <strong style={{textTransform: 'uppercase'}}>{this.props.name}</strong> : this.props.name;
    
    return (
      <div className="dog-card">
        <img
          src={imgLink}
          className="dog-img"
          alt="Take me home! (Get it?)"
        />
        <div className="dog-info">
          <input
            type="checkbox"
            className="selected"
            checked={this.props.selected}
            onClick={this.onClickHandler}
          />
          {dogName} ({this.props.age})
        </div>
      </div>
    );
  }
}

class RealTakeHome extends React.Component {

  adoptAllHandler = () => {
    for(let dog in this.props.dogs){

      if(this.props.dogs[dog].selected){
        this.props.dispatch({name: 'ADOPT_DOG', payload: dog})
        this.props.dispatch({name: 'SELECT_DOG', payload: dog})
      }
    }
  }

  render() {
    // creates a list of dog objects
    let dogList = []
    for (let dog in this.props.dogs) {
      dogList.push({name: dog, age: this.props.dogs[dog].age, selected: this.props.dogs[dog].selected})  
    }

    //filters out adopted dogs 
    dogList = dogList.filter( (el) => !this.props.recently_adopted.includes(el.name))

    const dogCards = dogList.map((dog, key) => (<DogCard 
                                                  dispatch={this.props.dispatch} 
                                                  key={key} 
                                                  name={dog.name} 
                                                  age={dog.age}
                                                  selected={dog.selected}/>))

    return (
      <div>
        <div className="header">
          <strong className="header-text">
            Adoptable Dogs. Take one home today!
          </strong>
        </div>

        <div className="card-container">
          { dogCards }
          <button className="button-normal" onClick={this.adoptAllHandler}>Adopt all selected</button>
        </div>

        <RecentlyAdopted dispatch={this.props.dispatch} recently_adopted={this.props.recently_adopted}/>
      </div>
    );
  }
}

class RecentlyAdopted extends React.Component {
  disownHandler = (nameIn) => {
    this.props.dispatch({name: 'DISOWN_DOG', payload: nameIn})
  }

  render() {
    const recently_adopted = this.props.recently_adopted.map((name, key) => (
        <div key={key} className="button-wrapper">
          <p style={{textAlign: 'center'}}>{name}</p> <button onClick={() => this.disownHandler(name)} className="button-normal">Disown</button>
        </div>
        ))

    return (
      <div>
        <div className="header">
          <strong className="header-text">Recently Adopted</strong>
        </div>
        <div className="card-container">
          { recently_adopted }
        </div>
      </div>
    );
  }
}

class OldTakeHome extends React.Component {
  render() {
    return <h1>Congratulations! You have completed the take home task!*</h1>;
    // *You can ignore the line above.
  }
}

class ConnectToStore extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { 
      dogs: store.getData()["dogs"],
      recently_adopted: store.getData()["recently_adopted"]
    };
  }

  componentDidMount() {
    // Subscribe to changes
    this.listener = store.subscribe(this.handleChange);
  }

  componentWillUnmount() {
    store.unsubscribe(this.listener);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({ 
      dogs: store.getData()["dogs"],
      recently_adopted: store.getData()["recently_adopted"] 
    });
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          dogs: this.state.dogs,
          recently_adopted: this.state.recently_adopted,
          dispatch: store.dispatch
        })}
      </div>
    );
  }
}

/* ----------------- //


   Render The Top Level React Component to the DOM


// --------------- */
ReactDOM.render(
  <ConnectToStore>
    <RealTakeHome />
  </ConnectToStore>,
  document.getElementById("app_goes_here")
);
