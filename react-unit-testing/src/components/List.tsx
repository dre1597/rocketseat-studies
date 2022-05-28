import { useState } from 'react';

type ListProps = {
  inicialItems: string[];
};

function List({ inicialItems }: ListProps) {
  const [list, setList] = useState(inicialItems);
  const [newItem, setNewItem] = useState('');

  function addToList() {
    setTimeout(() => {
      setList((state) => [...state, newItem]);
    }, 500);
  }

  function removeFromList(itemToRemove: string) {
    setTimeout(() => {
      setList((state) => state.filter((item) => item !== itemToRemove));
    }, 500);
  }

  return (
    <>
      <input
        value={newItem}
        placeholder='New item'
        onChange={(event) => setNewItem(event.target.value)}
      />
      <button onClick={addToList}>Add</button>
      <ul>
        {list.map((item) => (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;
