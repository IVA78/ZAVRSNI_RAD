import { Fragment, useState } from "react";

function ListGroup() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  //items = [];

  //Hook - putting built in features in React: this is state hook
  //be carefull to follow the convention about naming!
  //const [name, setName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const getMessage = () => {
    //return items.length === 0 ? <p>No found elements</p> : null;
    return items.length === 0 && <p>No found elements</p>;
    //if condition if false, nothing will be rendered
  };

  //Event handler
  const handleClick = (event) => console.log(event);

  return (
    <Fragment>
      <h1>List</h1>
      {getMessage()}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            //onClick={() => console.log("Clicked " + item + "! " + index)}
            //onClick={handleClick}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default ListGroup;
