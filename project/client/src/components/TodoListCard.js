import { useCallback, useContext, useEffect, useState } from 'react';
import ConfigContext from '../ConfigProvider';
import AddItemForm from './AddItemForm';
import ItemDisplay from './ItemDisplay';

function TodoListCard() {
    const { apiHost } = useContext(ConfigContext);
    const [items, setItems] = useState(null);

    useEffect(() => {
        fetch(`${apiHost}/items`)
            .then(r => r.json())
            .then(setItems);
    }, [apiHost]);

    const onNewItem = useCallback(
        newItem => {
            setItems([...items, newItem]);
        },
        [items],
    );

    const onItemUpdate = useCallback(
        item => {
            const index = items.findIndex(i => i.id === item.id);
            setItems([
                ...items.slice(0, index),
                item,
                ...items.slice(index + 1),
            ]);
        },
        [items],
    );

    const onItemRemoval = useCallback(
        item => {
            const index = items.findIndex(i => i.id === item.id);
            setItems([...items.slice(0, index), ...items.slice(index + 1)]);
        },
        [items],
    );

    if (items === null) return 'Loading...';

    return (
        <>
            <AddItemForm onNewItem={onNewItem} />
            {items.length === 0 && (
                <p className="text-center">No items yet! Add one above!</p>
            )}
            {items.map(item => (
                <ItemDisplay
                    item={item}
                    key={item.id}
                    onItemUpdate={onItemUpdate}
                    onItemRemoval={onItemRemoval}
                />
            ))}
        </>
    );
}

export default TodoListCard;